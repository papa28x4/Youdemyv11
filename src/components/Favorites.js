import React, { Component } from 'react';



class Favorites extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render() {
        
        const {favorites, removeFavorite, loadClickedVideo} = this.props
    
        return (
            <div  className="fav-scroll">
               
            {
                favorites.map(({title, description, link, id, videoId, coverImage, instructor}) => {
                  
                    return(
                        <article className="item block fav" key={id} data-link={link} 
                            data-id={videoId} onClick={(event)=>loadClickedVideo(event)} >

                            <img src={coverImage} alt="" className="thumb-fav nail"  />
                            <div className="details fav">
                                <h4 className="overide">{title}</h4>
                                <h5 className="overide">{instructor}</h5>
                                
                            </div>
                            <button id="remove" onClick={(event)=>{removeFavorite(id)}} type="button">Remove</button>
                        </article>
                    )
                     
                })
           
            }
            </div>
        )
    }
}

export default Favorites
