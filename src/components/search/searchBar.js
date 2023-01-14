import {
  styled,
  Select,
  Switch,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from '@mui/material'

// Arrays
import selectValues from './selectValues'

const HideHentai = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}))

function SearchBar({
  getAnime,
  inputValue,
  setInputValue,
  setLetter,
  scoreMin,
  setScoreMin,
  type,
  setType,
  status,
  setStatus,
  rating,
  setRating,
  hentai,
  setHentai,
  setPage,
}) {
  function select(title, name, getter, setter, selectValues) {
    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id={name}>{title}</InputLabel>
          <Select
            labelId={name}
            id={name}
            value={getter}
            label="Age"
            onChange={(e) => setter(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {selectValues.map((data, index) => {
              return (
                <MenuItem key={index} value={data.value}>
                  {data.children}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </>
    )
  }

  function inputSearch(title, name, placeholder, getter, setter) {
    return (
      <TextField
        variant="filled"
        size="small"
        label={title}
        placeholder={placeholder}
        value={getter}
        id={name}
        onChange={(e) => setter(e.target.value)}
      />
    )
  }

  function resetFilters() {
    setInputValue('')
    setLetter('')
    setScoreMin('')
    setType('')
    setStatus('')
    setRating('')
    setHentai(true)
    setPage(1)
  }

  return (
    <div className="settingsBar">
      <p>{getAnime.pagination.items.total} results</p>
      {select('Type', 'typeInput', type, setType, selectValues.type)}
      {select(
        'score (min)',
        'scoreMinInput',
        scoreMin,
        setScoreMin,
        selectValues.scoreMin,
      )}
      {select('Status', 'statusInput', status, setStatus, selectValues.status)}
      {select('Rating', 'ratingInput', rating, setRating, selectValues.rating)}
      <FormControlLabel
        control={<HideHentai checked={hentai} />}
        label="Hide Hentai"
        onChange={() => setHentai(!hentai)}
      />
      <div className="inputSearch">
        {inputSearch(
          'Search',
          'searchInput',
          'Write here...',
          inputValue,
          setInputValue,
        )}
        <Button
          variant="contained"
          size="small"
          onClick={() => setLetter(inputValue)}
        >
          Search
        </Button>

        <Button variant="contained" size="small" onClick={resetFilters}>
          Reset filters
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
