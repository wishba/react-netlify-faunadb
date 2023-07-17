import netlifyIdentity from 'netlify-identity-widget';

function App() {
  netlifyIdentity.init()
  console.log(netlifyIdentity.currentUser().id);

  return (
    <>
      <nav className='container-fluid'>
        <ul><li><strong>Todo app</strong></li></ul>
        <ul>
          <li>
            <a href='#' role='button' onClick={() => netlifyIdentity.open()}>Login</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default App
