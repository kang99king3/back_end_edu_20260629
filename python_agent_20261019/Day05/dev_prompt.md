# 🚀 FastAPI + MariaDB(SQLAlchemy) RESTful CRUD 백엔드 개발 요청서

> **목표:** FastAPI 프레임워크와 MariaDB(SQLAlchemy ORM)를 연동하여 완전한 상품 관리 RESTful CRUD API 서버 코드를 생성합니다.

---

## 1. 🛠️ 개발 환경

| 항목 | 설정 내용 |
| :--- | :--- |
| **운영체제 (OS)** | Windows |
| **데이터베이스 (DB)** | MariaDB (`localhost:3306`) |
| **계정 / 비밀번호** | `root` / `manager` |
| **데이터베이스명** | `test` |
| **주요 라이브러리** | `FastAPI`, `SQLAlchemy`, `PyMySQL`, `Pydantic`, `Uvicorn` |

---

## 2. 🗄️ 데이터 모델 명세

- **테이블명:** `products`

| 컬럼명 | 타입 | 제약조건 / 기본값 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | **PK**, `AUTO_INCREMENT` | 고유 식별자 |
| `name` | `VARCHAR(100)` | **NOT NULL** | 상품명 |
| `price` | `INT` | **NOT NULL** | 상품 가격 |
| `stock` | `INT` | `DEFAULT 0` | 상품 재고 수량 |
| `in_stock` | `BOOLEAN` | `DEFAULT True` | 판매 가능 여부 |

---

## 3. 🔌 필수 구현 API (CRUD 엔드포인트)

| Method | URI 경로 | 기능 | 상태 코드 & 처리 조건 |
| :---: | :--- | :--- | :--- |
| `POST` | `/products` | **상품 등록** | `201 Created`, Pydantic 요청 유효성 검증, 생성된 객체 반환 |
| `GET` | `/products` | **상품 전체 목록 조회** | `200 OK`, `List[ProductResponse]` 형태로 전체 반환 |
| `GET` | `/products/{product_id}` | **단건 상세 조회** | `200 OK`, 미존재 시 `404 HTTPException` 처리 |
| `PUT` | `/products/{product_id}` | **상품 정보 수정** | `200 OK`, 미존재 시 `404 HTTPException` 처리 |
| `DELETE` | `/products/{product_id}` | **상품 삭제** | `200 OK`, 미존재 시 `404 HTTPException` 처리, 완료 메시지 반환 |

---

## 4. 📌 세부 요구사항

- [x] **계층 분리**: SQLAlchemy ORM 모델과 Pydantic 스키마(생성용 `ProductCreate`, 응답용 `ProductResponse`)를 명확히 분리해주세요.
- [x] **DB 세션 라이프사이클 관리**: DB 세션 생성 및 안전한 반납을 위해 `Depends(get_db)`를 통한 의존성 주입 패턴을 적용해주세요.
- [x] **테이블 자동 생성**: 애플리케이션 시작 시 테이블이 없으면 자동 생성되도록 `Base.metadata.create_all(bind=engine)` 코드를 포함해주세요.
- [x] **단독 실행 지원**: 터미널 명령어 없이도 파일 단독 실행이 가능하도록 하단에 아래 코드를 추가해주세요:
  ```python
  if __name__ == "__main__":
      import uvicorn
      uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
  ```
- [x] **가독성 및 주석**: 각 코드 블록(DB 설정, 모델 정의, 스키마 정의, API 라우터 등)마다 역할을 쉽게 이해할 수 있도록 친절한 주석을 달아주세요.