import './App.css'
import { AppProvider } from './context'

function App() {
  return (
    <AppProvider>
      <AppConsumer />
    </AppProvider>
  )
}

const AppConsumer = () => {
  return <div className="App">
    hello world
  </div>
}
export default App
