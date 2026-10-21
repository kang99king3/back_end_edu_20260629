# main.py
# 서버 실행 안될경우 : python -m uvicorn main:app --reload 
from fastapi import FastAPI

app = FastAPI(title="나만의 첫 API 서버")

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"{name}님, 안녕하세요!"}
