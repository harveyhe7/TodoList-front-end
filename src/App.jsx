import { useState } from 'react'
import './App.css'
import TodoList from './component/TodoList.jsx'
import AxiosGetTodoList from './AxiosGetTodoList.jsx'
import { Route, Routes } from 'react-router'
function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </>
  )
}

export default App
