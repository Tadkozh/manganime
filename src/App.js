import './App.css'
import { AppProviders } from './context'
import AppConsumer from './AppConsumer'

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

export default App
