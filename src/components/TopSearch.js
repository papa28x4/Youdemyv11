import React, { Component } from 'react';
import {FaSearch} from 'react-icons/fa';

export class TopSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            title: ""
        }
    }

    inputHandler=event=>{
        this.setState({   
            title: event.target.value
        },()=>{
            if(this.state.title === ""){
                this.props.searchForVideos(1)
            }
        })
    }

    clickHandler=event=>{
        event.preventDefault()
        const {title} = this.state;
        this.props.searchForVideos(1,title)
    }

    render() {
        return (
           <li className="nav-item col-7">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2 col-8" type="search" name="title" placeholder="Search For Courses" aria-label="Search" onChange={event=>this.inputHandler(event)} />
                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" id="topSearch" onClick={event=>this.clickHandler(event)}><FaSearch /></button>
                </form>
            </li>                                     
        )
    }
}

export default TopSearch
