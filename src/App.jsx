import Nav from './components/Nav';
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  netlifyIdentity.init()

  const [todos, setTodos] = useState([])

  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmitTodo = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    const response = await fetch('/.netlify/functions/createTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, completed }),
    })

    if (response.ok) {
      setTitle('')
      setCompleted(false)
      setIsSubmitting(false)
      setTodos([...todos, {
        _id: (await response.json()).data.createTodo._id,
        userId: userId,
        title: title,
        completed: completed,
      }])
    } else {
      console.error('Failed to create a new todo item.')
    }
  }

  const handleDeleteTodo = async (id) => {
    const response = await fetch('/.netlify/functions/deleteTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      const filteredTodos = todos.filter((todo) => todo._id !== id)
      setTodos(filteredTodos)
    } else {
      console.error('Failed to delete todo list.')
    }
  }

  return (
    <>
      <header className='container-fluid'>
        <Nav />
      </header>

      <main className='container'>
        <form onSubmit={handleSubmitTodo}>
          <label>todo</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
          <label>
            completed &nbsp;
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </label>
          <br />
          {isSubmitting ?
            <input type="submit" value="submitting..." disabled />
            :
            <input type="submit" value="submit" />
          }
        </form>

        <ul>
          {todos.slice().reverse().map((todo) => (
            <li key={todo._id}>
              <p>Title: {todo.title}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleDeleteTodo(todo._id)
              }}>delete</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
