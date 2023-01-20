import { Backdrop, CircularProgress } from '.'

const LoadingScreen = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  )
}

export default LoadingScreen
