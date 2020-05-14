import React from 'react';
import './FixedNav.css';
import {FaSearch} from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
// import { emojify } from "react-emojione";

function FixedNav(props) {

    return (
        <div>
            <div className="fixednav">
           
                <div className="menu-div">
                    <FaHeart style={{color:"#818181", paddingLeft: "15px"}}/>    
                    <span id="favorite" className="menu" onClick={props.openHandler}>Favorites</span>
                </div>
                
                <div className="menu-div">
                    <FaSearch style={{color:"#818181", paddingLeft: "15px"}}/>
                    <span id="search" className="menu" onClick={props.openHandler}>Search</span>
                </div>
                
            </div>
        </div>
    )
}

export default FixedNav
