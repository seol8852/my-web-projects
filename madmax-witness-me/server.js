const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT_HTTPS = 8443;
const PORT_HTTP = 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');

const certPath = path.join(__dirname, 'cert.pem');
const keyPath = path.join(__dirname, 'key.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error('SSL 인증서(cert.pem, key.pem)를 찾을 수 없습니다.');
  process.exit(1);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function serveStatic(req, res) {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found - 발할라의 길을 잃었습니다</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // 강력한 캐시 방지 헤더
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// HTTPS 서버 구동
const httpsServer = https.createServer(options, (req, res) => {
  serveStatic(req, res);
});

httpsServer.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`\n[안내] 포트 ${PORT_HTTPS}가 이미 사용 중입니다. 브라우저를 엽니다: https://localhost:${PORT_HTTPS}`);
    const url = `https://localhost:${PORT_HTTPS}`;
    const startCmd = process.platform === 'win32' ? `start ${url}` :
                     process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
    exec(startCmd, () => {});
  } else {
    console.error(e);
  }
});

httpsServer.listen(PORT_HTTPS, () => {
  const url = `https://localhost:${PORT_HTTPS}`;
  console.log('====================================================');
  console.log('FIRE! [MAD MAX: FURY ROAD] WAR BOY SERVER FIRE!');
  console.log(`HTTPS Server Ready: ${url}`);
  console.log('====================================================');

  const startCmd = process.platform === 'win32' ? `start ${url}` :
                   process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
  exec(startCmd, () => {});
});

// HTTP 리다이렉트
const httpServer = http.createServer((req, res) => {
  const redirectUrl = `https://localhost:${PORT_HTTPS}${req.url}`;
  res.writeHead(301, { "Location": redirectUrl });
  res.end(`Redirecting to ${redirectUrl}`);
});

httpServer.on('error', () => {});
httpServer.listen(PORT_HTTP, () => {});
