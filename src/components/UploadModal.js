import React from 'react';
import VidUploadForm from './VidUploadForm2'

function UploadModal(props, ref) {
    const {saveToDB, titleInput, courseSection, descInput, beginUpload, photoURL} = props;
    return (
        <div>
        
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Add Video 
                </button>

                
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Upload a Video</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <VidUploadForm saveToDB={saveToDB}  titleInput={titleInput} 
                                    courseSection={courseSection} descInput={descInput} beginUpload={beginUpload}
                                    photoURL={photoURL} />
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default UploadModal
