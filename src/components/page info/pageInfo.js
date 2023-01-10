import { useEffect, useState } from 'react'

// import axios from 'axios'
import { Button, Rating, TextField } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
// import StarRoundedIcon from '@mui/icons-material/StarRounded'

// import miscellaneousInfos from './miscellaneousInfos'

import './pageInfo.css'
import './pageInfo600px.css'

function FavIcon({ getInfo, isFav, addToFav }) {
  return (
    <div className="favIcon">
      <FavoriteRoundedIcon
        fontSize="large"
        onClick={addToFav}
        className={isFav ? 'star fav' : 'star notFav'}
      />
      <p>{isFav ? getInfo.data.favorites + 1 : getInfo.data.favorites}</p>
    </div>
  )
}

function PageInfo() {
  const linkInfo = `https://api.jikan.moe/v4/anime/1/full`
  //   const linkNews = `https://api.jikan.moe/v4/anime/1/news`

  const [getInfo, setGetInfo] = useState(null)
  //   const [getNews, setGetNews] = useState(null)

  //   useEffect(() => {
  //     fetch(linkNews)
  //       .then((res) => res.json())
  //       .then((data) => setGetNews(data))
  //   }, [linkNews])

  //   useEffect(() => {
  //     axios.get(link).then((data) => setGetInfo(data))
  //   }, [link])

  useEffect(() => {
    fetch(linkInfo)
      .then((res) => res.json())
      .then((data) => setGetInfo(data))
  }, [linkInfo])

  const miscellaneousInfos = [
    {
      label: 'Rank',
      data: getInfo?.data?.rank,
    },
    {
      label: 'Popularity',
      data: getInfo?.data?.popularity,
    },
    {
      label: 'Type',
      data: getInfo?.data?.type,
    },
    {
      label: 'Rating',
      data: getInfo?.data?.rating,
    },
    {
      label: 'Source',
      data: getInfo?.data?.source,
    },
    {
      label: 'Épisodes',
      data: getInfo?.data?.episodes,
    },
    {
      label: 'Durée',
      data: getInfo?.data?.duration,
    },
    {
      label: 'Aired from',
      data: `${getInfo?.data?.aired.prop.from.year}, ${getInfo?.data?.aired.prop.from.month}, ${getInfo?.data?.aired.prop.from.day}`,
    },
    {
      label: 'Aired to',
      data: `${getInfo?.data?.aired.prop.to.year}, ${getInfo?.data?.aired.prop.to.month}, ${getInfo?.data?.aired.prop.to.day}`,
    },
    {
      label: 'Status',
      data: getInfo?.data?.status,
    },
    {
      label: 'Season',
      data: getInfo?.data?.season,
    },
    {
      label: 'Fanbase',
      data: getInfo?.data?.members,
    },
  ]

  const [readSynopsis, setReadSynopsis] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const [rankBtnValue, setRankBtnValue] = useState(false)

  function readSynopsisBtn() {
    setReadSynopsis(!readSynopsis)
  }

  function addToFav() {
    setIsFav(!isFav)
  }

  function handleRate() {
    setRankBtnValue(!rankBtnValue)
  }

  return (
    <>
      <div className="infoWrapper">
        {getInfo?.data ? (
          <>
            <div className="info">
              <div className="infoHeaderAndSynopsis">
                <div className="infoHeader">
                  <div className="titles">
                    <h2>{getInfo.data.title_english}</h2>
                    <p className="japaneseTitle">
                      {getInfo.data.title_japanese}
                    </p>
                    <FavIcon
                      getInfo={getInfo}
                      isFav={isFav}
                      addToFav={addToFav}
                    />
                  </div>

                  <img
                    src={getInfo.data.images.jpg.image_url}
                    alt="infos"
                    className="mainImg"
                  />
                  <a href="#trailer">VOIR LE TRAILER</a>
                  <div className="rating">
                    <div>
                      <p>Note globale:</p>
                      <Rating
                        name="rating"
                        defaultValue={getInfo.data.score / 2}
                        precision={0.1}
                        readOnly
                      />
                      <p>
                        <small>
                          (sur{' '}
                          {rankBtnValue
                            ? getInfo.data.scored_by + 1
                            : getInfo.data.scored_by}{' '}
                          avis)
                        </small>
                      </p>
                    </div>
                    <div>
                      <p>Ta note:</p>
                      <Rating
                        name="rating"
                        defaultValue={1}
                        precision={0.5}
                        readOnly={rankBtnValue ? true : false}
                      />
                      <div>
                        <Button
                          variant="contained"
                          size="small"
                          color={rankBtnValue ? 'error' : 'success'}
                          onClick={handleRate}
                        >
                          {rankBtnValue ? 'Annuler la note' : 'Valider la note'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="synopsis" className="synopsisWrapper">
                  <h4>Synopsis:</h4>
                  <div
                    className={
                      readSynopsis ? 'synopsis active' : 'synopsis inactive'
                    }
                  >
                    <p>{getInfo.data.synopsis}</p>
                  </div>
                  <Button onClick={readSynopsisBtn}>
                    {readSynopsis ? 'Read less' : 'Read more'}
                  </Button>
                </div>
              </div>

              {/* <embed
                id="trailer"
                type="video/webm"
                src={getInfo.data.trailer.embed_url}
              ></embed> */}

              <div className="miscellaneousInfos">
                {/* <p>Caractéristiques:</p> */}
                {miscellaneousInfos.map((data, index) => {
                  return (
                    <div key={index}>
                      <div className="label">
                        <p>{data.label}:</p>
                      </div>
                      <div className="data">
                        <p>{data.data}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="anecdote">
                <h4>About this artwork:</h4>
                <p>{getInfo.data.background}</p>
              </div>

              <div className="news">Espace news</div>

              <form>
                <p>Leave a comment</p>
                <Rating name="rating" defaultValue={1} precision={0.5} />
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

              <div className="comments">Espace commentaires</div>
            </div>
          </>
        ) : null}
      </div>

      {/* {getNews?.data ? (
        <div className="hey">
          {getNews.data.map((data, index) => {
            return (
              <div key={index} className="news">
                <p>{data.title}</p>
                <p>excerpt: {data.excerpt}</p>
                <a href={data.forum_url}>forum_url</a>
              </div>
            )
          })}
        </div>
      ) : null} */}
    </>
  )
}

export default PageInfo
