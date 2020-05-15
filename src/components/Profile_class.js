import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Instructor from './Instructor';
import Student from './Student';
import ProfileImage from './ProfileImage';
import './Student.css';
import { jsonServer } from './Endpoint'
                                                                                                        


class Profile_class extends Component {

    constructor(props){
        super(props)
        this.inputRef = React.createRef();
       
            this.state = {
                signout: false,
                id: null,
                videoId: null,
                videos: [],
                favorites: [],
                url: 'https://res.cloudinary.com/jaycodist/image/upload/v1570722683/mentors-first_qlquq9.png',
                firstTime: false
            }
        }
    
    fileUploadHandler=event=>{
        const {userType} = this.props.location.state
        const formData = new FormData();
        formData.append('image', event.target.files[0])
        console.log(formData, event.target.files[0] )
        fetch('https://api.imgur.com/3/image', {
           
            method: 'POST',
            headers: {
              Authorization: 'Client-ID d8eff465d8893ce',
            },
            body: formData
          }).then(response => {
            if (!response.ok) {
                return response.status   
            }
             
            return response.json();
            
          }).then(data => {
             alert('Image successfully uploaded');

              this.displayProfilePic(data.data.id)

              fetch(`${jsonServer}/${userType}/${this.state.id}`, {
                method: "PATCH",
                headers: {
                    'content-Type': "application/json",
                },
                
                body: JSON.stringify({url: data.data.link})
                }).then(res => res.json())
                .then(data => {
                    
                })
                .catch(err => console.log(err))
            }).catch(error => {
            
            alert('Upload failed: ' + error);
          });
    }

    displayProfilePic=imageId=>{
        fetch(`https://api.imgur.com/3/image/${imageId}`, {
            headers: {
            Authorization: 'Client-ID d8eff465d8893ce',
            }
        }).then(res => res.json())
        .then(data => this.setState({url: data.data.link}))
        .catch(err => console.log(err))
    }

    checkUser=async email=>{
        const {userType} = this.props.location.state
        const res = await fetch(`${jsonServer}/${userType}`)
        const users = await res.json()
        return users.find(user=> user.email === email)
    }

    postUserData = async ()=>{
        const {name, email, imageUrl, userType } = this.props.location.state;
        let data = {
            name, email, 
            url: imageUrl
        }
    
        const isExist = await this.checkUser(email)
        
        if(!isExist){
            
            fetch(`${jsonServer}/${userType}`, {
            method: "POST",
            headers: {
                'content-Type': "application/json",
            },
            
            body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
                this.setState({
                    id: data.id,
                    firstTime: true
                }, ()=>{
                    this.loginMessage()
                })
            })
            .catch(err => console.log(err))
        }else{
            this.setState({
                id: isExist.id,
                url: isExist.url
            })
        }
        
        userType === 'instructors' ? this.getMyVideos(this.state.id) : this.getFavorites();
    }
    
    loginMessage=()=>{
        const {userType} = this.props.location.state
        let msg = document.querySelector('.login-msg')
 
        if(msg){
           
            msg.classList.remove('inactive')
              if(userType === "students"){
                setTimeout(() => {
                    msg.innerHTML = `<strong>Tip 2: </strong> Search bar above allows you to search by course titles<br>
                                        For other advance search options, use the search menu on the left`
                  }, 10000);
                setTimeout(() => {
                    msg.innerHTML = `<strong>Tip 3: </strong> Click on the heart icon, to toggle between adding to and removing from favorites`
                  }, 20000);
                  setTimeout(() => {
                    msg.innerHTML = `<strong>Thank you for Signing Up</strong>`
                  }, 25000);
                setTimeout(() => {
                    msg.classList.add('inactive');
                  }, 30000);
              }else{
                setTimeout(() => {
                    msg.innerHTML = `<strong>Tip 2: </strong> Adding a Video is 2-step process: You upload then you save. Saving links your uploaded video to your account`
                  }, 10000);
                setTimeout(() => {
                    msg.innerHTML = `<strong>Thank you for Signing Up</strong>`
                  }, 18000);
                setTimeout(() => {
                    msg.classList.add('inactive');
                  }, 23000);
              }
        }
    }

    logout=()=>{
        sessionStorage.setItem('auth', 'false');
        this.setState({signout: true})
    }

    getMyVideos=async id=>{
        
        try{
            const res = await fetch(`${jsonServer}/instructors/${this.state.id}/videos`);
            const videos = await res.json()
            
            this.setState({
                videos
            },()=>{
   
            })
        }catch(err){
            alert("Something went wrong. Please check network and try again")
        }
        
    }


    getAllVideos=async ()=>{
        document.querySelector('#spinner').classList.add('show')
        try{
            const res = await fetch(`${jsonServer}/videos?_page=1&_limit=5`);
            const videos = await res.json()
            this.setState({
                videos
            },()=>{
                document.querySelector('#spinner').classList.remove('show')
            })
        }catch(err){
            // document.querySelector('#spinner').classList.remove('show')
            alert("Videos failed to load. Please check network and try again")
        }
       
        
    }

    addFavorites = (video, id) => {
        
        const data = {}
        data.studentId = id;
        data.videoId = video.id
        
        const {favorites} = this.state;
        
        const isExist = favorites.find(favorite => favorite.videoId === data.videoId && favorite.studentId === data.studentId)
       
        if(!isExist){
          fetch(`${jsonServer}/favoriteVideos`, {
            method: "POST",
            headers: {
              'content-Type': "application/json",
            },
            body: JSON.stringify(data)
          })
            .then(res => {
              this.getFavorites()
              this.addFavoritesFeedBack(true)
            })
            .catch(err => console.log(err))
        }else{
            fetch(`${jsonServer}/students/${id}/favoritevideos?videoId=${video.id}`)
            .then(res=>res.json())
            .then(data => this.removeFavorite(data[0].id))
            this.addFavoritesFeedBack(false)
        }
      }
    
    addFavoritesFeedBack=(added)=>{
        const favMsg =  document.querySelector('.add-favorite');
        if (added){
            const msg = `<strong>Video has been added to Favorites</strong>`  
            favMsg.innerHTML = msg
            favMsg.classList.remove('inactive')
          setTimeout(() => {
            favMsg.classList.add('inactive')
          }, 3000);
        }else{
            const msg = `<strong >Video has been removed from Favorites</strong>`  
            favMsg.innerHTML = msg
            favMsg.classList.add('alert-warning')
            favMsg.classList.remove('inactive')
              setTimeout(() => {
                favMsg.classList.add('inactive')
                favMsg.classList.remove('alert-warning')
              }, 3000);
        }
      }

      getFavorites=async ()=>{
          
        fetch(`${jsonServer}/students/${this.state.id}/favoriteVideos`)
        .then(res => res.json())
        .then(favorites => {
            
            if(favorites.length === 0){
                this.setState({
                    favorites: []
                })
            }else{
                let temp = [];
                favorites.forEach(favorite => {
                    fetch(`${jsonServer}/videos/${favorite.videoId}`)
                    .then(res => res.json())
                    .then(video =>{
                       for(let key in video){
                           if (key !== "id"){
                               favorite[key] = video[key]
                           }   
                       }       
                       temp.push(favorite)
                   
                        this.setState({
                            favorites: temp
                        }) 
                    })        
              }) 
            }
        })
        .catch(err => console.log(err))
  }
    
    removeFavorite=(id)=>{
        fetch(`${jsonServer}/favoriteVideos/${id}`, {
          method: "DELETE",
          headers: {'content-Type': "application/json"}
        })
        .then(res => {
          if(res.ok){
            this.getFavorites()
          }
        })
        .catch(err => console.log(err))
      }

    componentDidMount(){
        const {userType } = this.props.location.state;
        this.postUserData();
        if(userType === 'students'){
            this.getAllVideos();
        }
        
    }
  
    render() {
        const {name, userType, auth} = this.props.location.state;
        if(this.state.signout){
            return (<Redirect to={'/'}/>)
        }
        return (
           <div>
                <ProfileImage name={name} userType={userType} url={this.state.url} 
                fileUploadHandler={this.fileUploadHandler} />

                {userType === 'students' ?  <Student auth={auth} name={name} id={this.state.id} videos={this.state.videos}  
                addFavorites={this.addFavorites } favorites={this.state.favorites} removeFavorite={this.removeFavorite} getAllVideos={this.getAllVideos} userType={userType} logout={this.logout} firstTime={this.state.firstTime}  /> : 
                <Instructor auth={auth} name={name} id={this.state.id} myVideos={this.state.videos} getMyVideos={this.getMyVideos} userType={userType}  logout={this.logout} firstTime={this.state.firstTime}/> }

            </div>
        )
    }
}

export default Profile_class
