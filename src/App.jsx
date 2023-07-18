import Nav from './components/Nav';
import CreateTodo from './components/CreateTodo';

function App() {
  return (
    <>
      <header className='container-fluid'>
        <Nav />
      </header>

      <main className='container'>
        <CreateTodo />
      </main>
    </>
  )
}

export default App
