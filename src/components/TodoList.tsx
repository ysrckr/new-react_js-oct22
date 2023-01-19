import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  onTodoDeleted: (todo: Todo) => void;
  selectTodo: (todo: Todo) => void;
  edit: () => void;
  
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, onTodoDeleted, selectTodo, edit }) => {
    return (
      <div className='TodoList'>
        {todos.map(todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
            onDelete={onTodoDeleted}
            edit={edit}
            select={selectTodo}
          />
        ))}
      </div>
    );
  },
);
