#!/usr/bin/env python3
"""Tiny static server for the grader experiment.
Adds COOP/COEP so SharedArrayBuffer (wllama multi-thread) works,
and a permissive COEP mode so cross-origin HuggingFace/CDN fetches still load.
"""
import http.server, socketserver

PORT = 8777

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # NOTE: COOP/COEP intentionally omitted. They enable wllama multi-thread
        # (SharedArrayBuffer) but make cross-origin HuggingFace CDN responses opaque,
        # which breaks WebLLM's Cache.add() model download. WebLLM/WebGPU needs neither.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # quiet

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Serving on http://localhost:{PORT}/open-questions-grader.html")
        httpd.serve_forever()
