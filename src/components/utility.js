import { jsonServer } from './Endpoint';

export const getAvgRating=async (myVideos)=>{
        // const {myVideos} = this.props;
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







export const addRating=async (store, stds) =>{
    
    for(let key in store){
        
        await fetch(`${jsonServer}/videos/${key}`, {
                method: "PATCH",
                headers: {
                    'content-Type': "application/json",
                },          
                body: JSON.stringify({rating:store[key],
                                      stds: stds[key]  
                })
            })
        // const result = await res.json()
        // console.log(result)
        
    }
    
}
       

export const getAllRatings=async () =>{
    const store = {};
    const stds = {}
    const calcAverage=arr=>{
        let avg = arr.reduce((a,b)=>{
                return (a+b) },
        0) / arr.length
        return +avg.toFixed(2)
    }

    const compare=(x,y)=>{		
        return store[y] - store[x];
    }
    
    const ratings = await fetch(`${jsonServer}/stars`).then(res=>res.json())
    
    ratings.forEach(rating => {
        if(store[rating.videoId]){
            store[rating.videoId] = [...store[rating.videoId], rating.rating ]
        }else{
            store[rating.videoId] = [rating.rating]
        }
    })
    
    for(let key in store){
        stds[key] = store[key].length
        store[key] = calcAverage(store[key])
    }

    

    const keys = Object.keys(store)
    
    keys.sort(compare)

    const topRated = keys[0]
    // console.log(topRated)
    
    // console.log(store)

    await addRating(store, stds)

    return topRated
}