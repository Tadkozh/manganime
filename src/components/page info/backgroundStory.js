function BackgroundStory({ getInfo }) {
  return (
    <>
      {getInfo.data.background ? (
        <div className="backgroundStory">
          <h4>About this artwork:</h4>
          <p>{getInfo.data.background}</p>
        </div>
      ) : null}
    </>
  )
}

export default BackgroundStory
