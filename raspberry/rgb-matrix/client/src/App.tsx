import { createSignal } from 'solid-js'

import './App.css'
import { Display } from './Display'






function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <Display />
    </>
  )
}

export default App
