import React from 'react';
import { useTodoStore } from '../stores/todoList';

export default function AddTodo() {
    // 从 store 中获取 addTodos action 和 todos 状态
    const addTodos = useTodoStore(s => s.addTodos);
    const todos = useTodoStore(s => s.todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = e.target.elements.title;
        const title = input.value.trim();

        if (title) {
            addTodos(title);
            input.value = '';
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="请输入新的待办事项" />
            <button type="submit">添加</button>
        </form>
    );
}