import classes from './ErrorModal.module.css'




const ErrorModal =(props)=>{
    return(
    <div className={classes.backDrop} onClick={props.close}>
        <div className={classes.errorModal}>
        <div className={classes.errorMessage}><h1>{props.errorMessage}</h1></div>
        <div className={classes.error}>
            <p>{props.error}</p>
            <button onClick={props.close}>Okay</button>
        </div>
        </div>
 </div>)
}


export default ErrorModal