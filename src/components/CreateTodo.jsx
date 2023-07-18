import React, { useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget';

function CreateTodo() {
  netlifyIdentity.init()

  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)

  let userId = ''
  if (netlifyIdentity.currentUser() !== null) {
    userId = netlifyIdentity.currentUser().id;
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
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
      console.log('Success to create a new todo item');
      setTitle('')
      setCompleted(false)
      setIsSubmitting(false)
    } else {
      console.error('Failed to create a new todo item.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>todo</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label>
        completed &nbsp;
        <input type="checkbox" onChange={(e) => setCompleted(e.target.checked)} />
      </label>
      <br />
      {isSubmitting ?
        <input type="submit" value="submitting..." disabled />
        :
        <input type="submit" value="submit" />
      }
    </form>
  )
}

export default CreateTodo