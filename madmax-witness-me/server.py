import http.server
import ssl
import os
import sys
import webbrowser
import threading
import time

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT_HTTPS = 8443
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')
CERT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cert.pem')
KEY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'key.pem')

if not os.path.exists(CERT_FILE) or not os.path.exists(KEY_FILE):
    print("[오류] SSL 인증서(cert.pem, key.pem)를 찾을 수 없습니다.")
    sys.exit(1)

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def open_browser():
    time.sleep(1.0)
    webbrowser.open(f'https://localhost:{PORT_HTTPS}')

def main():
    server_address = ('', PORT_HTTPS)
    httpd = http.server.HTTPServer(server_address, CustomHTTPRequestHandler)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    url = f"https://localhost:{PORT_HTTPS}"
    print("====================================================")
    print("MAD MAX: FURY ROAD - WAR BOY 'WITNESS ME!' SERVER")
    print(f"HTTPS Server Started: {url}")
    print("====================================================")

    threading.Thread(target=open_browser, daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버를 종료합니다.")
        httpd.server_close()

if __name__ == '__main__':
    main()
