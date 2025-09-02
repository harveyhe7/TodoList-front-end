import { useState } from 'react'
import './App.css'
import TodoList from './component/TodoList.jsx'
import AxiosGetTodoList from './AxiosGetTodoList.jsx'
import { Route } from 'react-router'
function App() {

  return (
    <>
      <div>
        <TodoList />
      </div>
    </>
  )
}

export default App
