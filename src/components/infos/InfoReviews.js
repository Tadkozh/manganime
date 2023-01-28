import { Rating } from '../ui'
import { useParams } from 'react-router-dom'
import { useTitle, useReviews } from '../../hooks/queriesHooks'

function InfoReviews() {
  let { type, id } = useParams()
  const dataInfo = useTitle(type, id)
  const title =
    dataInfo?.Page?.media[0]?.title?.english ??
    dataInfo?.Page?.media[0]?.title?.romaji

  const reviews = useReviews(type, id)
  const info = reviews?.Page?.media[0]?.reviews?.nodes

  return (
    <>
      {info ? (
        <div id="reviews" className="reviews">
          <h3>
            {info.length} reviews about {title}
          </h3>
          {info.map((data, index) => {
            const timestampCreated = info[index].createdAt
            const dateCreated = new Date(timestampCreated * 1000)
            const timestampUpdated = info[index].updatedAt
            const dateUpdated = new Date(timestampUpdated * 1000)

            return (
              <div className="review" key={index}>
                <div className="header">
                  <img
                    src={data.user.avatar.medium}
                    alt={`Avatar ${index}`}
                    className="userImage"
                  />
                  <div>
                    <p className="username">
                      {data.user.name} | Published the{' '}
                      {dateCreated.toLocaleString()} | Updated the{' '}
                      {dateUpdated.toLocaleString()}
                    </p>
                    <p className="feelings">{data.summary}</p>
                    <Rating
                      name="rating"
                      // defaultValue={data[0]?.score / 20}
                      value={data.score / 20}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: data.body,
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      ) : null}
    </>
  )
}

export default InfoReviews
