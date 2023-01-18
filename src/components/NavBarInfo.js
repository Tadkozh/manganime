import { useParams, Link } from 'react-router-dom'
import { INFOS, NEWS, RECOMMENDATIONS } from '../commons/constants'
import { getUrl } from '../utils/helper'

function NavBarInfo() {
  let { type, id } = useParams()

  return (
    <>
      <ul className="subMenu">
        <li>
          <Link to={getUrl(type, INFOS, [id])}>Infos</Link>
        </li>
        <li>
          <Link to={getUrl(type, NEWS, [id])}>News</Link>
        </li>
        <li>
          <Link to={getUrl(type, RECOMMENDATIONS, [id])}>Recommendations</Link>
        </li>
      </ul>
    </>
  )
}

export default NavBarInfo
