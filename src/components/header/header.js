import { Link } from 'react-router-dom'

// CSS Files
import './header.css'

function Header() {
  return (
    <div className="mainMenu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search-anime">Anime</Link>
        </li>
        <li>
          <Link to="/search-manga">Manga</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/recommendations">Recomendations</Link>
        </li>
        <li>
          <Link to="/*">Error404</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
