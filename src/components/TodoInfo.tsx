import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  select: (todo: Todo) => void;
  edit: () => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onDelete, select, edit }) => {
  console.log('TodoInfo', todo.id);

  return (
    <div>
      {todo.user?.name}
      {': '}
      {todo.title}
      {' - '}
      {todo.completed ? 'X' : '0'}

      <button
        onClick={() => {
          onDelete(todo);
        }}>
        x
      </button>

      <button
        onClick={() => {
          edit();
          select(todo);
        }}>
        Edit
      </button>
    </div>
  );
};
