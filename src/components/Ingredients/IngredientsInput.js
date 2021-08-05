import classes from './IngredientsInput.module.css'
import Card from '../ui/Card'
import {useState} from 'react'
import Spinner from '../ui/Spinner'


const IngredientsInput =(props)=>{
const [nameState,setNameState]=useState('')
const [amountState,setAmountState] = useState('')

const onChangeName = (event)=>{
setNameState(event.target.value)
} 

const onChangeAmount = (event)=>{
    setAmountState(event.target.value)
}

const formData={
    title:nameState,
    amount:amountState
}


const onSubmitHandler =(event)=>{
    event.preventDefault()
    props.onSend(formData)
}

    return(
  <Card>      
<form className={classes.form} onSubmit={onSubmitHandler}>
    <div className={classes.control}>
    <label htmlFor='name'>Name</label>
    <input id='name' required type='text' onChange ={onChangeName}/>
    </div>
    <div className={classes.control}>
    <label htmlFor='name'>Amount</label>
    <input id='name' required type='number' onChange = {onChangeAmount}/>
    </div>
    <div className={classes.btnDiv}>
        <button type='submit' className={classes.btn}>Add Ingredient</button>
        {props.loading && <Spinner/>}
    </div>
</form>
</Card>)
}

export default IngredientsInput