import React from "react"

import "../styles/main.scss"
import styles from "./search.module.scss"

const Search = ({ inputChangeFunction }) => {

  return (
    <div className={styles.searchSection}>
      <input className={styles.searchContainer} type="text" placeholder="Search.." name="search" onChange={inputChangeFunction}></input>
    </div>
  )
}

export default Search
