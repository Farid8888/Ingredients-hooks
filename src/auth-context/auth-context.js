import {createContext,useState} from 'react'



export const AuthContext = createContext({
    isAuth:false,
    login:()=>{}
})




const AuthContextProvider = (props)=>{
    const [authState, setAuthState]=useState(false)
    const authHandler = ()=>{
        setAuthState(prevState=>{
            return !prevState
        })
        // setAuthState(true)
    }


  return  <AuthContext.Provider value={{isAuth:authState,login:authHandler}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider