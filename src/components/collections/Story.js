function Story({ getInfo }) {
  return (
    <>
      {getInfo.data.background ? (
        <div className="story">
          <h4>About this artwork:</h4>
          <p>{getInfo.data.background}</p>
        </div>
      ) : null}
    </>
  )
}

export default Story
