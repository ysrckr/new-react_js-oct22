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

// 
const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export function App() {
  const [todos, setTodos] = useState(preparedTodos);

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo])
  }

  // function updateTodo(updatedTodo: Todo) {
  //   setTodos(todos.map(todo => {
  //     if (todo.id !== updatedTodo.id) {
  //       return todo;
  //     }

  //     return updatedTodo;
  //   }));
  // }

  return (
    <div className="App">
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}


