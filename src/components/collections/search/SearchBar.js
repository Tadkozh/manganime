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

import { SEARCH, RESET_FILTERS } from '../../../utils/constants'

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

function SelectSearch({
  title,
  name,
  getter,
  setter,
  defaultValue,
  selectValues,
}) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel sx={{ color: 'rgba(0, 0, 0, 0.65)' }} id={name}>
          {title}
        </InputLabel>
        <Select
          labelId={name}
          id={name}
          value={getter}
          label="Age"
          onChange={(e) => setter(e.target.value)}
        >
          <MenuItem value="">
            <em>{defaultValue}</em>
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

function InputSearch({ title, name, placeholder, getter, setter }) {
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

function SearchBar({
  collectionType,
  getAnime,
  getManga,
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
  orderBy,
  setOrderBy,
  sort,
  setSort,
  hentai,
  setHentai,
  setPage,
}) {
  function resetFilters() {
    setInputValue('')
    setLetter('')
    setScoreMin('')
    setType('')
    setStatus('')
    setRating('')
    setOrderBy('')
    setSort('')
    setHentai(true)
    setPage(1)
  }

  return (
    <div className="settingsBar">
      <p>
        {collectionType === 'anime'
          ? getAnime.pagination.items.total
          : getManga.pagination.items.total}{' '}
        results
      </p>
      <SelectSearch
        title={'Type'}
        name={'typeInput'}
        getter={type}
        setter={setType}
        defaultValue="All"
        selectValues={
          collectionType === 'anime'
            ? selectValues.anime.type
            : selectValues.manga.type
        }
      />
      <SelectSearch
        title="score min"
        name="scoreMinInput"
        getter={scoreMin}
        setter={setScoreMin}
        defaultValue="0"
        selectValues={
          collectionType === 'anime'
            ? selectValues.anime.scoreMin
            : selectValues.manga.scoreMin
        }
      />
      <SelectSearch
        title="Status"
        name="statusInput"
        getter={status}
        setter={setStatus}
        defaultValue="All"
        selectValues={
          collectionType === 'anime'
            ? selectValues.anime.status
            : selectValues.manga.status
        }
      />
      {collectionType === 'anime' ? (
        <SelectSearch
          title="Rating"
          name="ratingInput"
          getter={rating}
          setter={setRating}
          defaultValue="All"
          selectValues={selectValues.anime.rating}
        />
      ) : null}
      <SelectSearch
        title="Order by"
        name="orderByInput"
        getter={orderBy}
        setter={setOrderBy}
        defaultValue="ID"
        selectValues={
          collectionType === 'anime'
            ? selectValues.anime.order_by
            : selectValues.manga.order_by
        }
      />
      <SelectSearch
        title="Sort"
        name="sortInput"
        getter={sort}
        setter={setSort}
        defaultValue="Ascending"
        selectValues={
          collectionType === 'anime'
            ? selectValues.anime.sort
            : selectValues.manga.sort
        }
      />

      <FormControlLabel
        control={<HideHentai checked={hentai} />}
        label="Hide Hentai"
        onChange={() => setHentai(!hentai)}
      />

      <div className="inputSearch">
        <InputSearch
          title="Search"
          name="searchInput"
          placeholder="Write here..."
          getter={inputValue}
          setter={setInputValue}
        />
        <Button
          variant="contained"
          sx={{ gap: '5px', fontWeight: 'bold' }}
          size="small"
          onClick={() => setLetter(inputValue)}
        >
          {SEARCH}
        </Button>

        <Button
          variant="contained"
          sx={{ gap: '5px', backgroundColor: 'red', fontWeight: 'bold' }}
          size="small"
          onClick={resetFilters}
        >
          {RESET_FILTERS}
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
