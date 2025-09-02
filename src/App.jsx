import { useState } from 'react'
import './App.css'
import TodoList from './component/TodoList.jsx'
import AxiosGetTodoList from './AxiosGetTodoList.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TodoList />
      </div>
      <AxiosGetTodoList />
    </>
  )
}

export default App
