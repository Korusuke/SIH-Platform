import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

import envvar from '../env'

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        // this.uploadFile = this.uploadFile.bind(this);
    }

    handleChange(event) {
        var files = []
        for(var i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i]);
            files.push(event.target.files[i]);
        }
        this.state.files = files;
    }

    uploadFiles() {
        for(var i in this.state.files) {
            // console.log(this.state.files[i]);
            let formData = new FormData();
            formData.append('file', this.state.files[i]);
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}/ps/upload`,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            }).then(res => console.log(res));
        }
    }


    render() {
        return (
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={this.handleChange}
                    multiple
                />
                <Button onClick={this.uploadFiles}>Upload</Button>
            </div>
        )
    }
}