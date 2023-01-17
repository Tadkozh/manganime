import { Rating } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { APP_API_URL } from '../../commons/constants'

function Reviews() {
  let { collectionType, id } = useParams()

  const link = `${APP_API_URL}/${collectionType}/${id}/reviews`

  const [getReviews, setGetReviews] = useState(null)

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => setGetReviews(data))
  }, [link])

  return (
    <>
      {getReviews?.data ? (
        <div className="reviews">
          {getReviews.data.map((data, index) => {
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
