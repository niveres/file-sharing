import {Component} from 'react';
import FirebaseService from "../services/FirebaseService";


export class UploadAndSeed extends Component {

    componentWillUnmount() {
        this.stopInterval(this.interval);
    }

    stopInterval(interval) {
        clearInterval(interval);
    }

    uploadFile(e) {
        console.log('File uploaded !');
        console.log(e.target.files[0]);
        let formData = new FormData();
        formData.append('file0', e.target.files[0]);

        var WebTorrent = require('webtorrent');
        var client = new WebTorrent();
        client.seed(e.target.files[0], {name:e.target.files[0].name},(torrent) => {
            console.log('Torrent created and seeding : ' + torrent.magnetURI);
            console.log(torrent);

            // save to db
            FirebaseService.create('t1', {name:torrent.name, uri:torrent.magnetURI})
                .then(()=>console.log('Torrent sauvegardé, clé=T1'))
                .catch((e)=>console.log(e));
        });
    }

    render() {
        return (
            <div>
                <div>
                    <span>Upload File </span><input type="file" name="file" onChange={(e) => this.uploadFile(e)}/>
                </div>
            </div>
        );
    }
}
