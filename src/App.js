import Auth from './components/Auth/Auth'
import {AuthContext} from './auth-context/auth-context'
import {useContext} from 'react'
import Ingredients from './components/Ingredients/Ingredients'


function App() {
  const ctxAuth = useContext(AuthContext)
  const auth = ctxAuth.isAuth
 let content = <Auth/>
if(auth){
  content = <Ingredients/>
}

  return (
    <div>
      {content}
    </div>
  );
}

export default App;
