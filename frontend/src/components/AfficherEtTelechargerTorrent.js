import {Component} from 'react';
import {FormatUtils} from '../services/FormatUtils';
import {BoutonTelechargementFichier} from './BoutonTelechargementFichier';
import {BoutonPlayPauseTelechargement} from "./BoutonPlayPauseTelechargement";
import FirebaseService from "../services/FirebaseService";


export class AfficherEtTelechargerTorrent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progression: '0.00',
            dSpeed: 0,
            files: [],
            torrent: null
        };
    }

    progression = 0;
    interval;
    addedTorrent;

    componentWillUnmount() {
        this.stopInterval(this.interval);
    }

    stopInterval(interval) {
        clearInterval(interval);
    }

    componentDidMount() {
        // var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
        // this.createDownloadTorrent(torrentId);

        FirebaseService.getOne('t1').on('value', (dbValue)=>{
            console.log("donnée récuperée de la base :"+JSON.stringify(dbValue));
            this.createDownloadTorrent(dbValue.val().uri);
        });
    }

    createDownloadTorrent(torrentId){
        var WebTorrent = require('webtorrent');
        var client = new WebTorrent();

        // En cas de pépins ! :O
        client.on('error', (err) => {
            console.log("Probleme au niveau du client");
            console.log(err);
        });

        // Lorsque le torrent est initialisé, callback pour effectuer des actions
        client.on('torrent', (t) => {
            // On enregistre dans l'état du composant le torrent et les files
            this.setState({
                files: t.files,
                torrent: t
            });

            // On met les téléchargements en "pause" pour qu'ils soient à l'initiative de l'utilisateur
            // t.files.forEach((f)=>{
            //     f.deselect();
            // });

        });

        this.addedTorrent = client.add(torrentId, (torrent) => {
            console.log(torrent);
            this.interval = setInterval(() => {
                // Affichage en mode lisible de la progression du téléchargement
                let p = (torrent.progress * 100).toFixed(2);
                // Mise à jour de l'état du composant
                // this.state.progression = p;
                // this.state.dSpeed = this.addedTorrent._downloadSpeed() / 1024;
                this.setState({
                    progression: p,
                    dSpeed: this.addedTorrent._downloadSpeed() / 1024
                });
                // Si on doit arrêter cette boucle
                if (Number.parseInt(p) >= 100) {
                    this.stopInterval(this.interval);
                }
            }, 1000);
        });

        this.addedTorrent.on('error', (err)=>{
           console.log("Probleme au niveau du torrent");
           console.log(err);
        });
    }


    render() {
        return (<div>
            <div>
                <span>Téléchargement en cours : {this.state.progression}% (speed={this.state.dSpeed.toFixed(2)} ko/s)</span>
            </div>
            <div>
                <span>Fichiers du torrent: </span>
                <table style={{'margin-left': 'auto', 'margin-right': 'auto'}}>
                    {this.state.files.map(f => (
                        <tr>
                            <td>{f.name}</td>
                            <td>{FormatUtils.formatBytes(f.length)}</td>
                            <td>{f.path}</td>
                            <td>{(f.progress * 100).toFixed(2)}%</td>
                            <td><BoutonPlayPauseTelechargement file={f} playing={false}/></td>
                            <td><BoutonTelechargementFichier file={f}/></td>
                        </tr>
                    ))}
                </table>
                <span>Téléchargement en cours ? : {this.state.torrent && this.state.torrent.done ? 'true' : 'false'}</span>
            </div>
        </div>);
    }
}
