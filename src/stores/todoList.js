import { create } from 'zustand';
import todoItems from '../assets/todoItems.json';
import axios from 'axios';
import api from '../services/Axios';

// Todo 状态仓库
export const useTodoStore = create((set, get) => ({
  todos: [],
  isFilter: false,

  fetchTodos: async () => {
    const response = await api.get('/todos');
    // 赋值todos
    set({ todos: response.data });
  },

  setFilter: () => set(state => ({ isFilter: !state.isFilter })),
  // addTodos: (next) => set(state => ({
  //     todos:
  //       typeof next === 'function'
  //         ? next(state.todos)          // 支持函数式更新
  //         : next
  //   })),

  // ...existing code...
  //         : next
  //   })),

  addTodos: async (title) => {
    if (!title) return;
    try {
      // 1. 准备要发送到后端的 todo 对象作为请求体
      const newTodoPayload = {
        title,
        completed: false
      };

      // 2. 发送 POST 请求，并将请求体传给后端
      // 我们假设后端会返回创建好的 todo 对象，包含新的 id
      const response = await api.post('/todos', newTodoPayload);

      // 3. 使用从服务器返回的完整 todo 对象 (response.data) 来更新状态
      set(state => ({
        todos: [...state.todos, response.data]
      }));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  },


  toggleTodo: async (id) => {
    const todo = get().todos.find(t => t.id === id);
    if (!todo) return;
    const newCompletedStatus = !todo.completed;
    const updatedTodoPayload = {
      ...todo,
      completed: newCompletedStatus
    };
    try {
      await api.patch(`/todos/${id}`, updatedTodoPayload);
      set(state => ({
        todos: state.todos.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      }));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  },
  // 派生数据可用函数方式获取
  getFilteredTodos: () => {
    const { isFilter, todos } = get();
    return isFilter ? todos.filter(t => !t.completed) : todos;
  },

  clearCompleted: () =>
    set(state => ({
      todos: state.todos.filter(t => !t.completed)
    })),

  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      set(state => ({
        todos: state.todos.filter(t => t.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
}));