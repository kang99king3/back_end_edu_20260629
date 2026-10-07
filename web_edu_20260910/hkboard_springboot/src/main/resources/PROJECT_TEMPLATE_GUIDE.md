# Spring Boot + MariaDB + MyBatis + Thymeleaf 프로젝트 템플릿 가이드

이 문서는 **Spring Boot**, **MariaDB**, **MyBatis**, **Thymeleaf**를 기반으로 웹 애플리케이션을 새로 구축할 때 필요한 확장 프로그램, 의존성 라이브러리, 기본 설정을 정리한 템플릿 가이드입니다. (기본 기준: **JDK 21 LTS**)

---

## 1. 프로젝트 기본 스펙 (Environment)

- **Java Version**: **21** (LTS) *(※ JDK 17과 호환 가능)*
- **Build Tool**: Maven
- **Framework**: Spring Boot (3.2.x 이상 권장)
- **Database**: MariaDB
- **Persistence**: MyBatis 3.x
- **Template Engine**: Thymeleaf

---

## 2. 권장 IDE 확장 프로그램 (VS Code / Antigravity Extensions)

IDE에서 개발 생산성 및 자동 완성을 위해 다음 확장 프로그램을 설치합니다.

| 구분 | 확장 프로그램 명 (Extension) | 설명 및 용도 |
| :--- | :--- | :--- |
| **Java 필수** | **Extension Pack for Java** *(Microsoft)* | Java 언어 지원, 디버깅, Maven 프로젝트 관리, 테스트 러너 통합 팩 |
| **Spring 필수** | **Spring Boot Extension Pack** *(VMware)* | Spring Boot 프로젝트 실행/대시보드 관리, 설정 파일 자동완성 |
| **View 템플릿** | **Thymeleaf HTML5 Snippets** | `th:*` 태그 자동 완성 및 Thymeleaf HTML5 뼈대 스니펫 제공 |
| **DB / Mapper** | **MyBatisX** 또는 **XML** *(Red Hat)* | Mapper XML 태그 지원 및 Java Mapper 인터페이스 ↔ XML SQL 간 점프(Jump) 지원 |
| **생산성** | **Lombok Annotations Support for VS Code** | `@Getter`, `@Setter`, `@Data` 등의 Lombok 어노테이션 인식 및 getter/setter 생성 |
| **DB 툴 (선택)** | **Database Client** 또는 **SQLTools** | IDE 내에서 MariaDB 접속 및 쿼리 실행 |

---

## 3. 핵심 라이브러리 및 의존성 (`pom.xml`)

다음 의존성 블록을 `pom.xml`에 적용합니다.

```xml
<properties>
    <!-- JDK 21 기준 설정 -->
    <java.version>21</java.version>
</properties>

<dependencies>
    <!-- 1. Web & MVC -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>

    <!-- 2. Thymeleaf 템플릿 엔진 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>

    <!-- 3. MariaDB JDBC 드라이버 -->
    <dependency>
        <groupId>org.mariadb.jdbc</groupId>
        <artifactId>mariadb-java-client</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- 4. MyBatis 연동 스타터 -->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.4</version>
    </dependency>

    <!-- 5. Lombok (JDK 21 호환: 1.18.30 이상 필수, Spring Boot 3.2+는 버전 자동 관리) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- 6. DevTools (코드 변경 시 자동 리로드) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>

    <!-- 7. 테스트 의존성 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Lombok 컴파일러 플러그인 설정 (`pom.xml` 내 `<build>`)
Maven 빌드 시 Lombok 어노테이션을 정상 처리하기 위해 아래 플러그인 설정을 추가해야 합니다:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

---

## 4. 기본 설정 템플릿 (`application.properties`)

위치: `src/main/resources/application.properties`

```properties
spring.application.name=demo
server.port=9090

# MariaDB 연결 설정
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.datasource.url=jdbc:mariadb://localhost:3306/{DB_NAME}
spring.datasource.username={DB_USER}
spring.datasource.password={DB_PASSWORD}

# MyBatis 설정
mybatis.type-aliases-package=com.example.demo.dtos
mybatis.mapper-locations=classpath:mapper/**/*.xml

# 개발용 Thymeleaf 캐시 비활성화 (HTML 수정 시 즉시 반영)
spring.thymeleaf.cache=false

# [JDK 21 전용 옵션] 가상 스레드(Virtual Threads) 활성화 (Spring Boot 3.2+)
# 톰캣 톰캣 요청 처리를 경량 가상 스레드로 처리하여 동시성 처리량 대폭 향상
spring.threads.virtual.enabled=true
```

---

## 5. 💡 JDK 21 vs JDK 17 호환성 및 차이점 정리

| 비교 항목 | **JDK 21 (현재 템플릿 기준)** | **JDK 17** | 호환성 및 전환 시 주의사항 |
| :--- | :--- | :--- | :--- |
| **Spring Boot 지원** | Spring Boot 3.x (3.2+ 권장) | Spring Boot 3.x 기본 베이스라인 | Spring Boot 3.x는 둘 다 완벽 지원 |
| **`pom.xml` 설정** | `<java.version>21</java.version>` | `<java.version>17</java.version>` | 17로 낮출 경우 이 항목만 17로 변경 |
| **가상 스레드 (Virtual Threads)** | **지원** (`spring.threads.virtual.enabled=true`) | **미지원** | 17 환경으로 변경 시 `application.properties`에서 해당 옵션 제거 필요 |
| **Lombok 버전** | **1.18.30 이상 필수** | 1.18.2x 대 구버전도 동작 | JDK 21 내부 컴파일러 변경으로 구버전 Lombok 사용 시 컴파일 에러 발생 |
| **주요 신규 문법** | • Sequenced Collections (`getFirst()`, `getLast()`)<br>• Switch 패턴 매칭<br>• Record 패턴 | 미지원 (17 표준 문법 사용) | JDK 21 전용 문법을 쓴 코드는 JDK 17 환경에서 컴파일 에러 발생 |

### 📌 JDK 17 환경으로 전환해야 할 경우 체크리스트
1. `pom.xml`의 `<java.version>`을 `21`에서 `17`로 변경
2. `application.properties`의 `spring.threads.virtual.enabled=true` 주석 처리 또는 삭제
3. `list.getFirst()`, `list.getLast()` 대신 `list.get(0)`, `list.get(list.size() - 1)` 등 17 표준 문법 사용

---

## 6. 권장 디렉터리 및 패키지 구조

```text
src/main/java/com/example/demo/
├── DemoApplication.java       # 스프링 부트 메인 실행 클래스
├── controller/                # 웹 컨트롤러 (@Controller, @RestController)
│   └── MainController.java
├── service/                   # 비즈니스 로직 (@Service)
├── mapper/                    # MyBatis 매퍼 인터페이스 (@Mapper)
│   └── TestBoardMapper.java
└── dtos/                      # 데이터 전달 객체 DTO (Record 또는 Class)
    └── TestBoardDto.java

src/main/resources/
├── application.properties     # 애플리케이션 환경설정
├── mapper/                    # MyBatis SQL XML 파일
│   └── TestBoardMapper.xml
├── static/                    # 정적 파일 (css, js, images)
└── templates/                 # Thymeleaf HTML 파일
    └── main.html
```

---

## 7. 새 프로젝트 생성 시 빠른 체크리스트 (Spring Initializr)

[start.spring.io](https://start.spring.io) 또는 IDE의 `Spring Initializr` 명령어 사용 시 선택:

1. **Project**: Maven
2. **Language**: Java
3. **Spring Boot**: 3.2.x 이상 최신 안정 버전
4. **Java Version**: **21**
5. **Dependencies**:
   - `Spring Web`
   - `Thymeleaf`
   - `MariaDB Driver`
   - `MyBatis Framework`
   - `Lombok`
   - `Spring Boot DevTools` (선택)
