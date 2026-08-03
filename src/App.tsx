import { Outlet } from 'react-router-dom'
import { AiCommandCenter } from '@/widgets/ai-chat/ai-command-center.tsx'

function App() {
  return (
    <>
      <Outlet />
      <AiCommandCenter />
    </>
  )
}

export default App