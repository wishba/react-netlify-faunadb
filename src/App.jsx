import Nav from './components/Nav';
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  netlifyIdentity.init()

  const [todos, setTodos] = useState([])

  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    getAllTodos()

    if (netlifyIdentity.currentUser() !== null) {
      setUserId(netlifyIdentity.currentUser().id)
    }
  }, [])

  const getAllTodos = async () => {
    const userId = netlifyIdentity.currentUser().id

    const response = await fetch('/.netlify/functions/readAllTodos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })

    if (response.ok) {
      const data = await response.json()
      setTodos(data.data.allTodosById.data)
    } else {
      console.error('Failed to get todo list.')
    }
  }

  const handleSubmitTodo = async () => {
    const response = await fetch('/.netlify/functions/createTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, completed }),
    })

    if (response.ok) {
      console.log('Success to create a new todo item.')
      const data = await response.json()
      console.log(data);
    } else {
      console.error('Failed to create a new todo item.')
    }
  }

  const handleDeleteTodo = async (todoId) => {
    const response = await fetch('/.netlify/functions/deleteTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todoId }),
    })

    if (response.ok) {
      console.log('Success to delete todo list.')
      const data = await response.json()
      console.log(data);
    } else {
      console.error('Failed to delete todo list.')
    }
  }

  const handleUpdateTodo = async (todoId) => {
    const response = await fetch('/.netlify/functions/updateTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todoId, userId, title, completed }),
    })

    if (response.ok) {
      console.log('Success to update todo list.')
      const data = await response.json()
      console.log(data);
    } else {
      console.error('Failed to update todo list.')
    }
  }

  const handleUpdateButton = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId ? { ...todo, showForm: !todo.showForm } : todo
      )
    );
  };

  return (
    <>
      <header className='container-fluid'>
        <Nav />
      </header>

      <main className='container'>
        <form>
          <label>todo</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>
            completed &nbsp;
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </label>
          <input type="submit" value="submit" onClick={(e) => {
            e.preventDefault()
            handleSubmitTodo()
          }} />
        </form>

        <ul>
          {todos.slice().sort((a, b) => b.timeStamp - a.timeStamp).map((todo) => (
            <li key={todo._id}>
              <p>Title: {todo.title}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleDeleteTodo(todo._id)
              }}>delete</a>

              <span> | </span>

              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleUpdateButton(todo._id)
              }}>{todo.showForm ? 'cancel update' : 'update'}</a>

              {todo.showForm && (
                <form>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <label>completed &nbsp;
                    <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                  </label>
                  <input type="submit" value="update" onClick={(e) => {
                    e.preventDefault()
                    handleUpdateTodo(todo._id)
                  }} />
                </form>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
