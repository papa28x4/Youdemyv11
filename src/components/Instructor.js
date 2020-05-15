import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { openUploadWidget } from "./CloudinaryService";
import Star from './Star';
import './Instructor.css';
import TopNav from './TopNav';
import UploadModal from './UploadModal';
import { jsonServer } from './Endpoint';


class Instructor extends Component {
    constructor(props){
        super(props)
        
        this.state={
          images: [],
          videos: [],
          photoURL: "",
          videoURL: "",
          publicId: "",
          edited: false,
          title : "",
          description: "",
          category: "",
          prevTitle: "",
          prevDescription: "",
          prevCategory: "",
          nowPlaying: "",
          inputFile: null,
          img: null,
          src: "",
          index: "",
          editMsg:false,
          opsMsg: "",
          duration: "",
          imageClicked: false,
        }
    }

    descInput=event=>{
        this.setState({
            description: event.target.value
        })
    }    

    titleInput=event=>{
        this.setState({
            title: event.target.value
        })
    }

    courseSection=event=>{
        this.setState({category: event.target.value});
    }

    
    beginUpload = (event,tag) => {
        // console.log(event.target.name)
        let targetBtn = event.target;
        targetBtn.disabled = true;
        const btnClicked = targetBtn.name;
        const btnClickedClass = targetBtn.className;
        console.log('btnclicked', btnClicked)
        const tagsValue = btnClicked === 'video' ? [tag, 'aVideo'] : [tag, 'anImage'];
    const uploadOptions = {
        cloudName: "papa28x4",
        tags: tagsValue,
        uploadPreset: "jzsjtyng"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
        if (!error) {
                console.log(photos);
            if(photos.event === 'success'){
                console.log('secure url', photos.info.secure_url)
                if(photos.info.resource_type === "video" || photos.info.resource_type === "image" ){
                    // console.log(event)
                    if(btnClicked === 'video'){
                    //check if upload is video
                        if(photos.info.resource_type === "video"){
                            this.setState({
                                videos: [...this.state.videos, photos.info.public_id],
                                videoURL:photos.info.secure_url, 
                                photoURL:photos.info.thumbnail_url, 
                                duration: photos.info.duration, 
                                publicId:photos.info.public_id
                            }, ()=>{
                                console.log(this.state)
                            })
                        }else{
                            alert(`Expecting a video but you uploaded ${photos.info.format}. Please upload video`)
                        }
                        
            
                    }else{
                        if(photos.info.resource_type === "image"){
                            this.setState({
                                images:[...this.state.images, photos.info.public_id],
                                photoURL:photos.info.secure_url, 
                                imageClicked:true
                            },()=>{
                                console.log('I indeed came here')
                                if(btnClickedClass === 'nail'){
                                    console.log('met the conditon')
                                    this.setState({
                                        editMsg : true,
                                        imageClicked: false,
                                        opsMsg: "Not to worry, your new thumbnail will reflect when you save. Continue with other changes when done, click save"
                                    })
                                    setTimeout(() => {
                                        this.setState({
                                            editMsg : false,
                                            opsMsg: ""
                                        })
                                    }, 10000);   
                                }
                            })
                        } else{
                            alert(`Expecting an image but you uploaded ${photos.info.format}. Please upload an image`)
                        }
                    }
                    targetBtn.disabled = false;

                }else{
                    alert("You have uploaded an unsupported file type. Images and videos only")
                }
            }else if(photos.event === 'abort'){
                targetBtn.disabled = false;
            }
        } else {
        console.log(error);
        targetBtn.disabled = false;
        }
    })
    }

    saveToDB=async event=>{
        console.log(event.target)
        
        const {id, getMyVideos, name} = this.props;
        const {title, description, category, photoURL, videoURL, publicId, duration} = this.state;

        if(title && description && category && photoURL && videoURL){
            console.log('inside if')
            const btn = event.target
            btn.disabled = true
            const payLoad = {
                publicId,
                title,
                description,
                category,          
                coverImage: photoURL,
                link: videoURL,
                duration,
                instructorId: id,
                instructor: name,
                edited: false,
                createdAt: Date.now(),
                rating: 0
            }
            
            fetch(`${jsonServer}/videos`, {

            method: "POST",
            headers: {
                'content-Type': "application/json",
            },

            body: JSON.stringify(payLoad)

            }).then(res => res.json())
            .then(data => {
                console.log('data', data)
                getMyVideos(id)
                alert("Video has been saved to the database")
                document.querySelector("#video-form").reset()
                this.setState({
                    title: "",
                    description : "",
                    category: "",          
                    photoURL: "",
                    videoURL: "",
                    duration: "",
                    edited: false,
                    imageClicked: false,
                    images: [],
                    videos: [],
                })  
                btn.disabled = false;
            }).catch(err => {
                        console.log('Upload incomplete: Video was not saved. Check network and try again')
                        btn.disabled = false;
                   })
           
        }else {
            console.log('inside else if')
            alert("One or more fields need to be field")

        }
    }

    uploadMessage=(status, message )=>{
        document.querySelector('#spinner').classList.remove('show')
        let alert = document.querySelector('.upload-status')
        alert.classList.add(status)
        alert.textContent = message
        alert.classList.remove('inactive')
        
        setTimeout(() => {
            alert.classList.add('inactive');
            alert.classList.remove(status)
          }, 5000);
    }

    editVideoDetails= event=>{
       
         this.setState({
             editMsg : true,
             opsMsg: "Edit Mode Tip: Thumbnail can be changed by clicking on it"
         })
         setTimeout(() => {
            this.setState({
                editMsg : false,
                opsMsg: ""
            })
          }, 10000); 
        

        const currentElem = event.target.closest('.instructor-videos')
        const index = +currentElem.dataset.index;
        let title = currentElem.querySelector('#title')
        let description = currentElem.querySelector('#description')
        let inputFile = currentElem.querySelector('input[type="file"]')
        let img = currentElem.querySelector('img')
        let category = currentElem.querySelector('#category-choice')
        this.setState({
            src: img.src,
            title: title.textContent,
            prevTitle: title.textContent,
            description: description.textContent,
            prevDescription: description.textContent,
            category: category.textContent,
            prevCategory: category.textContent,
            edited: true, 
            inputFile,
            img,
            index,
            
        }, ()=>{
           
        })
        title.setAttribute('contenteditable', true)
        description.setAttribute('contenteditable', true)
        title.focus()
        
    }

    returnPrevState=event=>{
        const {prevTitle, prevDescription, src} = this.state;
        const currentElem = event.target.closest('.instructor-videos');
        let title = currentElem.querySelector('#title');
        let description = currentElem.querySelector('#description');
        let img = currentElem.querySelector('img');
       
        title.textContent = prevTitle;
        description.textContent = prevDescription;
        img.src = src;
        title.contentEditable = false;
        description.contentEditable = false;
        this.setState({
            edited: false
        })
    }

    editTitle=event=>{
        this.setState({
            title: event.target.textContent
        })
    }

    editDescription=event=>{
        this.setState({
            description: event.target.textContent
        })
    }

    updateVideoDetails=async event=>{
        const {prevTitle, prevDescription, prevCategory, title, description, category, edited, photoURL} = this.state;
        const currentElem = event.target.closest('.instructor-videos');
        const titleElem = currentElem.querySelector('#title');
        const descriptionElem = currentElem.querySelector('#description');
        const videoId = currentElem.dataset.id;
        const {id, getMyVideos} = this.props;
       

        console.log('photourl', photoURL)
        
    
        if(prevTitle === title && prevDescription === description && prevCategory === category && photoURL===""){
            this.setState({
                editMsg : true,
                opsMsg: "No changes were made"
            })
            setTimeout(() => {
               this.setState({
                   editMsg : false,
                   opsMsg: ""
               })
             }, 5000); 
        }else{

            const update = {    
                title,
                description,
                category,
                edited,
                "lastModified" : Date.now()
                        }

            if(photoURL){update.coverImage = photoURL}
            fetch(`${jsonServer}/videos/${videoId}`, {

            method: "PATCH",
            headers: {
                'content-Type': "application/json",
            },

            body: JSON.stringify(update)

            }).then(res => res.json())
            .then(data => {
                getMyVideos(id)
                this.setState({
                    editMsg : true,
                    opsMsg: "Changes have been saved"
                })
                setTimeout(() => {
                   this.setState({
                       editMsg : false,
                       opsMsg: ""
                   })
                 }, 5000); 
               
            })

        }
        
            titleElem.contentEditable = false;
            descriptionElem.contentEditable = false;
            this.setState({
                edited: false
            })
    }


    imageUpload=imgFile=>{
        const imageData = new FormData();
        imageData.append('image', imgFile)
        
        return fetch('https://api.imgur.com/3/image', {
           
            method: 'POST',
            headers: {
              Authorization: 'Client-ID d8eff465d8893ce',
            },
            body: imageData
          }).then(response => {
            if (!response.ok) {
                return response.status   
            }
             
            return response.json();
            
          }).then(data => data.data.link)
          .catch(err=>console.log(err))
    }

    fileHandler=event=>{
        this.readImage()
    }

    readImage=event=>{
        const {img, inputFile} = this.state
        const reader = new FileReader()
        reader.onload = function(){
            img.src = reader.result
        }
        this.setState({
            imgFile: inputFile.files[0]
        })
        reader.readAsDataURL(inputFile.files[0])
    }

    getAvgRating=async ()=>{
        const {myVideos} = this.props;
        const temp = [];
        const videoRatings = []

        const calcAverage=arr=>{
            let avg = arr.reduce((a,b)=>{
                    return (a+b) },
            0) / arr.length
            return +avg.toFixed(2)
        }

        const countStds =arr=>{
            return arr.length
        }
        
        myVideos.forEach(myVideo => {
            
            let data = fetch(`${jsonServer}/videos/${myVideo.id}/stars/`)
                            .then(res => res.json())
                            
            temp.push(data)
         })
         const outputs = await Promise.all(temp);
        
         for(let i=0; i<outputs.length; i++){
            videoRatings[i] = [];
            for(let output of outputs[i]){
                videoRatings[i].push(output.rating)
              }
         }
        const avg = videoRatings.map(calcAverage)
        const stds = videoRatings.map(countStds)
        
        return [avg, stds]
    }

    loadClickedVideo=event=>{
        if(this.state.edited === false){
            this.setState({ 
                nowPlaying : event.target.closest('.videos').dataset.link
            })
        }else{
            this.beginUpload(event)
        }   
    }

    deleteVideo=async index=>{
        const {id, getMyVideos} = this.props;
        const videoId = this.props.myVideos[index].id
        // console.log("id=", videoId)
        fetch(`${jsonServer}/Videos/${videoId}`, {
            method: "DELETE",
            headers: {'content-Type': "application/json"}
          })
          .then(res => {
            if(res.ok){
                console.log(res)
              getMyVideos(id)
            }
          })
          .catch(err => console.log(err))
    }

    render() {
        const {name, myVideos, userType, auth, logout, firstTime} = this.props;
        const { nowPlaying, edited, category, editMsg, opsMsg, photoURL } = this.state;
        const {descInput, titleInput, saveToDB, loadClickedVideo, courseSection, beginUpload} = this;
        
        const loadInitVideo = ()=>{
            if(nowPlaying){
              return <ReactPlayer url={nowPlaying}  controls pip />
            } else if(myVideos.length>0){
              return <ReactPlayer url={this.props.myVideos[myVideos.length - 1].link} controls pip />
            }
        }
  
        return (
            <div>
            <TopNav auth={auth} name={name} searchForVideos={this.searchForVideos} userType={userType} logout={logout} />
                <section id="vid-section">
                    
                    {firstTime && <div className="alert alert-warning alert-dismissible fade show login-msg inactive" role="alert">
                        <strong>We see you new around here. Here are some helpful tips:</strong>
                        <br/>
                        <strong>Tip 1: </strong> If you ever need to change your profile picture click on the current one. 
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                   
                    {loadInitVideo()}
                    {editMsg && <div className="alert alert-warning alert-dismissible fade show edit-msg" role="alert">
                        {opsMsg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                </section>

                <UploadModal   saveToDB={saveToDB} titleInput={titleInput}  courseSection={courseSection} 
                               descInput={descInput} beginUpload={beginUpload} photoURL={photoURL}/>

                <div>
                    <div className="instructor-videos video-headings">
                        <div>Thumbnail</div>
                        <div>Title</div>
                        <div>Description</div>
                        <div>Category</div>
                        <div>Aggregate Rating</div>
                        <div>Operations</div>
                    </div>
                {
                    myVideos.slice(0).reverse().map((myVideo, index) =>{ 
                        
                     return(
                         <div  className="instructor-videos" key={myVideo.id} data-id={myVideo.id} data-index={index}>
                             
                             <div className="videos" data-link={myVideo.link} onClick={loadClickedVideo}>
                                 <img width="240px" height="135px" src={myVideo.coverImage} alt="course cover" className="nail" />
                            </div>
                           
                             <div id="title" onInput={this.editTitle}>{myVideo.title}</div>
                             <div style={{textAlign: "left"}}id="description" onInput={this.editDescription}>{myVideo.description}</div>
                            <div>
                             {             
                                 (index === this.state.index && edited)? 
                                 <select value={category} name="category" id="category" onChange={this.courseSection}>
                                    <option value="Business">Business</option>
                                    <option value="Design">Design</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Development">Development</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="IT&Software">IT&Software</option>
                                    <option value="Personal">Personal Development</option>
                                 </select>
                                 : <div id="category-choice" >{myVideo.category}</div>                                    
                             }
                             </div>
                              
                             <div> <Star getAvgRating={this.getAvgRating} index={index} /></div>
                                 {
                                     (!edited)?
                                    <div><button className="operations btn btn-success" id="edit" onClick={this.editVideoDetails}>Edit</button>
                                    <button className="operations btn btn-danger" id="edit" onClick={()=>{this.deleteVideo(index)}}>Delete</button></div>  :
                                    <div><button className="operations btn btn-success" id="save" onClick={this.updateVideoDetails}>Save</button>
                                    <button className="operations btn btn-danger" id="cancel" onClick={this.returnPrevState}>Cancel</button></div>
                                 }
                        </div>
                        )
                    })
                }
                </div>
                
            </div>
        )
    }
}


export default Instructor
