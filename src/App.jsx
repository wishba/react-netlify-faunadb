import ListAllTodos from './components/ListAllTodos';
import Nav from './components/Nav';
import netlifyIdentity from 'netlify-identity-widget';
import TodoForm from './components/todoForm';

function App() {
  netlifyIdentity.init()

  return (
    <>
      <header className='container-fluid'>
        <Nav />
      </header>

      <main className='container'>
        <TodoForm />
        <ListAllTodos />
      </main>
    </>
  )
}

export default App
