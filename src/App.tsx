import { useState } from 'react';
import './App.scss';
import { Todo, TodoWithoutUser } from './types/Todo';
import { User } from './types/User';

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

const usersFromServer: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
];

function getUser(id: number) {
  return usersFromServer.find(user => user.id === id);
}

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

type TodoFormProps = {
  onSubmit: (todo: Todo) => void,
  todo?: Todo,
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, todo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState(todo?.title || '');
  const [selectedUserId, setSelectedUserId] = useState(todo?.userId || 0);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          id: todo?.id || Date.now(),
          title: newTodoTitle,
          userId: selectedUserId,
          completed: todo?.completed || false,
          user: getUser(selectedUserId),
        });
      }}
    >
      <input
        type="text"
        value={newTodoTitle}
        onChange={(event) => {
          setNewTodoTitle(event.target.value);
        }}
      />

      <select
        value={selectedUserId}
        onChange={(event) => {
          setSelectedUserId(+event.target.value);
        }}
      >
        <option value="0">---</option>
        {usersFromServer.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button>Add</button>
    </form>
  );
}

const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
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
  )
}
