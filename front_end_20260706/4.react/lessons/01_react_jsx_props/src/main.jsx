// ── STEP 1: 앱의 진입점(entry point) ──
// 브라우저의 index.html 안 <div id="root"></div> 에 React 앱을 붙입니다.
// 여기서는 손댈 게 거의 없고, 실제 학습은 App.jsx / ProfileCard.jsx에서 진행합니다.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot: React 18의 렌더링 진입 API
// - ReactDOM.render(<App />, document.getElementById('root'));// 동시성 구현 안됨
// StrictMode: 개발 중 잠재적 문제를 잡아주는 검사용 래퍼 (실제 화면에는 영향 없음)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
