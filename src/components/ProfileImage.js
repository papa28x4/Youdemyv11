import React, { Component } from 'react'

class ProfileImage extends Component {
    constructor(props){
        super(props)
        this.inputRef = React.createRef();
        this.imageRef = React.createRef();
        this.state = {

        }
    }

    readImage=event=>{
        let image = this.imageRef.current
        const reader = new FileReader()
        reader.onload = function(){
            image.src = reader.result
        }
        reader.readAsDataURL(event.target.files[0])
    }

    fileHandler=event=>{
        this.readImage(event)
        this.props.fileUploadHandler(event)
    }

    altFileHandler=event=>{
        event.preventDefault()
        this.inputRef.current.click()
    }


    render() {

        const {name, url, userType} = this.props;
        const avatar = userType === "students" ? {color:"white", position: "fixed", top: "10%", zIndex: 5, left: "50px"}
         : {color:"black", position: "fixed", top: 4, zIndex: 5, right: "150px"};
         const image = userType === 'students' ? {cursor: "pointer", height:"100px", width: "100px"} : {cursor: "pointer", height:"50px", width: "50px"}
        return (
            
                <div className="profile-image" style={avatar}>
                
                    <div id="upper">
                        <img  style={image} referrerPolicy="no-referrer" id="image" src={url} 
                       alt="My-Profile" onClick={event=>this.altFileHandler(event)} data-toggle="tooltip" title="Click to upload new picture" ref={this.imageRef} />
                        {userType === "students" && <div id="username" >{name}</div>}
                    </div>
                        <input style={{display: 'none'}} type="file" onChange={event => this.fileHandler(event)}
                    ref={this.inputRef}/>
                 </div>  
            
        )
    }
}

export default ProfileImage
