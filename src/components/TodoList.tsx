import { Todo } from '../types/Todo';

export const TodoList: React.FC<{ todos: Todo[]; }> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
        >
          {todo.user?.name}
          {': '}
          {todo.title}
          {' - '}
          {todo.completed ? 'X' : '0'}
        </li>
      ))}
    </ul>
  );
};
