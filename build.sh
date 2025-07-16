#!/usr/bin/env bash
# Build script for Render deployment

set -o errexit

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Run database migrations
cd ..
python -m backend.app.db.init_db

# The actual server start will be handled by startCommand in render.yaml