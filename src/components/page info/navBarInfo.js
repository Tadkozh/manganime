import { useParams, Link } from 'react-router-dom'

function NavBarInfo({ collectionType }) {
  let { id, title } = useParams()

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link to={`/collection/${collectionType}/search/main/${id}/${title}`}>
            Infos
          </Link>
        </li>
        <li>
          <Link to={`/collection/${collectionType}/search/news/${id}/${title}`}>
            News
          </Link>
        </li>
        <li>
          <Link
            to={`/collection/${collectionType}/search/recommendations/${id}/${title}`}
          >
            Recommendations
          </Link>
        </li>
      </ul>
    </>
  )
}

export default NavBarInfo
