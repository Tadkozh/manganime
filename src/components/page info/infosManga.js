import { useParams, Link, Outlet } from 'react-router-dom'

function InfosManga({ title }) {
  let { id } = useParams()
  console.log(title)

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link to={`/infosManga/main/${id}/${title}`}>Infos</Link>
        </li>
        <li>
          <Link to={`/infosManga/news/${id}/`}>News</Link>
        </li>
        <li>
          <Link to={`/infosManga/recommendations/${id}`}>Recommendations</Link>
        </li>
      </ul>

      <Outlet />
    </>
  )
}

export default InfosManga
