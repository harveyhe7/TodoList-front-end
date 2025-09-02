// 添加TodoItem状态统计组件，以便于查看哪些待办事项已经完成，哪些未完成；

import { useTodoStore } from '../stores/todoList';

export default function ToDoListCount() {
    const todos = useTodoStore(s => s.todos);
    const completedCount = todos.filter(t => t.completed).length;
    const totalCount = todos.length;
    const uncompletedCount = totalCount - completedCount;
    // 不分行显示
    return (
        <div>
            <p>总计: {totalCount}，未完成: {uncompletedCount}，已完成: {completedCount}</p>
        </div>
    );
}