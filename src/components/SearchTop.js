import React from 'react'

const SearchTop = ({ name, handleSubmit }) => {
  return (
    <button
      type="button"
      name={`${name}-search-btn`.toLowerCase()}
      onClick={handleSubmit}
    >
      {`Search ${name}`}
    </button>
  )
}

export default SearchTop
