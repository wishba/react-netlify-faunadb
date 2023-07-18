import netlifyIdentity from 'netlify-identity-widget';
import { useState } from 'react';

function App() {
  netlifyIdentity.init()

  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)
  const userId = netlifyIdentity.currentUser().id;

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
    <>
      <header className='container-fluid'>
        <nav>
          <ul><li><strong>Todo app</strong></li></ul>

          <ul>
            <li><a href='#' role='button' onClick={() => netlifyIdentity.open()}>Login</a></li>
          </ul>
        </nav>
      </header>

      <main className='container'>
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
      </main>
    </>
  )
}

export default App
