import Card from '../ui/Card'
import classes from './Search.module.css'
import {useRef,useState} from 'react'



const Search =(props)=>{
const inputRef=useRef()


const onChangeHandler = ()=>{
  const enteredSearchValue = inputRef.current.value
  props.search(enteredSearchValue)
}

    return(
      <Card>
      <div className={classes.search}>
          <label htmlFor='search'>Filtered by Title</label>
          <input id='search' type='text' onChange={onChangeHandler} ref={inputRef}/>
      </div>
      </Card>
    )
}

export default Search