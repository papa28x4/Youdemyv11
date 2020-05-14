import React from 'react';
import {FaPlayCircle, FaRibbon, FaSpinner} from 'react-icons/fa';


function USP() {
    
    return (
        <div>
            <div className="py-4 selling-point text-white" style={{padding:"100px"}}>
                    <div className="row">

                        <div className="col">
                        <div className="media">
                                
                        <FaPlayCircle size={50}  />
                                <div className="media-body ml-3 text-left">
                                    <h5 className="mt-0">Fresh Content</h5>
                                    Choose from 65,000 courses with new additions published every month
                                </div> 
                            </div>
                        </div>

                        <div className="col">
                            <div className="media">
                                <FaRibbon size={40}/>
                                <div className="media-body ml-3 text-left">
                                    <h5 className="mt-0">Trusted Instructors</h5>
                                    Take courses taught by industry experts all over the world
                                </div>
                            
                            </div>
                        </div>
                        
                        <div className="col">
                            <div className="media">
                            <FaSpinner size={50}/>
                                <div className="media-body ml-3 text-left">
                                    <h5 className="mt-0">Flexible Learning</h5>
                                    Learn on your own terms with lifetime course access and Udemy mobile app
                                </div>
                        
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
    )
}

export default USP
