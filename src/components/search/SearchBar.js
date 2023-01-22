import { RESET_FILTERS, SEARCH } from '../../utils/constants'
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Refresh,
  Search,
  Select,
  styled,
  Switch,
  TextField,
} from '../ui'

// Arrays
import { searchValues as selectValues } from './searchValues'

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
  handleChange,
  defaultValue,
  selectValues,
}) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel sx={{ color: 'rgba(0, 0, 0, 0.65)' }} id={name}>
          {title}
        </InputLabel>
        <Select labelId={name} id={name} value={getter} onChange={handleChange}>
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

function InputSearch({ title, name, placeholder, getter, handleChange }) {
  return (
    <TextField
      variant="filled"
      size="small"
      label={title}
      placeholder={placeholder}
      value={getter}
      id={name}
      onChange={handleChange}
    />
  )
}

function SearchBar({ type, data, query, setQuery }) {
  function resetFilters() {
    setQuery({
      ...query,
      inputValue: '',
      letter: '',
      scoreMin: '',
      type: '',
      status: '',
      rating: '',
      orderBy: '',
      sort: '',
      hideHentai: true,
      page: 1,
    })
  }

  return (
    <div className="settingsBar">
      <p>
        {data?.pagination?.items?.total
          ? `${data?.pagination?.items?.total} results`
          : 'Loading...'}
      </p>
      <SelectSearch
        title={'Type'}
        name={'typeInput'}
        getter={query.type}
        handleChange={(e) => setQuery({ ...query, type: e.target.value })}
        defaultValue="All"
        selectValues={
          type === 'anime' ? selectValues.anime.type : selectValues.manga.type
        }
      />
      <SelectSearch
        title="score min"
        name="scoreMinInput"
        getter={query.scoreMin}
        handleChange={(e) => setQuery({ ...query, scoreMin: e.target.value })}
        defaultValue="0"
        selectValues={selectValues.scoreMin}
      />
      <SelectSearch
        title="Status"
        name="statusInput"
        getter={query.status}
        handleChange={(e) => setQuery({ ...query, status: e.target.value })}
        defaultValue="All"
        selectValues={
          type === 'anime'
            ? selectValues.anime.status
            : selectValues.manga.status
        }
      />
      {type === 'anime' ? (
        <SelectSearch
          title="Rating"
          name="ratingInput"
          getter={query.rating}
          handleChange={(e) => setQuery({ ...query, rating: e.target.value })}
          defaultValue="All"
          selectValues={selectValues.anime.rating}
        />
      ) : null}
      <SelectSearch
        title="Order by"
        name="orderByInput"
        getter={query.orderBy}
        handleChange={(e) => setQuery({ ...query, orderBy: e.target.value })}
        defaultValue="ID"
        selectValues={
          type === 'anime'
            ? selectValues.anime.order_by
            : selectValues.manga.order_by
        }
      />
      <SelectSearch
        title="Sort"
        name="sortInput"
        getter={query.sort}
        handleChange={(e) => setQuery({ ...query, sort: e.target.value })}
        defaultValue="Descending"
        selectValues={selectValues.sort}
      />

      <FormControlLabel
        control={<HideHentai checked={query.hideHentai} />}
        label="Hide Hentai"
        onChange={() =>
          setQuery({
            ...query,
            hideHentai: !query.hideHentai,
          })
        }
      />

      <div className="inputSearch">
        <InputSearch
          title={SEARCH}
          name="searchInput"
          placeholder="Write here..."
          getter={query.inputValue}
          handleChange={(e) =>
            setQuery({ ...query, inputValue: e.target.value })
          }
        />

        <Button
          variant="contained"
          sx={{ gap: '5px', fontWeight: 'bold' }}
          size="small"
          onClick={() => setQuery({ ...query, letter: query.inputValue })}
        >
          <Search /> {SEARCH}
        </Button>

        <Button
          variant="contained"
          sx={{ gap: '5px', backgroundColor: 'red', fontWeight: 'bold' }}
          size="small"
          onClick={resetFilters}
        >
          <Refresh /> {RESET_FILTERS}
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
