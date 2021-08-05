import classes from './Auth.module.css'
import Card from '../ui/Card'
import {AuthContext} from '../../auth-context/auth-context'
import {useContext} from 'react'


const Auth =()=>{
    const ctxAuth = useContext(AuthContext)
    const authControl = ctxAuth.login
    return(
    <Card>
     <div className={classes.auth}>
         <h1>You are not authenticated</h1>
         <p>Please go in to continue</p>
         <button onClick={authControl}>Log In</button>
     </div>
     </Card>
    )
}

export default Auth