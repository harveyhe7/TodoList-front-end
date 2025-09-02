import { useTodoStore } from '../stores/todoList';
import styles from './TodoList.module.css';
import { useEffect } from 'react';
import ToDoListCount from './ToDoListCount.jsx'
import ClearCompletedTodo from './ClearCompletedTodo.jsx'
import axios from 'axios';
function TodoItem({ title, completed, onToggle }) {
    const itemClassName = `${styles.item} ${completed ? styles.checked : ''}`;
    return (
        <li className={itemClassName}>
            <label>
                <input type="checkbox" checked={completed} onChange={onToggle} />
                {title}{completed && ' ✅'}
            </label>
        </li>
    );
}

export default function TodoList() {
    // 采用选择器减少重渲染
    const isFilter = useTodoStore(s => s.isFilter);
    const toggleTodo = useTodoStore(s => s.toggleTodo);
    const setFilter = useTodoStore(s => s.setFilter);
    const todos = useTodoStore(s => s.todos);
    const setTodos = useTodoStore(s => s.setTodos);
    const fetchTodos = useTodoStore(s => s.fetchTodos);

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
            <form onSubmit={e => {
                e.preventDefault();
                const input = e.target.elements.title;
                const title = input.value.trim();

                if (title) {
                    setTodos(todos => [
                        ...todos,
                        { id: todos.length + 1, title, completed: false }
                    ]);
                    input.value = '';
                }
                console.log(todos);
            }}>
                <input name="title" placeholder="请输入新的待办事项" />
                <button type="submit">添加</button>
            </form>
            <ul>
                {filteredItems.map(item =>
                    <TodoItem key={item.id} {...item} onToggle={() => toggleTodo(item.id)} />
                )}
            </ul>
            <ClearCompletedTodo />
        </section>
    );
}