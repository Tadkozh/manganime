import React from 'react'

const SearchTop = ({ handleSubmit }) => {
  return (
    <button onClick={handleSubmit} value="Search">
      Search
    </button>
  )
}

export default SearchTop
