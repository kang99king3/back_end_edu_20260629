# Day 9 실습예제 — 여러 기능을 연결하는 미니 AI Agent 만들기

## 진행 안내

- 개발 환경 : 순정 Python + venv 가상환경 + VS Code
- 아래 명령어는 모두 **VS Code 통합 터미널**(`` Cmd+` `` / `Ctrl+` `` `` )에서 실행합니다.

```bash
python -m venv myenv
source myenv/bin/activate      # Windows: myenv\Scripts\activate
pip install langchain langchain-core langchain-openai python-dotenv
```

- 이번 시간도 `.env` 파일에 `OPENAI_API_KEY=발급받은키` 를 저장해두고 시작합니다.
- `create_agent`는 `from langchain.agents import create_agent` 로 가져옵니다.
- 아래 문제들은 하나의 `.py` 파일에 이어서 작성해도 되고, Part별로 새 파일을 만들어도 됩니다.

---

## Part 1. Tool 준비하기

### 1-1.
통화 코드(`"USD"`, `"JPY"`, `"EUR"` 등)를 받아 환율 정보를 반환하는
`get_exchange_rate(currency: str)` 함수를 `@tool` 데코레이터와 함께 작성하세요.
(docstring 필수! Agent가 이 문구를 보고 도구 사용 여부를 판단합니다.)

```
from langchain_core.tools import tool

@tool
def get_exchange_rate(currency: str) -> str:
    # 여기에 작성
```

### 1-2.
사칙연산 문자열(예: `"1000 / 4"`)을 계산해 반환하는 `calculate(expression: str)`
함수를 `@tool`로 작성하세요. `ast.parse`와 `ast.BinOp`를 활용하면 `eval()`보다
안전하게 계산할 수 있습니다.

```
import ast, operator

@tool
def calculate(expression: str) -> str:
    # 여기에 작성
```

### 1-3. (도전)
`get_exchange_rate.invoke({"currency": "USD"})`와
`calculate.invoke({"expression": "1000 / 4"})`를 각각 실행해, Tool 함수가
Agent 없이도 단독으로 잘 동작하는지 먼저 확인하세요.

---

## Part 2. create_agent + invoke 기본

### 2-1.
`get_exchange_rate` 하나만 `tools`로 갖는 agent를
`create_agent(model=llm, tools=[...], system_prompt="...")`로 만드세요.

### 2-2.
`agent.invoke({"messages": [{"role": "user", "content": "달러 환율이 어떻게 되나요?"}]})`
를 실행하고, `result["messages"][-1].content`를 출력하세요.

### 2-3. (도전)
`result["messages"]`를 순서대로 출력해보며, 질문(HumanMessage) → 도구 호출 판단
(tool_calls가 담긴 AIMessage) → 도구 실행 결과(ToolMessage) → 최종 답변(AIMessage)
흐름이 실제로 몇 개의 메시지로 이루어지는지 세어보세요.

---

## Part 3. 여러 Tool 중 알맞은 것 선택 확인

### 3-1.
`[get_exchange_rate, calculate]` 두 Tool을 가진 agent를 만드세요.

### 3-2.
`"엔화 환율 알려줘"`와 `"250 빼기 130은?"` 두 질문을 각각 `invoke()`해서,
서로 다른 도구가 호출되는지 답변으로 확인하세요.

### 3-3. (도전)
`"오늘 기분이 어때?"`처럼 두 도구 모두와 관련 없는 질문도 `invoke()`해보고,
`result["messages"]` 안에 `ToolMessage`가 있는지 없는지 확인해 Agent가 도구를
쓰지 않고 바로 답했는지 판단해보세요.

---

## Part 4. Retrieval Tool 연결하기

### 4-1.
아래 `docs`로 `vectorstore`와 `retriever(k=2)`를 만드세요.

```
docs = [
    "대출 기간: 도서는 1인당 5권까지, 14일간 대출할 수 있습니다.",
    "연장 신청: 대출 기간 만료 3일 전부터 온라인으로 1회 연장 신청이 가능합니다.",
    "연체료: 반납 기한을 넘기면 1권당 하루 100원의 연체료가 부과됩니다.",
    "열람실 이용: 열람실은 평일 오전 9시부터 오후 10시까지 이용할 수 있습니다.",
]
```

### 4-2.
`retriever`를 함수 안에서 호출해 관련 문서를 검색하고, 검색 결과를 하나의
문자열로 합쳐 반환하는 `search_library(query: str)` 함수를 `@tool`로 작성하세요.

### 4-3. (도전)
`tools=[search_library]`로 agent를 만들고, `"연체료가 얼마인가요?"`를
`invoke()`해서 답변을 확인하세요. `result["messages"]`에 `ToolMessage`가
포함되어 있는지도 함께 확인하세요.

---

## Part 5. 종합 실습 — 멀티 툴 생활 비서 만들기

Part 1~4에서 만든 `get_exchange_rate`, `calculate`, `search_library` 세 Tool을
모두 활용해 아래 요구사항을 만족하는 미니 생활 비서를 하나의 `.py` 파일로
완성하세요.

1. `tools=[get_exchange_rate, calculate, search_library]`로 agent를 만들고,
   `system_prompt`에 `'여러 도구를 상황에 맞게 사용하는 생활 비서'`라는 역할을
   적으세요.
2. `question`(문자열)을 받아 `agent.invoke()` 결과의 최종 답변을 반환하는
   `ask_life_assistant(question)` 함수를 작성하세요.
3. `"유로 환율 좀 알려줘"`, `"3200 곱하기 5는?"`, `"책 대출 기간이 며칠이에요?"`,
   `"좋은 하루 보내세요!"` 네 가지 질문을 각각 `ask_life_assistant()`로 실행해,
   세 도구와 '도구 없이 바로 답하기'가 상황에 맞게 쓰이는지 확인하세요.
4. (도전) `search_library`를 `tools` 목록에서 뺀 새로운 agent를 만들고,
   같은 질문(`"책 대출 기간이 며칠이에요?"`)을 다시 실행해보세요. 검색 도구가
   없을 때는 답변이 어떻게 달라지는지 비교해보세요.
   (도구가 없으면 Agent가 알고 있는 범위 안에서만 답한다는 점을 관찰하는 문제입니다.)
