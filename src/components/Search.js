import React, { Component } from 'react'

export class Search extends Component {
    constructor(props){
        super(props)
        
        this.state ={
            q:"",
            instructor: "",
            category: "",
            title: ""
        }
    }

    searchByText=event=>{
        this.setState({
            q: event.target.value,
        },()=>{
          const {title, q} = this.state;
          this.props.searchForVideos(1, title, q)
        })
    }

    searchByInstructor=event=>{
        this.setState({
            q: "",
            instructor: event.target.value
        },()=>{
          const {title, q, instructor} = this.state;
          this.props.searchForVideos(1, title, q, instructor)
        })
    }

    searchByCategory=event=>{
        this.setState({
            q: "",
            instructor: "",
            category: event.target.value
        },()=>{
            const {title, q, instructor, category} = this.state;
            this.props.searchForVideos(1, title, q, instructor, category)
        })
    }

   
    
    render() {
        return (
            <div style={{paddingTop: "50px"}}>
                <input type="search" name="instructor" placeholder="Search By Instructor" onChange={event=>this.searchByInstructor(event)} />
                <input type="search" name="full-text" placeholder="Full-text Search" onChange={event=>this.searchByText(event)}/>
                <select name="category" id="category" onChange={event=>this.searchByCategory(event)}>
                    <option value="">By Category</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Photography">Photography</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT&Software">IT&Software</option>
                    <option value="Personal">Personal Development</option>
                </select>
            </div>
        )
    }
}

export default Search
