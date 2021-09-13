import React, {Component} from 'react';

/** Classe générant un bouton permettant le téléchargement d'un fichier */
export class BoutonTelechargementFichier extends Component {
    /** Gestion du click du bouton téléchargement */
    handleClick = () => {
        // Récupération du l'URL du fichier
        this.props.file.getBlobURL((err, url) => {
            // En cas d'erreur ! :(
            if (err) throw err;
            // Lancement du téléchargement (utilisation de la lib file-saver)
            require('file-saver').saveAs(url, this.props.file.name);
        });
    };

    render() {
        // Affichage du bouton désactivé ou non en fonction de l'état de téléchargement du fichier
        let button;
        if (this.props.file && this.props.file.progress === 1) {
            button = <button type="button" onClick={this.handleClick}>Télécharger !</button>;
        } else {
            button = <button type="button" disabled={true}>Télécharger!</button>;
        }
        return (button);
    }
}

