import { useTodoStore } from './stores/todoList';
import styles from './TodoList.module.css';

function TodoItem({ id, title, completed, onToggle }) {
  const itemClassName = `${styles.item} ${completed ? styles.checked : ''}`;
  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
        {title}{completed && ' ✅'}
      </label>
    </li>
  );
}

export default function TodoList() {
  // 采用选择器减少重渲染
  const isFilter = useTodoStore(s => s.isFilter);
  const toggleFilter = useTodoStore(s => s.toggleFilter);
  const toggleTodo = useTodoStore(s => s.toggleTodo);
  const todos = useTodoStore(s =>
    s.isFilter ? s.todos.filter(t => !t.completed) : s.todos
  );

  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input type="checkbox" checked={isFilter} onChange={toggleFilter} />
        过滤已完成的代办事项
      </label>
      <ul>
        {todos.map(item => (
          <TodoItem key={item.id} {...item} onToggle={toggleTodo} />
        ))}
      </ul>
    </section>
  );
}