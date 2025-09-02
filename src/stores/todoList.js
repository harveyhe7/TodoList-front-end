import { create } from 'zustand';
import todoItems from '../assets/todoItems.json';
import axios from 'axios';
import api from '../services/Axios';

// Todo 状态仓库
export const useTodoStore = create((set, get) => ({
  todos: [],
  isFilter: false,

  fetchTodos: async () => {
    const { data } = await api.get('/todos');
    set({ todos: data });
  },

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
  },

  clearCompleted: () =>
    set(state => ({
      todos: state.todos.filter(t => !t.completed)
    }))
}));