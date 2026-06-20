"""
Vercel serverless entry point.
Vercel looks for app/handler in api/index.py
"""
import sys
import os

# Make sure the parent backend folder is on the path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app, init_db

# Initialise DB on cold start
try:
    init_db()
except Exception:
    pass

# Vercel expects the WSGI app to be named `app`
# (already the case from app.py)
