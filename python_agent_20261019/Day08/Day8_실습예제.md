# Day 8 실습예제 — 검색 기반 Q&A(Retrieval) 만들기

## 진행 안내

- 개발 환경 : 순정 Python + venv 가상환경 + VS Code
- 아래 명령어는 모두 **VS Code 통합 터미널**(`` Cmd+` `` / `Ctrl+` `` `` )에서 실행합니다.

```bash
python -m venv myenv
source myenv/bin/activate      # Windows: myenv\Scripts\activate
pip install langchain langchain-core langchain-openai python-dotenv
```

- 이번 시간도 `.env` 파일에 `OPENAI_API_KEY=발급받은키` 를 저장해두고 시작합니다.
- 회사/학교 네트워크 환경에 따라 임베딩 호출 시 토크나이저 다운로드가 막힐 수 있습니다.
  이런 경우 `OpenAIEmbeddings(..., tiktoken_enabled=False)` 옵션을 사용해보세요.
- 아래 문제들은 하나의 `.py` 파일에 이어서 작성해도 되고, Part별로 새 파일을 만들어도 됩니다.

---

## Part 1. 문서 청크 나누기

### 1-1.
아래 `split_text(text, chunk_size, overlap)` 함수를 작성하세요. `text`를 `chunk_size` 길이씩
자르되, 각 청크가 이전 청크와 `overlap` 글자만큼 겹치도록 나눠서 리스트로 반환합니다.

```
def split_text(text, chunk_size=50, overlap=10):
    # 여기에 작성
```

### 1-2.
아래 `long_text`를 `split_text(long_text, chunk_size=40, overlap=8)`로 나누고, 청크 개수와
각 청크 내용을 순서대로 출력하세요.

```
long_text = (
    "우리 도서관은 평일 오전 9시부터 오후 10시까지 열람실을 운영합니다. "
    "도서는 1인당 5권까지 14일간 대출할 수 있고, 만료 3일 전부터 온라인으로 "
    "1회 연장 신청이 가능합니다. 반납 기한을 넘기면 1권당 하루 100원의 "
    "연체료가 부과됩니다."
)
```

### 1-3. (도전)
`chunk_size`와 `overlap` 값을 바꿔가며 1-2를 다시 실행해보고, 값이 너무 작을 때와 너무 클 때
각각 어떤 문제가 생길 수 있을지 짧게 정리해보세요. (주석으로 남겨도 좋습니다)

---

## Part 2. 임베딩 + 벡터 저장소 만들기

### 2-1.
아래 `docs` 리스트로 `OpenAIEmbeddings()`와 `InMemoryVectorStore.from_texts()`를 이용해
`vectorstore` 변수를 만드세요.

```
docs = [
    "대출 기간: 도서는 1인당 5권까지, 14일간 대출할 수 있습니다.",
    "연장 신청: 대출 기간 만료 3일 전부터 온라인으로 1회 연장 신청이 가능합니다.",
    "연체료: 반납 기한을 넘기면 1권당 하루 100원의 연체료가 부과됩니다.",
    "열람실 이용: 열람실은 평일 오전 9시부터 오후 10시까지 이용할 수 있습니다.",
    "예약 서비스: 대출 중인 도서는 예약 신청 후 반납되면 우선적으로 대출받을 수 있습니다.",
]
```

### 2-2.
`vectorstore.similarity_search("연체료 얼마예요?", k=2)`를 실행하고, 검색된 문서 내용을
출력하세요.

### 2-3. (도전)
"책 며칠 동안 빌릴 수 있어요?"처럼 표현이 다르지만 의미가 비슷한 질문으로도 검색해보고,
정확히 같은 단어가 없어도 관련 문서가 검색되는지 확인해보세요.

---

## Part 3. Retriever 활용하기

### 3-1.
`vectorstore.as_retriever(search_kwargs={"k": 2})`로 `retriever` 변수를 만드세요.

### 3-2.
`retriever.invoke("열람실 몇 시까지 열어요?")`의 결과를 하나씩 출력하세요.

### 3-3. (도전)
문서 내용과 관련 없는 질문(예: "오늘 점심 뭐 먹지?")으로 `retriever.invoke()`를 호출해보고,
그래도 어떤 문서든 검색되는지 확인해보세요. (Retriever는 "관련 있는" 문서가 없어도 k개를
찾아서 반환한다는 점을 관찰하는 문제입니다.)

---

## Part 4. 검색 기반 답변 Chain 구성

### 4-1.
검색된 문서들을 하나의 문자열로 합쳐주는 `format_docs(docs)` 함수를 작성하세요.

### 4-2.
system 메시지 `"다음 문서를 참고해서 질문에 답하세요. 문서에 없는 내용이면 '문서에서 찾을
수 없습니다.' 라고 답하세요.\n\n문서:\n{context}"`, human 메시지 `"{question}"`로 구성된
`ChatPromptTemplate`을 만들고,
`{"context": retriever | format_docs, "question": RunnablePassthrough()} | prompt | llm | StrOutputParser()`
형태로 `rag_chain`을 완성하세요.

### 4-3. (도전)
`rag_chain.invoke("책 몇 권까지 빌릴 수 있나요?")`를 실행해 답변을 확인하고, 문서에 없는
질문(예: "주차장은 몇 층인가요?")도 하나 만들어 실행해 답변이 어떻게 달라지는지 비교하세요.

---

## Part 5. 종합 실습 — 도서관 안내 Q&A 봇

Part 2~4에서 만든 `vectorstore`, `retriever`, `rag_chain`을 활용해 아래 요구사항을
만족하는 미니 Q&A 봇을 하나의 `.py` 파일로 완성하세요.

1. `question`(문자열)을 받아 `rag_chain.invoke(question)`을 호출해 답변 문자열을 반환하는
   `library_qa_bot(question)` 함수를 작성하세요.
2. `library_qa_bot("연장 신청은 어떻게 하나요?")`를 실행해 문서 기반으로 잘 답하는지
   확인하세요.
3. `library_qa_bot("주차장은 몇 층인가요?")`처럼 문서에 없는 질문도 실행해, "문서에서 찾을
   수 없습니다"와 같은 답변이 나오는지 확인하세요.
4. (도전) `docs`에 `"휴관일: 매월 첫째 주 월요일은 휴관합니다."` 항목을 추가한 뒤
   `vectorstore`를 다시 만들고, `library_qa_bot("이번 달 첫째 주 월요일에 문 열어요?")`를
   실행해 새로 추가한 문서를 잘 찾아서 답하는지 확인하세요.
