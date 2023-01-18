function Story({ background }) {
  return (
    <>
      {background ? (
        <div className="story">
          <h4>About this artwork:</h4>
          <p>{background}</p>
        </div>
      ) : null}
    </>
  )
}

export default Story
