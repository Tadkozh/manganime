import { Rating } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useReviews } from '../../hooks/queriesHooks'


function Reviews() {
  let { type, id } = useParams()
  const reviews = useReviews(type, id)

  return (
    <>
      {reviews ? (
        <div className="reviews">
          {reviews.map((data, index) => {
            return (
              <div className="review" key={index}>
                <div className="header">
                  <img
                    src={data.user.images.jpg.image_url}
                    alt={`username ${index}`}
                    className="userImage"
                  />
                  <div>
                    <p className="username">{data.user.username}</p>
                    <p className="feelings">{data.tags}</p>
                    <Rating
                      name="rating"
                      defaultValue={data.score / 2}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <p className="text">{data.review}</p>
              </div>
            )
          })}
        </div>
      ) : null}
    </>
  )
}

export default Reviews
