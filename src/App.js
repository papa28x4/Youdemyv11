import React, {useState} from 'react';
import './App.css';
import Profile_class from "./components/Profile_class";
import Welcome from "./components/Welcome";
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {

  const [auth, setAuth] = useState(false);
  
    if(auth === false && JSON.parse(sessionStorage.getItem('auth'))){
       setAuth(JSON.parse(sessionStorage.getItem('auth')))
    }
  
  return (
    <div className="App">
      
      <Router>
      
        <Switch>
          <Route path="/" exact><Welcome setAuth={setAuth} auth={auth} /></Route>
        
          <PrivateRoute exact path="/profile" component={Profile_class} auth={auth}/>
        </Switch>
      </Router> 
     
    </div>
  );
}


export default App;
