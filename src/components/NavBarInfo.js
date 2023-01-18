import { useParams, Link } from 'react-router-dom'
import { INFOS, NEWS, RECOMMENDATIONS } from '../../commons/constants'
import { getUrl } from '../../utils/helper'

function NavBarInfo() {
  let { type, id } = useParams()

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link
            // to={`/collection/${collectionType}/search/main/${id}/${title}`}
            // to={`/${type}/${INFOS}/${id}`}
            to={getUrl(type, INFOS, [id])}
          >
            Infos
          </Link>
        </li>
        <li>
          <Link
            // to={`/collection/${collectionType}/search/news/${id}/${title}`}
            // to={`/${type}/${NEWS}/${id}/${title}`}
            to={getUrl(type, NEWS, [id])}
          >
            News
          </Link>
        </li>
        <li>
          <Link
            // to={`/collection/${collectionType}/search/recommendations/${id}/${title}`}
            // to={`/${type}/${RECOMMENDATIONS}/${id}/${title}`}
            to={getUrl(type, RECOMMENDATIONS, [id])}
          >
            Recommendations
          </Link>
        </li>
      </ul>
    </>
  )
}

export default NavBarInfo
