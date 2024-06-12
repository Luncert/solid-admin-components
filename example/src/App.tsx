import AppLayout from './AppLayout'
import { Route, Router } from "@solidjs/router"
import Home from './views/Home'
import './App.css'
import BasicList from './views/list-views/BasicList'

function App() {

  return (
    <Router root={AppLayout}>
      <Route path="/" />
      <Route path="/home" component={Home} />
      <Route path="/list-views/basic" component={BasicList} />
    </Router>
  )
}

export default App
