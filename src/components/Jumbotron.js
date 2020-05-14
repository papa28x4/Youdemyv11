import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Jumbotron() {
    return (
        
            <div className="Jumbotron big-banner" style={{height:"500px", paddingTop: "50px"}}>
                
                <div className="container-1" style={{height:"100%", padding:"100px"}}>
                    <div className="row align-items-center" style={{height:"100%"}}>
                        <div className="col px-0">
                            <div className="col-3">
                                <h1 className="display-5">Hot Sale-$9.99 courses!</h1>
                            <p className="lead">Get our best deal on courses</p>
                            <hr className="my-4" />
                            </div>
                            <div className="col-6">
                                <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2 col-8" type="search" placeholder="What do you want to learn" aria-label="Search"/>
                                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit"><FaSearch /></button>
                                </form>
                            </div>
                            

                            
                        </div>
                        
                    </div>       
                </div>
            </div>

        
    )
}

export default Jumbotron
