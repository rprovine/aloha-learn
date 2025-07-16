# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend directory
COPY backend/ /app/backend/

# Install Python dependencies
WORKDIR /app/backend
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Set environment variables
ENV PYTHONPATH=/app/backend
ENV PORT=8000

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "run.py"]