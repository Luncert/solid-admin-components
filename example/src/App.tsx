import AppLayout from './AppLayout'
import { Route, Router } from "@solidjs/router"
import Home from './views/Home'
import './App.css'

function App() {

  return (
    <Router root={AppLayout}>
      <Route path="/" />
      <Route path="/home" component={Home} />
    </Router>
  )
}

export default App
