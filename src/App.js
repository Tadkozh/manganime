import './App.css'
import { AppProviders } from './context'

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

const AppConsumer = () => {
  return <div className="App">
    hello world
  </div>
}
export default App
