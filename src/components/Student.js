import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Star2 from './Star2';
import SlideNav from './SlideNav';
import TopNav from './TopNav';
import { jsonServer } from './Endpoint';
import {FaHeart} from 'react-icons/fa';
import {getAvgRating, getAllRatings} from './utility';
import Star from './Star';

class Student extends Component {
    constructor(props){
        super(props)
        
        this.main = React.createRef()
        this.state={
            nowPlaying: "",
            index: 0,
            sVideos : [],
            page: 1,
            params: {
                title:"",
                 q:"", 
                 instructor:"", 
                 category:"",
                 sort: "",
                 order: "",
                 topRated: "",
            },
            end: false, 
            students: "",
            aggregateRating: ""
        }
    }

    loadClickedVideo=event=>{
        
        const videoId = +event.target.closest('.item').dataset.id
        if(!event.target.closest('BUTTON')){
            this.setState({ 
                nowPlaying : event.target.closest('.item').dataset.link,
                index: this.state.sVideos.findIndex(video => video.id === videoId)
                }, ()=>{
                    // console.log('d', this.state.index, this.state.d)
                })
       }
    }

    openNav=event=>{
        this.main.current.style.marginLeft = "450px";
    }

    closeNav=()=>{
        this.main.current.style.marginLeft = "200px";
    }

    favoriteHandler=(video, id)=>{

        this.props.addFavorites(video, id)
    }

    sortHandler=(event)=>{
        let sort, order;
        let value = event.target.value;
        if(value !== ""){
            sort = value.split("_")[0];
            order = value.split("_")[1]
        }else{
            sort = "";
            order = "";
        }
        
        this.searchForVideos(1,"","","","",sort,order)
    }
    
    searchForVideos=async (page="", title="", q="", instructor="", category="", sort="", order="", starClicked)=>{
       
        let num = page || this.state.page;
        let endpoint;
        if(!starClicked){
            endpoint = `${jsonServer}/videos?title_like=${title}&q=${q}&instructor_like=${instructor}&category_like=${category}&_page=${num}&_limit=5&_sort=${sort}&_order=${order}`;
        }else{
            endpoint = `${jsonServer}/videos?title_like=${title}&q=${q}&instructor_like=${instructor}&category_like=${category}&_page=1&_limit=${5*num}&_sort=${sort}&_order=${order}`;
        }
        

        // console.log(endpoint)
        const videos = await fetch(endpoint).then(res=>res.json());
        if (page){
            this.setState({
                sVideos: [...videos],
                params: {
                    title,
                    q,
                    instructor,
                    category,
                    sort,
                    order,
                },
                page: 1,
                end: false
            }, ()=>{
                // console.log(this.state.sVideos)
                // console.log(this.state.params)
            })
        }else{
            this.setState({
                sVideos: [...this.state.sVideos, ...videos],
               
            }, async ()=>{
                // console.log(this.state.sVideos)
                let endpoint = `${jsonServer}/videos?title_like=${title}&q=${q}&instructor_like=${instructor}&category_like=${category}&_page=${num+1}&_limit=5&_sort=${sort}&_order=${order}`;
                const videos = await fetch(endpoint).then(res => res.json());
                if(videos.length === 0){
                    this.setState({
                        end: true, 
                    })
                }
            })
        }
        
    }

    loadMore=(starClicked=false)=>{
        this.setState({
            page: this.state.page + 1
        },()=>{
            console.log('page', this.state.page)
            const {title, q, instructor, category, sort, order} = this.state.params
            this.searchForVideos("", title, q, instructor, category, sort, order, starClicked)
           
        })
    }

    abridged=(description, len)=>{
        let regex = /[\W_]$/
        let desc = description.slice(0, len)
        let length = desc.length
        
        if(length < description.length){
                if(regex.test(desc)){
                desc = desc.slice(0,desc.length-1)
            }
            desc += '...'
        }
        return desc
    }
    
    formatDate=(timestamp)=>{
        let date = ""
        if(timestamp + (2*86400000) < Date.now()){
            let z = new Date(timestamp).toDateString()
            let t = z.split(" ")
            let filteredT = t.filter((item, index)=> index !== 0)  
            filteredT.forEach((t,i)=> {
                if(i===1){
                    date += " "
                }else if(i===2){
                    date += ","
                }
                date += t
            })
        }else if(timestamp + 86400000 < Date.now()){
            date = "Yesterday"
        }else if(Date.now()-timestamp <= 300000){
            date = "Just Now"
        }else if(Date.now()-timestamp < 3600000){
            date = `${Math.floor((Date.now()-timestamp) / 60000)} mins ago`
        }else{
            date = "Today"
        }
        return date
   }

   formatDuration =(duration)=>{
        duration = parseInt(duration)
    
        let durmins = Math.floor(duration / 60);
        let dursecs = Math.floor(duration % 60);
    
        durmins = durmins < 10?  "0"+durmins: durmins;
        dursecs = dursecs < 10?  "0"+dursecs: dursecs;
        let formattedTime = `${durmins} : ${dursecs}`;
        return formattedTime
    }

   recentUpload=(timestamp)=>{
        const isRecent = (Date.now()-timestamp <= 86400000)? true : false;
        return isRecent
    }

  

  isFavorite = (videoId, id)=>{
    
    let b = this.props.favorites.find(favorite => favorite.videoId === videoId && favorite.studentId === id)
    return b
 }

 checkTopRated=async (videoId)=>{
     console.log('video that was starred', videoId)
    const topRated = await getAllRatings()
        this.setState({
            topRated: +topRated
        },async()=>{
            if(videoId){
                const res = await fetch(`${jsonServer}/videos/${videoId}`);
                const video = await res.json()
                console.log(video)
                let index = this.state.sVideos.findIndex(sVideo => sVideo.id === videoId)
                let a = this.state.sVideos.slice(0)
                let b = a.splice(index,1,video)
                // let a = this.state.sVideos.slice(0).splice(index,1,video)
                console.log(index, a, b)
                this.setState({ 
                    sVideos:   a
                },()=>{
                    console.log('current state', this.state.sVideos)
                })
            }
            
        })
 }

 

//  const {index, getAvgRating, sVideos} = this.props;
 // console.log(this.props)
 retrieveRating = async(i)=>{
     const temp = await getAvgRating(this.state.sVideos)
     // console.log(temp)
     if(!isNaN(temp[0][i])){
         this.setState({
           aggregateRating: temp[0][i],
           students: temp[1][i]
         });
     }
 }

   

   async componentDidMount(){
        this.checkTopRated()
        // this.retrieveRating()
   }

    render() {
        const {id, videos, addFavorites,removeFavorite,favorites, getAllVideos, userType, logout, auth, firstTime} = this.props;
        const { nowPlaying, index, sVideos, topRated, end} = this.state;
     
        const loadInitVideo = ()=>{
            
                if(nowPlaying){
                    return <ReactPlayer url={nowPlaying} width="100%"  controls pip />
                  } else if(videos.length>0){
                    this.setState({ 
                        nowPlaying : this.props.videos[0].link,
                        sVideos:   [...this.props.videos]
                    })
                    return (
                      <ReactPlayer url={this.props.videos[0].link} width="100%" controls pip />
                    )
                  }
           
          }
        
        return (
            
            <div >

                <TopNav auth={auth} userType={userType} searchForVideos={this.searchForVideos} logout={logout}/>
            
                <SlideNav openNav={this.openNav} closeNav={this.closeNav} getAllVideos={getAllVideos}
                
                    id={id} favorites={favorites} removeFavorite={removeFavorite} loadClickedVideo={this.loadClickedVideo}

                    searchForVideos={this.searchForVideos}
                 />
            
                <div className="container-std"  id="main" ref={this.main}>
                    
                    <section id="video">
                        <div id="spinner" ></div>
                        {firstTime && <div className="alert alert-warning alert-dismissible fade show login-msg inactive" role="alert">
                        <strong style={{color:"rgb(241, 166, 166)"}}>We see you new around here. Here are some helpful tips:</strong>
                        <br/>
                        <strong>Tip 1: </strong> If you ever need to change your avatar, just click on the current one. 
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span> 
                        </button>
                    </div>}
                    <div className="alert alert-success alert-dismissible fade show add-favorite inactive" role="alert">
                        
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        {loadInitVideo()}

                        {sVideos.length>0 && <React.Fragment>
                            
                                                <div className="details course-info">
                                                    <div className="course-title">
                                                        <h4>{sVideos[index].title}</h4>
                                                        <div id="star-component" ><Star2 videoId={sVideos[index].id} id={id} checkTopRated={this.checkTopRated} /></div>
                                                    </div>
                                                    <div className="course-author">
                                                        <h5>{sVideos[index].instructor}</h5>
                                                         <button id="bookmark" onClick={(event)=>{addFavorites(sVideos[index], id)}} type="button">
                                                                {this.isFavorite(sVideos[index].id, id) && <FaHeart style={{color:"red"}} />}
                                                                {!this.isFavorite(sVideos[index].id, id) && <FaHeart style={{color:"grey"}}/>}
                                                         </button>
                                                    </div>
                                                    
                                                    <p>{sVideos[index].description}</p>
                                                </div>
                                             </React.Fragment>
                                                 
                                                
                        }
                        
                    </section>
                    <div className="videos-container">
                    <div style={{display: "flex", height: "40px", justifyContent: "flex-end", alignItems: "center", paddingRight: "10px"}}>
                        <select id="sort-videos" onChange={(event)=>{this.sortHandler(event)}} >
                            <option value="">Sort By</option>
                            <option value="createdAt_desc">Newest</option>
                            <option value="rating_desc">Top Rated</option>
                        </select>
                    </div>

                    {
                        sVideos.map((video, i) =>{ 
                            let desc = this.abridged(video.description, 115)
                            let date = this.formatDate(video.createdAt)
                            let recent = this.recentUpload(video.createdAt)
                            let duration = this.formatDuration(video.duration)
                            return(
                                
                                    <div  key={video.id}>
                                    <article className="item"  data-link={video.link} data-id={video.id} onClick={(event)=>{this.loadClickedVideo(event)}}>
                                                    <div className="img-box">
                                                        
                                                        { video.id !== topRated && <span style={{visibility:  recent? "visible": "hidden"}} className="badge badge-pill badge-warning mb-2">New</span>}
                                                        {video.id === topRated && <span className="badge badge-pill badge-warning mb-2">Top Rated</span>}
                                                        <img src={video.coverImage} alt="course cover" className="thumb nail"  />
                                                        <small className="duration">{duration}</small> 
                                                        <div> <Star getAvgRating={getAvgRating} index={i} sVideos={sVideos} userType={userType} /></div>
                                                    </div>
                                                    <div className="details meta">
                                                        <h4 className="overide">{video.title}</h4>
                                                        <h5 className="overide">{video.instructor}</h5>
                                                        
                                                        <p>{desc}</p>
                                                        
                                                    </div>
                                                    <div className="utilities">
                                                        <small className="date">{date}</small>
                                                        <button id="bookmark" onClick={(event)=>{this.favoriteHandler(video,id)}} type="button">
                                                                {this.isFavorite(video.id, id) && <FaHeart style={{color:"red"}} />}
                                                                {!this.isFavorite(video.id, id) && <FaHeart style={{color:"grey"}}/>}
                                                        </button>
                                                    </div>
                                                    
                                                </article>

                                    </div>
                                    
                                
                                
                            )
                        })
                    }
                        {!end && <button id="btn-more" className="mt-3 btn btn-primary" onClick={(event)=>{this.loadMore()}}>Load More</button>}
                    </div>
                    
                </div>
            </div>
            
        )
    }
}


export default Student
