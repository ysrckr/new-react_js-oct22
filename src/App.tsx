import { useCallback } from 'react';
import { useState } from 'react';
import './App.scss';
import { getUser, TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo, TodoWithoutUser } from './types/Todo';

const todosFromServer: TodoWithoutUser[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];

export function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));
  });
  const [query, setQuery] = useState('');
  const [todoToUpdate, setTodoToUpdate] = useState<Todo>();
  const [isEditing, setIsEditing] = useState(false);

  const editTodo = () => {
    setIsEditing(true);
  };

  const saveTodo = () => {
    setIsEditing(false);
  };

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  const deleteTodo = useCallback(
    (todoToDelete: Todo) => {
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
    },

    [todos],
  );

  const updateTodo = useCallback((todo: Todo) => {
    setTodos(prev => [...prev, todo]);

    saveTodo();
  }, []);

  const selectTodoToUpdate = (todo: Todo) => {
    setTodoToUpdate(todo);
  };

  return (
    <div className='App'>
      <input
        type='text'
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onTodoDeleted={deleteTodo}
        edit={editTodo}
        selectTodo={selectTodoToUpdate}
      />
      {isEditing && (
        <TodoForm
          onSubmit={updateTodo}
          todo={todoToUpdate}
        />
      )}
    </div>
  );
}
