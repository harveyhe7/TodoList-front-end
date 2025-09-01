import { create } from 'zustand';
import todoItems from '../todoItems.json';

// Todo 状态仓库
export const useTodoStore = create((set, get) => ({
  todos: todoItems,
  isFilter: false,
  toggleFilter: () => set(state => ({ isFilter: !state.isFilter })),
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