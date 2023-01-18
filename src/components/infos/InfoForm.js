import { Button, Rating, TextField } from '../ui'

function InfoForm() {
  return (
    <>
      <form>
        <p>Leave a comment</p>
        <Rating name="rating" defaultValue={1} precision={0.5} required />
        <TextField
          id="outlined-basic"
          label="Title"
          variant="filled"
          size="small"
          required
        />
        <TextField
          id="outlined-basic"
          label="Your comment"
          variant="filled"
          multiline
          required
        />
        <Button variant="contained" style={{ margin: '0 auto' }}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default InfoForm
