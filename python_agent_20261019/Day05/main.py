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

#===============================================
#page6.chapter1.[실습] 첫 API 만들기

# [1번 문제]
# GET 방식으로 "/profile" 경로에 접속하면
# {"name": "나의 이름", "role": "student"} 형태의 딕셔너리를 반환하는
# profile 함수를 작성하고, @app.get("/profile") 데코레이터를 붙이세요.
@app.get("/profile")
def profile():
    return {"name":"나의 이름", "role":"student"}

# [2번 문제]
# GET 방식으로 "/square/{number}" 경로에 접속하면 number를 정수로
# 입력받아, 그 숫자의 제곱값을 {"number": number, "result": 제곱값}
# 형태로 반환하는 square 함수를 작성하세요.
@app.get("/square/{number}")
def aquare(number:int):
    return {"number":number,"result":(number**2)}

# [도전 문제]
# "/greet/{name}" 경로에서 쿼리 파라미터 age(정수, 기본값 20)를 받아
# "{name}님은 {age}살이시군요!" 메시지를 반환하는 함수를 작성하세요.
# localhost:8000/greet/김태경?age=26
@app.get("/greet/{name}")
def age(name:str,age:int = 20): # 기본값 설정했다면 선택 파리미터
    return {'msg':f'{name}님은 {age}살이시군요!'}

#================================================================
# page9.chapter2.[실습] Path Parameter 활용

# [2번 문제]
# 위 [1번 문제] 함수보다 '먼저' "/courses/popular" 라는 고정 경로 함수를
# 추가해, {"title": "인기 강의 목록"} 을 반환하도록 만드세요.
# (고정 경로를 어느 위치에 작성해야 하는지 생각해보세요!)
@app.get("/courses/pupular")
def courses_pupular():
    return {"title": "인기 강의 목록"}

# [1번 문제]
# "/courses/{course_id}" 경로에 접속하면 course_id(정수)를 받아
# {"course_id": course_id, "title": "강의 정보"} 를 반환하는 함수를 작성하세요.
@app.get("/courses/{course_id}")
def courses(course_id:int):
    return {"course_id":course_id,"title":"강의 정보"}

# [도전 문제]
# "/students/{grade}/{number}/score" 경로에서 grade, number(둘 다 정수)를
# 받아 {"grade": grade, "number": number, "score": 90} 을 반환하세요.
@app.get("/students/{grade}/{number}/score")
def students(grade:int, number:int):
    return {"grade": grade, "number": number, "score": 90}
