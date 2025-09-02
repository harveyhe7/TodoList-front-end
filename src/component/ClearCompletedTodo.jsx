// 清楚已完成的todo

import React from 'react';
import { useTodoStore } from '../stores/todoList';

export default function ClearCompletedTodo() {
    const clearCompleted = useTodoStore(s => s.clearCompleted);
    return (
        <button onClick={clearCompleted}>清除已完成的待办事项</button>
    );
}
