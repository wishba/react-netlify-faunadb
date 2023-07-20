import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function ListAllTodos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getAllTodos()
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

  const handleDeleteTodo = async (id) => {
    console.log(id);

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
    <ul>
      {todos.map((todo) => (
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
  )
}

export default ListAllTodos