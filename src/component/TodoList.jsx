import { useTodoStore } from '../stores/todoList';
import styles from './TodoList.module.css';
import { useEffect } from 'react';
import ToDoListCount from './ToDoListCount.jsx'
import ClearCompletedTodo from './ClearCompletedTodo.jsx'
import AddTodo from './AddTodo.jsx';
import axios from 'axios';
function TodoItem({ title, completed, onToggle, onDelete }) {
    const itemClassName = `${styles.item} ${completed ? styles.checked : ''}`;
    return (
        <li className={itemClassName}>
            <label>
                <input type="checkbox" checked={completed} onChange={onToggle} />
                {title}{completed && ' ✅'}
            </label>
            <button onClick={onDelete} style={{ marginLeft: '10px', cursor: 'pointer' }}>删除</button>
        </li>
    );
}

export default function TodoList() {
    // 采用选择器减少重渲染
    const isFilter = useTodoStore(s => s.isFilter);
    const toggleTodo = useTodoStore(s => s.toggleTodo);
    const setFilter = useTodoStore(s => s.setFilter);
    const todos = useTodoStore(s => s.todos);
    const addTodos = useTodoStore(s => s.addTodos);
    const fetchTodos = useTodoStore(s => s.fetchTodos);
    const deleteTodo = useTodoStore(s => s.deleteTodo);
    console.log(todos)
    useEffect(() => {
        fetchTodos();
    }, []);

    const filteredItems = isFilter ? todos.filter(item => !item.completed) : todos;

    return (
        <section>
            <h1>Sally Ride 的 Todo 清单</h1>
            <h1>Zustand版本</h1>
            <ToDoListCount />
            <label>
                <input type="checkbox" checked={isFilter} onChange={setFilter} />
                过滤已完成的代办事项
            </label>
            <AddTodo />
            <ul>
                {filteredItems.map(item =>
                    <TodoItem key={item.id} {...item} onToggle={() => toggleTodo(item.id)} onDelete={() => deleteTodo(item.id)} />
                )}
            </ul>
            <ClearCompletedTodo />
        </section>
    );
}