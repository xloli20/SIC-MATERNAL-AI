FROM python:3.11-slim
WORKDIR /workspace

# Copy requirements (may be empty) and install if provided
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt || true

# Copy ml source
COPY . .

CMD ["python", "-c", "print('ML container ready')"]
