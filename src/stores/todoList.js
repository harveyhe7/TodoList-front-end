import { create } from 'zustand';
import todoItems from '../assets/todoItems.json';
import axios from 'axios';

// Todo 状态仓库
export const useTodoStore = create((set, get) => ({
  todos: todoItems,
  isFilter: false,
  setFilter: () => set(state => ({ isFilter: !state.isFilter })),
  setTodos: (next) => set(state => ({
      todos:
        typeof next === 'function'
          ? next(state.todos)          // 支持函数式更新
          : next
    })),
  toggleTodo: (id) =>
    set(state => ({
      todos: state.todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    })),
  // 派生数据可用函数方式获取
  getFilteredTodos: () => {
    const { isFilter, todos } = get();
    return isFilter ? todos.filter(t => !t.completed) : todos;
  }
}));