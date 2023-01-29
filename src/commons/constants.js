export const APP_API_URL = 'https://api.jikan.moe/v4'
export const BAD_USE_CONTEXT = 'ne peut pas être utilisé sans'
export const ENV_DEV = 'development'
export const AUTH_USER_NOT_FOUND = 'auth/user-not-found'
export const AUTH_WRONG_PASSWORD = 'auth/wrong-password'
export const AUTH_TOO_MANY_REQUEST = 'auth/too-many-requests'
export const AUTH_USER_ALREADY_EXIST = 'auth/credential-already-in-use'
export const AUTH_EMAIL_EXISTS = 'auth/email-already-in-use'
export const AUTH_REQUIRE_RECENT_LOGIN = 'auth/requires-recent-login'
export const IDLE = 'idle'
export const LOADING = 'loading'
export const SUCCESS = 'success'
export const FETCHING = 'fetching'
export const DONE = 'done'
export const FAIL = 'fail'
export const SIGN_IN = 'signIn'
export const SIGN_UP = 'signUp'
export const SIGN_UPDATE = 'signUpdate'
export const USER_COLLECTION = 'users'
export const LIGHT = 'light'
export const DARK = 'dark'
export const THEME_COLOR_LOCAL_STORAGE = 'themeColor'
export const ANIME = 'ANIME'
export const MANGA = 'MANGA'
export const TYPE = 'type'
export const TOP = 'top'
export const INFOS = 'infos'
export const STREAMING = 'streaming'
export const NEWS = 'news'
export const RECOMMENDATIONS = 'recommendations'
export const ID = 'id'
export const ROUTE_HOME = '/'
export const ROUTE_LOGIN_REGISTER = '/login'
export const ROUTE_PROFILE = '/profile'
export const ROUTE_TOP_ANIME = `/${ANIME}/${TOP}`
export const ROUTE_TOP_MANGA = `/${MANGA}/${TOP}`
export const ROUTE_SEARCH_ANIME = `/${ANIME}/search`
export const ROUTE_SEARCH_MANGA = `/${MANGA}/search`
export const ROUTE_INFOS = `/:${TYPE}/${INFOS}/:${ID}`
export const ROUTE_STREAMING = `/:${TYPE}/${STREAMING}/:${ID}`
export const ROUTE_RECOMMENDATIONS = `/:${TYPE}/${RECOMMENDATIONS}/:${ID}`
export const ROUTE_404 = '*'
export const JIKAN_API = process.env.REACT_APP_JIKAN_API
export const ANIME_LIST_API = process.env.REACT_APP_ANILIST_API

const SEARCH_STATUS = {
  FINISHED: 'FINISHED',
  RELEASING: 'RELEASING',
  NOT_YET_RELEASED: 'NOT_YET_RELEASED',
  CANCELLED: 'CANCELLED',
  HIATUS: 'HIATUS',
}
export const FINISHED = SEARCH_STATUS.FINISHED
export const RELEASING = SEARCH_STATUS.RELEASING
export const NOT_YET_RELEASED = SEARCH_STATUS.NOT_YET_RELEASED
export const CANCELLED = SEARCH_STATUS.CANCELLED
export const HIATUS = SEARCH_STATUS.HIATUS

const SEARCH_FORMAT = {
  TV: 'TV',
  TV_SHORT: 'TV_SHORT',
  MOVIE: 'MOVIE',
  SPECIAL: 'SPECIAL',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'MUSIC',
}

export const TV = SEARCH_FORMAT.TV
export const TV_SHORT = SEARCH_FORMAT.TV_SHORT
export const MOVIE = SEARCH_FORMAT.MOVIE
export const SPECIAL = SEARCH_FORMAT.SPECIAL
export const OVA = SEARCH_FORMAT.OVA
export const ONA = SEARCH_FORMAT.ONA
export const MUSIC = SEARCH_FORMAT.MUSIC

const SEARCH_SORT = {
  TRENDING_DESC: 'TRENDING_DESC',
  SCORE_DESC: 'SCORE_DESC',
  START_DATE_DESC: 'START_DATE_DESC',
  END_DATE_DESC: 'END_DATE_DESC',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  TITLE_ENGLISH_DESC: 'TITLE_ENGLISH_DESC',
}

export const TRENDING_DESC = SEARCH_SORT.TRENDING_DESC
export const SCORE_DESC = SEARCH_SORT.SCORE_DESC
export const START_DATE_DESC = SEARCH_SORT.START_DATE_DESC
export const END_DATE = SEARCH_SORT.END_DATE
export const END_DATE_DESC = SEARCH_SORT.END_DATE_DESC
export const START_DATE = SEARCH_SORT.START_DATE
export const TITLE_ENGLISH_DESC = SEARCH_SORT.TITLE_ENGLISH_DESC

const SEARCH_FIELDS = {
  SEARCH: 'search',
  FORMAT: 'format',
  STATUS: 'status',
  SCORE: 'score',
  POPULARITY: 'popularity',
  SORT: 'sortBy',
  ISADULT: 'isAdult',
  PAGE: 'page',
  PER_PAGE: 'perPage',
  RESET: 'reset',
}

export const SEARCH = SEARCH_FIELDS.SEARCH
export const FORMAT = SEARCH_FIELDS.FORMAT
export const STATUS = SEARCH_FIELDS.STATUS
export const SCORE = SEARCH_FIELDS.SCORE
export const POPULARITY = SEARCH_FIELDS.POPULARITY
export const SORT = SEARCH_FIELDS.SORT
export const ISADULT = SEARCH_FIELDS.ISADULT
export const PAGE = SEARCH_FIELDS.PAGE
export const PER_PAGE = SEARCH_FIELDS.PER_PAGE
export const RESET = SEARCH_FIELDS.RESET
