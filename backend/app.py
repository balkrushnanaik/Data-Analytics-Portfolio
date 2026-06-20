"""
Balkrushna Naik Portfolio — Flask Backend
REST API + SQLite Database
"""

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import sqlite3
import os
import re
import logging
from datetime import datetime

# ── Init ──────────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app, origins=["https://balkrushna-naik.vercel.app", "http://localhost:5173"])

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s — %(message)s')
log = logging.getLogger(__name__)

DB_PATH = os.path.join(os.path.dirname(__file__), 'portfolio.db')
RESUME_PATH = os.path.join(os.path.dirname(__file__), 'static', 'resume.pdf')


# ── Database helpers ──────────────────────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create tables and seed initial data."""
    conn = get_db()
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS page_views (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT,
            ip TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        )
    ''')

    conn.commit()
    conn.close()
    log.info('Database initialised at %s', DB_PATH)


# ── Validation ────────────────────────────────────────────────────────────────
def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_contact(data: dict) -> list[str]:
    errors = []
    if not data.get('name', '').strip():
        errors.append('Name is required')
    if not validate_email(data.get('email', '')):
        errors.append('Valid email is required')
    if not data.get('subject', '').strip():
        errors.append('Subject is required')
    if len(data.get('message', '').strip()) < 10:
        errors.append('Message must be at least 10 characters')
    return errors


# ── Routes ────────────────────────────────────────────────────────────────────
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'timestamp': datetime.utcnow().isoformat()})


@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = [
        {'id': 1, 'title': 'ESPN Cricket Analytics Dashboard', 'tools': ['Python', 'Pandas', 'Power BI'], 'category': ['Python', 'Power BI', 'Analytics']},
        {'id': 2, 'title': 'IPL Data Analysis Dashboard', 'tools': ['Python', 'Power BI'], 'category': ['Python', 'Power BI', 'Analytics']},
        {'id': 3, 'title': 'Sales Performance Dashboard', 'tools': ['Power BI', 'Excel'], 'category': ['Power BI', 'Analytics']},
        {'id': 4, 'title': 'Customer Segmentation Analysis', 'tools': ['Python', 'Machine Learning'], 'category': ['Python', 'Analytics']},
        {'id': 5, 'title': 'Netflix Data Analysis', 'tools': ['Python', 'Pandas'], 'category': ['Python', 'Analytics']},
        {'id': 6, 'title': 'Banking Data Analysis', 'tools': ['Python', 'SQL'], 'category': ['Python', 'SQL', 'Analytics']},
        {'id': 7, 'title': 'Student Performance Analysis', 'tools': ['Python', 'Power BI'], 'category': ['Python', 'Power BI', 'Analytics']},
        {'id': 8, 'title': 'E-Commerce Sales Dashboard', 'tools': ['Power BI', 'Excel'], 'category': ['Power BI', 'Analytics']},
        {'id': 9, 'title': 'HR Analytics Dashboard', 'tools': ['Power BI'], 'category': ['Power BI', 'Analytics']},
        {'id': 10, 'title': 'AI-Powered Business Insights Dashboard', 'tools': ['Python', 'Flask', 'Power BI'], 'category': ['Python', 'Power BI', 'Analytics']},
    ]
    return jsonify({'success': True, 'data': projects, 'count': len(projects)})


@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = {
        'programming': ['Python', 'SQL', 'Java', 'JavaScript'],
        'data_analysis': ['Pandas', 'NumPy', 'Data Cleaning', 'Data Wrangling', 'EDA'],
        'visualization': ['Power BI', 'Tableau', 'Excel', 'Matplotlib', 'Seaborn'],
        'databases': ['MySQL', 'MongoDB'],
        'development': ['React.js', 'Flask', 'Git', 'GitHub'],
    }
    return jsonify({'success': True, 'data': skills})


@app.route('/api/certifications', methods=['GET'])
def get_certifications():
    certs = [
        {'title': 'Full Stack Development Program', 'provider': 'UpGrad', 'year': '2024'},
        {'title': 'Deloitte Australia Data Analytics Job Simulation', 'provider': 'Forage', 'year': '2024'},
        {'title': 'UI/UX Design Internship Certificate', 'provider': 'TechnoGrowth Software Solutions Pvt Ltd', 'year': '2026'},
    ]
    return jsonify({'success': True, 'data': certs})


@app.route('/api/education', methods=['GET'])
def get_education():
    edu = [
        {
            'degree': 'Diploma in Information Technology',
            'institution': 'Amrutvahini Polytechnic, Sangamner',
            'year': '2023',
            'grade': '80.50%',
            'status': 'Completed',
        },
        {
            'degree': 'Bachelor of Engineering (Computer Engineering)',
            'institution': 'Savitribai Phule Pune University',
            'year': '2027 (Expected)',
            'grade': '7.5 CGPA',
            'status': 'In Progress',
        },
    ]
    return jsonify({'success': True, 'data': edu})


@app.route('/api/contact', methods=['POST'])
def post_contact():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'success': False, 'errors': ['Invalid JSON body']}), 400

    errors = validate_contact(data)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 422

    try:
        conn = get_db()
        conn.execute(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            (data['name'].strip(), data['email'].strip(), data['subject'].strip(), data['message'].strip())
        )
        conn.commit()
        conn.close()

        log.info('Contact from %s <%s> — %s', data['name'], data['email'], data['subject'])
        return jsonify({'success': True, 'message': 'Message received! I will get back to you within 24 hours.'})

    except Exception as e:
        log.error('DB error: %s', e)
        return jsonify({'success': False, 'errors': ['Server error, please try again']}), 500


@app.route('/api/resume', methods=['GET'])
def get_resume():
    if os.path.exists(RESUME_PATH):
        return send_file(RESUME_PATH, as_attachment=True, download_name='Balkrushna_Naik_Resume.pdf')
    return jsonify({'success': False, 'message': 'Resume not found'}), 404


@app.route('/api/contacts', methods=['GET'])
def list_contacts():
    """Admin endpoint — protect with env var in production."""
    secret = request.args.get('secret', '')
    if secret != os.getenv('ADMIN_SECRET', ''):
        return jsonify({'error': 'Unauthorized'}), 401
    conn = get_db()
    rows = conn.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify({'success': True, 'data': [dict(r) for r in rows]})


# ── Error handlers ────────────────────────────────────────────────────────────
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'Method not allowed'}), 405

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500


# ── Entry ─────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
