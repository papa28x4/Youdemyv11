import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './Welcome.css';
import Jumbotron from './Jumbotron';
import USP from './USP';
import TopNav from './TopNav';
import Slider from './Slider/Slider';


function Welcome({auth, setAuth}) {
    
        const [redirect, setRedirect] = useState(false)
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [imageUrl, setImageUrl] = useState("");
        const [userType, setUserType] = useState("")
        // const [userType, setUserType] = useState("instructors")

        
        if(redirect){
            return (<Redirect to={{
                pathname: '/profile',
                state: {name, email, imageUrl, userType, auth}
                }}/>)
        }
        const responseGoogle=(response)=>{
            if(response){
                setName(response.profileObj.name);
                setEmail(response.profileObj.email);
                setImageUrl(response.profileObj.imageUrl);
            }
            setAuth(true)
            sessionStorage.setItem('auth', true)
            setRedirect(true)
        }
        const responseGoogle2=(error)=>{
            console.log(error)  
        }

        const setUserAsStudent=(response)=>{
            setUserType('students')
            responseGoogle(response)
        }

        const setUserAsInstructor=(response)=>{
            setUserType('instructors')
            responseGoogle(response)
        }

       

        return (
            <div className="App">
                      
                    <TopNav setUserAsInstructor={setUserAsInstructor} setUserAsStudent={setUserAsStudent} responseGoogle={responseGoogle} responseGoogle2={responseGoogle2}/>
                   <Jumbotron />
                    <USP />
                    <Slider />
                   
            </div>
          );
    
}

export default Welcome
