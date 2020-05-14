import React, { useState, useRef } from 'react';
import Favorite from './Favorites';
import FixedNav from './FixedNav';
import Search from './Search';


function SlideNav(props){

    const { id,favorites , openNav, closeNav, removeFavorite, loadClickedVideo, getAllVideos, searchForVideos } = props;
    const nav = useRef(null);
    const [menu, setMenu] = useState('favorite')

    function openHandler(event){
        setMenu(event.target.id)
        nav.current.style.width = "250px"
        openNav()
        if(event.target.id === "favorite"){
            searchForVideos(1)
        }
    }
    
    function closeHandler() {
        nav.current.style.width = "0px"
        closeNav()
        // searchForVideos()
    }

    function searchOrFavorite(){ 
        if (menu === 'favorite'){
            return <Favorite id={id} favorites={favorites} removeFavorite={removeFavorite} loadClickedVideo={loadClickedVideo}/>
        }else{
            return <Search getAllVideos={getAllVideos} searchForVideos={searchForVideos}/>
        }
    }
    
        return (

                <div>
                    <FixedNav openHandler={openHandler} />
                    <div id="mySidenav" ref={nav} className="sidenav">
                        <button style={{padding:"0px 3px"}} className="closebtn" onClick={closeHandler}>&times;</button>
                        
                            {
                                searchOrFavorite()
                            }
                        
                    </div>
                    
                </div>
                
        )
    
}

export default SlideNav
