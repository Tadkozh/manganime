function Synopsis({ getInfo }) {
  // const [readSynopsis, setReadSynopsis] = useState(false)

  return (
    <>
      <div id="synopsis" className="synopsisWrapper">
        <h4>Synopsis:</h4>
        <div
          className="synopsis"
          // className={
          //   readSynopsis ? 'synopsis active' : 'synopsis inactive'
          // }
        >
          <p>{getInfo.data.synopsis}</p>
        </div>
        {/* <Button onClick={() => setReadSynopsis(!readSynopsis)}>
        {readSynopsis ? 'Read less' : 'Read more'}
      </Button> */}
      </div>
    </>
  )
}

export default Synopsis
