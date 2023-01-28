import { useState } from 'react'
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
import { selectValues } from './selectValues'

function SearchBar({ type, data, query, setQuery }) {
  const [searchInput, setSearchInput] = useState('')

  function resetFilters() {
    setSearchInput('')
    setQuery({
      search: null,
      format: 'TV',
      status: 'FINISHED',
      score: 0,
      popularity: 0,
      sortBy: 'TRENDING_DESC',
      isAdult: false,
      page: 1,
      perPage: 30,
    })
  }

  return (
    <div className="settingsBar">
      <p>
        {data?.pageInfo ? `${data?.pageInfo?.total} results` : 'Loading...'}
      </p>

      <SelectSearch
        title={'Format'}
        name={'formatInput'}
        getter={query.format}
        handleChange={(e) =>
          setQuery({ ...query, format: e.target.value, page: 1 })
        }
        defaultValue={
          type === 'anime'
            ? selectValues?.anime?.format[0]?.value
            : selectValues?.manga?.format[0]?.value
        }
        defaultChildren={
          type === 'anime'
            ? selectValues?.anime?.format[0]?.children
            : selectValues?.manga?.format[0]?.children
        }
        selectValues={
          type === 'anime'
            ? selectValues.anime.format
            : selectValues.manga.format
        }
      />

      <SelectSearch
        title="score min"
        name="scoreMinInput"
        getter={query.score}
        handleChange={(e) =>
          setQuery({ ...query, score: e.target.value, page: 1 })
        }
        defaultValue={selectValues.scoreMin[0].value}
        defaultChildren={selectValues.scoreMin[0].children}
        selectValues={selectValues.scoreMin}
      />

      <SelectSearch
        title="Status"
        name="statusInput"
        getter={query.status}
        handleChange={(e) =>
          setQuery({ ...query, status: e.target.value, page: 1 })
        }
        defaultValue={
          type === 'anime'
            ? selectValues.anime.status[0].value
            : selectValues.manga.status[0].value
        }
        defaultChildren={
          type === 'anime'
            ? selectValues.anime.status[0].children
            : selectValues.manga.status[0].children
        }
        selectValues={
          type === 'anime'
            ? selectValues.anime.status
            : selectValues.manga.status
        }
      />

      <SelectSearch
        title="Sort by"
        name="sortByInput"
        getter={query.sortBy}
        handleChange={(e) =>
          setQuery({ ...query, sortBy: e.target.value, page: 1 })
        }
        defaultValue={selectValues.sortBy[0].value}
        defaultChildren={selectValues.sortBy[0].children}
        selectValues={selectValues.sortBy}
      />

      <FormControlLabel
        control={<HideHentai checked={!query.isAdult} />}
        label="Hide Hentai"
        onChange={() =>
          setQuery({
            ...query,
            isAdult: !query.isAdult,
            page: 1,
          })
        }
      />

      <div className="inputSearch">
        <InputSearch
          title={SEARCH}
          name="searchInput"
          placeholder="Write here..."
          getter={searchInput}
          handleChange={(e) => setSearchInput(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ gap: '5px', fontWeight: 'bold' }}
          size="small"
          onClick={() =>
            setQuery({
              ...query,
              search: searchInput === '' ? null : searchInput,
              page: 1,
            })
          }
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

function SelectSearch({
  title,
  name,
  getter,
  handleChange,
  defaultValue,
  defaultChildren,
  selectValues,
}) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel sx={{ color: 'rgba(0, 0, 0, 0.65)' }} id={name}>
          {title}
        </InputLabel>
        <Select labelId={name} id={name} value={getter} onChange={handleChange}>
          {defaultChildren !== '' ? (
            <MenuItem value={defaultValue}>
              <em>{defaultChildren}</em>
            </MenuItem>
          ) : null}
          {selectValues.map((data, index) => {
            if (index > 0) {
              return (
                <MenuItem key={index} value={data.value}>
                  {data.children}
                </MenuItem>
              )
            } else return null
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

export default SearchBar
