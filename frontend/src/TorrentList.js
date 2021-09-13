import React, {Component} from 'react';

class TorrentList extends Component {
    render() {
        const torrents = [
            {name: 'torrent1', id: 'id1'},
            {name: 'torrent2', id: 'id2'},
            {name: 'torrent3', id: 'id3'}
        ];
        return (
            <ul>
                {torrents.map(t => (
                    <li key={t.id}><TorrentDisplay name={t.name} id={t.id}/></li>
                ))}
            </ul>
        );
    }
}

export default TorrentList;

class TorrentDisplay extends Component {
    handleDownload(id) {
        console.log('demande de téléchargement id=' + id);
    }

    render() {
        return (
            <div>
                <span className="">Torrent name : {this.props.name}</span>
                <button onClick={() => this.handleDownload(this.props.id)}>Télécharger</button>
            </div>
        );
    }

}
