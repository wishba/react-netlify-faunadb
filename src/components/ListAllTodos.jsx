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
      {todos.map((todo, index) => (
        <li key={index}>
          <strong>Title:</strong> {todo.title}<br />
          <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}<br />
        </li>
      ))}
    </ul>
  )
}

export default ListAllTodos