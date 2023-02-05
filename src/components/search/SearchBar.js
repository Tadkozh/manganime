import { useState } from 'react'
import { ISADULT, SEARCH } from '../../commons/constants'
import { RESET_FILTERS } from '../../utils/constants'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem, Refresh,
  Search,
  Select,
  styled,
  Switch,
  TextField
} from '../ui'

import { fields, getSelectValues, selectValues } from './selectValues'

const getNameInput = (title) => {
  return title.toLowerCase().replace(/ /g, '') + 'Input'
}

function SearchBar({ type, query, setQuery, resetQuery }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        p: 2,
      }}
    >
      {fields.map((field, index) => (
        <SelectSearch
          key={index}
          title={field.title}
          getter={query[field.property]}
          handleChange={(e) => setQuery(field.property, e.target.value)}
          selectValues={
            field?.onlyvalue
              ? selectValues[field.property]
              : getSelectValues(type, field.property)
          }
        />
      ))}

      <FormControlLabel
        control={<HideHentai checked={query.isAdult} />}
        label="NSFW"
        onChange={() => setQuery(ISADULT)}
      />
      <RightSearch setQuery={setQuery} resetQuery={resetQuery} />
    </Box>
  )
}

const RightSearch = ({ setQuery, resetQuery }) => {
  const [searchInput, setSearchInput] = useState('')

  function resetFilters() {
    setSearchInput('')
    resetQuery()
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <InputSearch
        title={SEARCH}
        getter={searchInput}
        handleChange={(e) => setSearchInput(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() =>
          setQuery(SEARCH, searchInput === '' ? null : searchInput)
        }
        sx={{ gap: '5px' }}
      >
        <Search /> {SEARCH}
      </Button>
      <Button variant="outlined" onClick={resetFilters} sx={{ gap: '5px' }}>
        <Refresh /> {RESET_FILTERS}
      </Button>
    </Box>
  )
}

function SelectSearch({ title, getter, handleChange, selectValues }) {
  const name = getNameInput(title)
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="filled">
      <InputLabel id={name}>{title}</InputLabel>
      <Select
        labelId={name}
        id={name}
        value={getter}
        onChange={handleChange}
        label={title}
        sx={{ borderRadius: '5px' }}
        disableUnderline
      >
        {selectValues.map((item, index) =>
          index === 0 ? (
            <MenuItem key={index} value={item.value}>
              <em>{item.children}</em>
            </MenuItem>
          ) : (
            <MenuItem key={index} value={item.value}>
              {item.children}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  )
}

function InputSearch({ title, getter, handleChange }) {
  return (
    <CustomTextField
      variant="filled"
      size="small"
      label={title}
      placeholder="Write here..."
      value={getter}
      id={getNameInput(title)}
      onChange={handleChange}
    />
  )
}
const CustomTextField = styled(TextField)(() => ({
  '& .MuiFilledInput-root': {
    '&:before, &:after': {
      borderBottom: 'none',
    },
    borderRadius: '5px',
  },
}))

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
