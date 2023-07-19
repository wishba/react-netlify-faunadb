import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function ListAllTodos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getAllTodos()
  }, [])

  const userId = netlifyIdentity.currentUser().id

  const getAllTodos = async () => {
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

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <p>Title: {todo.title}</p>
          <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </li>
      ))}
    </ul>
  )
}

export default ListAllTodos