import AppConsumer from './AppConsumer'
import { AppProviders } from './context'

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

export default App
