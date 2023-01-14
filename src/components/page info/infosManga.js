import { useParams, Link, Outlet } from 'react-router-dom'

function InfosManga() {
  let { id } = useParams()

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link to={`/infosManga/main/${id}/:title`}>Infos</Link>
        </li>
        <li>
          <Link to={`/infosManga/news/${id}/:title`}>News</Link>
        </li>
        <li>
          <Link to={`/infosManga/recommendations/${id}/:title`}>
            Recommendations
          </Link>
        </li>
      </ul>

      <Outlet />
    </>
  )
}

export default InfosManga
