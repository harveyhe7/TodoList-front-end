import { useTodoStore } from './stores/todoList';
import styles from './TodoList.module.css';

function TodoItem({title, completed, onToggle }) {
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
    
  const filteredItems = isFilter ? todos.filter(item => !item.completed) : todos;

  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input type="checkbox" checked={isFilter} onChange={setFilter} />
        过滤已完成的代办事项
      </label>
      <ul>
        {filteredItems.map(item => 
          <TodoItem key={item.id} {...item} onToggle={() => toggleTodo(item.id)} />
        )}
      </ul>
    </section>
  );
}