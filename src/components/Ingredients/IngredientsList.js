
import classes from './IngredientsList.module.css'


const IngredientsList = (props)=>{
    const recieveData = props.data
    const content = recieveData.map(item=>{
        console.log(recieveData)
        return <div className={classes.list} key={item.id} onClick={()=>props.removeHandler(item.id)}>
        <div className={classes.listInside}>
        <ul>
        <li >
                <span>{item.title}</span>
                <span>{item.amount}x</span>
           </li>
        </ul>
     </div>
    </div>
    })
    return (
        <div className={classes.header}>
            <h1 className={classes.title}>List of Ingredients</h1>
            {content}
        </div>)
}

export default IngredientsList