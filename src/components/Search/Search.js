import Card from '../ui/Card'
import classes from './Search.module.css'
import {useRef,useState,useEffect} from 'react'
import React from 'react'

const Search =React.memo((props)=>{
const inputRef=useRef()
const [ingredientsFromFetch,setIngredientsFromFetch] = useState([])
const [loading,setLoading] = useState(false)


let timer
const clearTimer = (time)=>{
  clearTimeout(time)
}
const onChangeHandler = ()=>{
  clearTimer(timer)
  timer = setTimeout(()=>{
    setLoading(true)
    const enteredSearchValue = inputRef.current.value
    const query = `?orderBy="title"&equalTo="${enteredSearchValue}"`
    fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json"+query).then(response=>{
      return response.json()
    }).then(data=>{
      const responseData = []
      for(let key in data){
        const newObj ={
          ...data[key],
          id:key
        }
        responseData.push(newObj)
      }
      setLoading(false)
     setIngredientsFromFetch(responseData)
     
    })
  },1000)
  }

  const {search} = props

  useEffect(()=>{
    if(inputRef.current.value.length === 0){
      fetch("https://auth-with-hooks-default-rtdb.firebaseio.com/form.json")
      .then((response) => response.json())
      .then((data) => {
        const responseData = [];
        for (let key in data) {
          const newData = {
            ...data[key],
            id: key,
          };
          responseData.push(newData);
        }
        search(responseData)
      });
    }else{
      search(ingredientsFromFetch)
      
    }
   
  },[ingredientsFromFetch,search,inputRef])

  console.log('search')

    return(
      <Card>
      <div className={classes.search}>
          <label htmlFor='search'>Filtered by Title</label>
          {loading && <span>Loading...</span>}
          <input id='search' type='text' onChange={onChangeHandler} ref={inputRef}/>
      </div>
      </Card>
    )
})

export default Search