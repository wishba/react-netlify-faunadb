import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function Nav() {
  const [button, setButton] = useState('Login')

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      setButton('Logout')
    }
  }, [])

  netlifyIdentity.on('login', () => location.reload())
  netlifyIdentity.on('logout', () => location.reload())

  return (
    <nav>
      <ul><li><strong>Todo app</strong></li></ul>
      <ul><li><a href='#' role='button' onClick={() => netlifyIdentity.open()}>{button}</a></li></ul>
    </nav>
  )
}

export default Nav