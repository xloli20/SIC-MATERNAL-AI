from fastapi import FastAPI

app = FastAPI(title='MaternalAI Backend')

@app.get('/health')
def health():
    return {'status': 'ok'}
