// ── STEP 3: 데이터 배열을 컴포넌트 목록으로 렌더링 ── (빈칸 채우기)
// 개념: 리스트 렌더링(.map + key), props 전달
// 막히면 정답 참고: lessons_edu/01_react_jsx_props/src/App.jsx
import './App.css'
import ProfileCard from './components/ProfileCard'

// (참고용으로 데이터는 제공됩니다)
const team = [
  { id: 1, name: '김민준', job: '프론트엔드', emoji: '👨‍💻', bgColor: '#e6f1fb', isOnline: true, isLead: true },
  { id: 2, name: '이서연', job: '디자이너', emoji: '🎨', bgColor: '#eaf3de', isOnline: true, isLead: false },
  { id: 3, name: '박지호', job: '백엔드', emoji: '🔧', bgColor: '#faeeda', isOnline: false, isLead: false },
  { id: 4, name: '최수아', job: '기획자', emoji: '📋', bgColor: '#f3e6fb', isOnline: false, isLead: false },
]

function App() {
  // return 문에 렌더링할 요소를 작성
  //  주의사항: 하나의 요소로 감싸서 그룹화 시켜야 함
  //  return (<div></div><div></div>)   (X)
  //          <div></div>, <></>빈요소   (O)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>우리 팀 소개 ({team.length}명)</h1>

      <div>
        {/* TODO: STEP 3 — team 배열을 .map으로 순회하며 ProfileCard를 렌더링하세요.
            - 각 항목에 고유한 key를 주고
            - name, job, emoji, bgColor, isOnline, isLead 를 props로 전달 */}
        {team.map((member) => (
          <ProfileCard
            key={member.id}
            name={member.name}
            job={member.job}
            emoji={member.emoji}
            bgColor={member.bgColor}
            isOnline={member.isOnline}
            isLead={member.isLead}
          />
        ))

        }
      </div>
    </div>
  )
}

export default App 
