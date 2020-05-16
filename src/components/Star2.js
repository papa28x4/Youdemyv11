import React, { useState, useEffect } from 'react';
import {FaStar} from 'react-icons/fa';
import { jsonServer } from './Endpoint';
import './Star.css';

function Star(props) {
    // console.log(props)
    const {id, videoId} = props;
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [dbId, setDbId] = useState("")


    const storeRating=async (method, data, dbid) =>{
    
        const res = await fetch(`${jsonServer}/stars/${dbid}`, {
                method,
                headers: {
                    'content-Type': "application/json",
                },          
                body: JSON.stringify(data)
            })
            const result = await res.json()
            setRating(result.rating)
            props.checkTopRated(videoId)
            
    }
    
    const clickHandler= ratingValue=>{
       
        const data = {
            rating : ratingValue,
            videoId: videoId,
            studentId: id
        }

        
        if(!rating){
            storeRating("POST", data, '')
        }else{
            storeRating("PUT", data, dbId)
        }
    
    }

   

    useEffect(()=>{
        const getRating =async ()=>{
           
            let res = await fetch(`${jsonServer}/students/${id}/stars?videoId=${videoId}`);
            let data = await res.json()
            
            if(data.length !== 0){
                setRating(data[0].rating);
                setDbId(data[0].id)   
            }else{
                setRating(0)
            }
        }
        getRating() 
    }, [id, dbId, videoId, rating])
    


    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                
                return(
                    <label key={i}>
                       
                        <input type="radio" name="rating" value={ratingValue} onClick={()=>{clickHandler(ratingValue)}} />
                        <FaStar className="star" color={ratingValue <= (hover || rating)? "#ffc107" : "#e4e5e9" } size={20} 
                        onMouseEnter={()=>setHover(ratingValue)}
                        onMouseLeave={()=>setHover(null)}
                        />
                </label> )})}
            
        </div>
    )
}

export default Star
