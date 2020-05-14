import React, { Component } from 'react';
import TopSearch from './TopSearch';
import Logo from '../logo-coral.svg';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import './TopNav.css'

class TopNav extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
        
    render() {
        const { searchForVideos, userType, auth, responseGoogle2, logout, setUserAsStudent, setUserAsInstructor, name } = this.props;
        const navMargin = userType === "students" ? {marginLeft: "200px"} : {marginLeft: "0px"}
        
        const clientId = "162505339244-2d8n2tp3uesnd3o2n1ssj2hhtvfo0t96.apps.googleusercontent.com";
        // const clientId = "436551727204-c20npou3chehe6cv6i0sa481ua9n5a0j.apps.googleusercontent.com"
        
        const login_out =()=>{
            if(auth){
                 return (<GoogleLogout
                                    clientId={clientId}
                                    buttonText="Logout"
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout>)
            }else{
                 return(       
                            <div className="google-btn">
                                <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Student Login"
                                        onSuccess={setUserAsStudent}
                                        onFailure={responseGoogle2}
                                        cookiePolicy={'single_host_origin'}
                                        className="students"
                                        
                                        
                                />
                                <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Instructor Login"
                                        onSuccess={setUserAsInstructor}
                                        onFailure={responseGoogle2}
                                        cookiePolicy={'single_host_origin'}
                                        className="instructors"
                                />
                            </div>           
                        )
            }
             
                                
                               
        }

        const showSearchBar=()=>{
            if(userType === 'instructors'){
                return <h3 style={{margin: "auto", width: "50%", paddingRight: "7%"}}>Hi {name} !</h3>
            }else{
                return <TopSearch searchForVideos={searchForVideos} />
            }
        }
        return (
            	<nav style={navMargin} className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
                    <a className="navbar-brand" href="#/"><img style={{width:"100px", height:"28px"}} src={Logo} alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse"  id="navbarSupportedContent">

                

                        <ul className="navbar-nav mr-auto container-fluid">
                        {!userType && <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-list-ul mr-1"></i>
                                Categories
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#/">Business</a>
                                    <a className="dropdown-item" href="#/">Design</a>
                                    <a className="dropdown-item" href="#/">Photography</a>
                                    <a className="dropdown-item" href="#/">Development</a>
                                    <a className="dropdown-item" href="#/">Marketing</a>
                                    <a className="dropdown-item" href="#/">IT & Software</a>
                                    <a className="dropdown-item" href="#/">Personal Development</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#/">Take a Tour</a>
                                </div>
                            </li>}
                           

                            {showSearchBar()}
                            

                            <li className="nav-item" style={{position: "fixed", right: "20px"}}>
                                        {login_out()}  
                            </li>
                    
                        </ul>
 
                </div>
               
            </nav>
        )
    }
}

export default TopNav
