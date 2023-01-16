import { HomeRounded, Search, Whatshot } from '@mui/icons-material'

export const EMAIL_REQUIRED = "L'email est obligatoire"
export const EMAIL_NOT_VALID = "L'email n'est pas valide"
export const PASSWORD_REQUIRED = 'Le mote de passe est obligatoire'
export const PASSWORD_REQUIREMENT =
  'Le mot de passe doit faire au moins 6 caractères'
export const USER_NOT_FOUND = "L'utilisateur n'existe pas"
export const WRONG_PASSWORD = 'Mot de passe incorrect'
export const TOO_MANY_REQUEST = 'Trop de tentative de connexion, compte bloqué'
export const EMAIL_EXIST = "L'email est déjà utilisé"
export const USER_EXSIT = "L'utilisateur existe déjà"
export const ERROR_UNKNOWN = 'Erreur inatendu'
export const LOG_OUT = 'Déconnexion'
export const LOG_IN = 'Se connecter'
export const PROFILE = 'Profile'
export const HOME = 'Home'
export const TOP_ANIME = 'Top Animes'
export const SEARCH_ANIME = 'Search Animes'
export const TOP_MANGA = 'Top Mangas'
export const SEARCH_MANGA = 'Search Mangas'
export const HOME_CHILDREN = (
  <>
    <HomeRounded /> Home
  </>
)
export const TOP_ANIME_CHILDREN = (
  <>
    <Whatshot sx={{ color: 'yellow' }} /> Top Animes
  </>
)
export const SEARCH_ANIME_CHILDREN = (
  <>
    <Search /> Search Animes
  </>
)
export const TOP_MANGA_CHILDREN = (
  <>
    <Whatshot sx={{ color: 'yellow' }} /> Top Mangas
  </>
)
export const SEARCH_MANGA_CHILDREN = (
  <>
    <Search /> Search Mangas
  </>
)
