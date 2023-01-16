import { useParams, Link } from 'react-router-dom'

function NavBarInfo() {
  let { id, title } = useParams()

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link to={`/collection/anime/search/main/${id}/${title}`}>Infos</Link>
        </li>
        <li>
          <Link to={`/collection/anime/search/news/${id}/${title}`}>News</Link>
        </li>
        <li>
          <Link to={`/collection/anime/search/recommendations/${id}/${title}`}>
            Recommendations
          </Link>
        </li>
      </ul>
    </>
  )
}

export default NavBarInfo
