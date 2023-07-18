import netlifyIdentity from 'netlify-identity-widget';

function App() {
  netlifyIdentity.init()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userId = netlifyIdentity.currentUser().id;
    const title = 'Build an awesome app!';
    const completed = false;

    const response = await fetch('/.netlify/functions/createTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, completed }),
    })

    if (response.ok) {
      console.log('Create a new todo is successful');
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
        <button onClick={handleSubmit}>tes</button>

        <form action="">
          <label htmlFor="">todo</label>
          <input type="text" name="" id="" />
          <label htmlFor="">
            completed &nbsp;
            <input type="checkbox" name="" id="" />
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
      </main>
    </>
  )
}

export default App
