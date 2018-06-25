import React from 'react';

import Dropzone from 'react-dropzone';



class UploadResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filestoupload: [],
            filesPreview: [],
            jobId: '',
            fileError: '',
            jobType: '',
            result: ''
        }
        this.removeFile = this.removeFile.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    removeFile(e, i) {
        e.preventDefault();
        var filestoupload = this.state.filestoupload;
        delete filestoupload[i];
        this.buildPreviewList(filestoupload);
    }
    onFileDrop(newFile, errorFile) {

        var filestoupload = this.state.filestoupload;
        newFile.map(function (file, i) {
            filestoupload.push(file);
			return file;
        })
        this.buildPreviewList(filestoupload);
	
    }
    buildPreviewList(filestoupload) {
        var removeIconStyle = {
            color: '#FF0000'
        }
        var filesPreview = [], self = this;
        filestoupload.map(function (file, key) {

            filesPreview.push(<div key={key} className='filepreviewList row'>
                <div className="col-md-11" > {file.name} </div>
                <div className="col-md-1" >
                    <a href="#" className="float-right" onClick={(e) => { self.removeFile(e, key) }} style={removeIconStyle} >
                        <span className='material-icons' >close</span>

                    </a>
                </div>
            </div>)
			return file;
        });

        this.setState({ filestoupload, filesPreview });
    }

    submitForm(e) {
        e.preventDefault();
        var formData = new FormData();
        var _self = this, error = "";
        var filestoupload = this.state.filestoupload;
          if (!filestoupload.length) {
            var removeIconStyle = {
                color: '#FF0000'
            }
            error = "\n Please Select a file"
        }
        
        if (_self.state.jobId === "" && _self.state.jobType === "") {
            error = "\n Please Select valid execution type or Please Enter valid execution Id ";
        }
       
      
        if (error !== "") {
            this.setState({ fileError: <div className="has-error" style={removeIconStyle}>{error}</div> });
            return false;
        }
         this.setState({ fileError: "Submitting...." });
        filestoupload.map((file, i) => {
            formData.append('file', file);
            formData.append('filenames', file.name);
			return file;
        });


        formData.append('jobId', _self.state.jobId);
        formData.append('jobType', _self.state.jobType);

        fetch('uploadResultData ', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then((response) => {
               
                document.getElementById("uploadResultsForm").reset();
                _self.setState({ fileError: "", filesPreview: "", result: response.result })
            }
        )

        return false;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4"> </div>
                <div className="col-md-4">
                    <form id="uploadResultsForm" className="form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="jobId">Execution Id:</label>
                            <input type="number" min="1" name='jobId' disabled={this.state.jobType} className="form-control" id="jobId" onChange={(e) => (this.setState({ jobId: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
                            <select id='type' name='type' className="form-control" disabled={this.state.jobId} onChange={(e) => (this.setState({ jobType: e.target.value }))}  >
                                <option value=""></option>
                                <option value="1">Smoke</option>
                                <option value="2">Sanity</option>
                                <option value="3">Sprint</option>
                                <option value="4">Regression</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Upload Files:</label>
                            <div className="filesPreviewContainer">
                                {this.state.filesPreview}
                            </div>
                            <Dropzone required="true" name='jobFile'
                                className="fileDropContainer" rejectClassName="dropRejectedFile"
                                activeClassName="dropContainerActive"
                                acceptClassName="dropContainerActive"
                                accept='.zip, .7z, .war' onDrop={(files) => this.onFileDrop(files)}>
                                <div>Drop/Click to upload files.</div>
                                <p>Only *.zip , *.7z and *.war files will be accepted</p>

                            </Dropzone>
                            <div className="filesPreviewContainer">
                                {this.state.fileError}
                            </div>
                            <div hidden={!this.state.result} className="uploadResults alert alert-success">
                                {this.state.result}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-4"> </div>
            </div>
        );
    }
}
export default UploadResults;