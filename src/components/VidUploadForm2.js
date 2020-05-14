import React, { Component } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import './VidUploadForm.css';


class VidUploadForm extends Component {
    constructor(props){
        super(props)
        this.formRef = React.createRef()

        this.state = {
            imageClicked: false,
        }
    }

    titleHandler=event=>{
        this.props.titleInput(event)  
    }

    descHandler=event=>{
        this.props.descInput(event)
    }

    courseHandler=event=>{
        this.props.courseSection(event)
    }

    saveHandler=event=>{
        this.props.saveToDB(event)
    }

    uploadHandler=event=>{
        this.props.beginUpload(event)
    }
   

    render() {

        return (
            <React.Fragment>
                <div className="modal-body">
                    <div className="alert alert-dismissible fade show upload-status inactive" role="alert">
                        
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <CloudinaryContext cloudName="papa28x4">
                        <form id="video-form" ref={this.formRef}>
                            <div className="wrapper">
                                {/* <div id="spinner" ref={this.spinnerRef}></div> */}
                                <div>
                                    
                                <div className="controls">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" name="title" placeholder="Enter a title" onChange={event=>this.titleHandler(event)} />
                                        </div>
                                        <div className="controls">
                                            <label htmlFor="description">Description</label>
                                            <textarea id="description" type="text" name="description" placeholder="Enter a description" rows="5" onChange={event=>this.descHandler(event)} ></textarea>
                                        </div>
                                        <div className="controls">
                                                    
                                                    <select className="select-css my-4" name="category" id="category" onChange={event=>this.courseHandler(event)}>
                                                        <option value="">Choose a Category</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Design">Design</option>
                                                        <option value="Photography">Photography</option>
                                                        <option value="Development">Development</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="IT&Software">IT&Software</option>
                                                        <option value="Personal">Personal Development</option>
                                                    </select>
                                                </div>
                                        

                                            {   
                                                this.props.photoURL && <div>
                                                    {!this.state.imageClicked && <p style={{fontSize: "10px", color: "blue"}}>Have your own cover-image? Click on thumbnail to change</p>}
                                                    <img  src={this.props.photoURL} style={{width:"135px", height:"90px"}} title="click to change thumbnail" alt="thumbnail" onClick={(event) => this.uploadHandler(event)}/>
                                                </div>
                                            }
                                            
                                            <button type="button" className="clicks btn btn-block btn-primary" name="video" onClick={(event) => this.uploadHandler(event)}>Upload Video</button>
                                        
                                                    
                                </div>
                                    
                            </div>
                        </form>
                        </CloudinaryContext>
                                
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" onClick={event=>this.saveHandler(event)}>Save</button>
                </div>
                
            </React.Fragment>
                
            
        )
    }
}

export default VidUploadForm
