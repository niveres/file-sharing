import React, {Component} from 'react';

/** Classe générant un bouton permettant de lancer ou mettre en pause le téléchargement d'un fichier */
export class BoutonPlayPauseTelechargement extends Component {

    constructor(props) {
        super(props);
        this.state = {playing:this.props.playing};
    }

    /** Gestion du click du bouton play */
    play = () => {
        this.props.file.select();
        this.setState({playing:true});
    };

    /** Gestion du click du bouton pause */
    pause = () => {
        this.props.file.deselect();
        this.setState({playing:false});
    }

    render() {
        return (
            this.props.file.progress<1 ?
            <div >
                <button type="button" onClick={this.play} disabled={this.state.playing}>Play</button>
                <button type="button" onClick={this.pause} disabled={!this.state.playing}>Pause</button>
            </div>:null);
    }
}

