# db_main.py
"""
MariaDB 연동 FastAPI CRUD 예제
- 계정: root / manager
- DB: test
- ORM: SQLAlchemy + PyMySQL
- 실행 방법:
  1) 터미널 실행: python -m uvicorn db_main:app --reload
  2) 또는 이 파일을 직접 파이썬으로 실행: python db_main.py
"""

from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import uvicorn

# ======================================================================
# 1. MariaDB 데이터베이스 연결 설정
# ======================================================================
# 형식: mysql+pymysql://아이디:비밀번호@호스트:포트/데이터베이스명?charset=utf8mb4
DATABASE_URL = "mysql+pymysql://root:manager@localhost:3306/test?charset=utf8mb4"

# DB 엔진 생성 (커넥션 풀 관리)
engine = create_engine(
    DATABASE_URL,
    echo=True # 실행되는 실제 SQL 쿼리를 콘솔에 출력 (디버깅용, 스프링의 show-sql 옵션과 유사)
)

# DB 세션 팩토리 생성 (스프링의 EntityManager 역할)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ORM 모델들이 상속받을 기본 베이스 클래스
Base = declarative_base()


# ======================================================================
# 2. SQLAlchemy ORM 모델 정의 (실제 MariaDB의 테이블과 매핑)
# ======================================================================
class ProductModel(Base):
    __tablename__ = "products" # MariaDB에 생성될 테이블 이름

    id = Column(Integer, primary_key=True, index=True, autoincrement=True) # PK, 자동증가
    name = Column(String(100), nullable=False)                            # 상품명 (필수)
    price = Column(Integer, nullable=False)                               # 가격 (필수)
    in_stock = Column(Boolean, default=True)                              # 재고 유무 (기본값 True)


# 테이블이 없으면 MariaDB에 자동으로 CREATE TABLE 실행
Base.metadata.create_all(bind=engine)


# ======================================================================
# 3. Pydantic 스키마 정의 (클라이언트 요청/응답 검증용 DTO)
# ======================================================================
# 등록 / 수정 요청 시 받을 데이터 규격
class ProductCreate(BaseModel):
    name: str
    price: int
    in_stock: Optional[bool] = True

# 응답(Response)으로 내보낼 데이터 규격
class ProductResponse(BaseModel):
    id: int
    name: str
    price: int
    in_stock: bool

    class Config:
        from_attributes = True # ORM 객체를 Pydantic 모델로 자동 변환 허용


# ======================================================================
# 4. DB 세션 의존성 주입 (Dependency Injection)
# ======================================================================
# API 요청이 들어올 때 DB 세션을 열고, 요청이 끝나면 자동으로 close() 반납
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======================================================================
# 5. FastAPI 앱 및 CRUD API 구현
# ======================================================================
app = FastAPI(title="MariaDB 연동 상품 관리 API")

@app.get("/")
def root():
    return {"message": "MariaDB 연동 FastAPI 서버가 정상 동작 중입니다!"}


# [C] 상품 등록 (Create)
@app.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    # 1. Pydantic DTO -> SQLAlchemy ORM 객체로 변환
    new_product = ProductModel(
        name=product.name,
        price=product.price,
        in_stock=product.in_stock
    )
    # 2. DB에 추가 및 커밋
    db.add(new_product)
    db.commit()
    db.refresh(new_product) # DB에서 생성된 자동증가 id를 다시 불러옴
    return new_product


# [R] 상품 전체 목록 조회 (Read All)
@app.get("/products", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(ProductModel).all()
    return products


# [R] 상품 단건 상세 조회 (Read One)
@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{product_id}번 상품을 찾을 수 없습니다."
        )
    return product


# [U] 상품 정보 수정 (Update)
@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_update: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{product_id}번 상품을 찾을 수 없습니다."
        )

    # 데이터 수정
    product.name = product_update.name
    product.price = product_update.price
    product.in_stock = product_update.in_stock

    db.commit()
    db.refresh(product)
    return product


# [D] 상품 삭제 (Delete)
@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{product_id}번 상품을 찾을 수 없습니다."
        )

    db.delete(product)
    db.commit()
    return {"message": f"{product_id}번 상품이 정상적으로 삭제되었습니다."}


# ======================================================================
# 직접 실행할 때 (VS Code 실행 버튼 등)
# ======================================================================
if __name__ == "__main__":
    uvicorn.run("db_main:app", host="127.0.0.1", port=8001, reload=True)
