import React, {Component} from 'react';
import FirebaseService from "./services/FirebaseService";

export class TestParams extends Component {

    componentDidMount() {
        FirebaseService.getAll().on('value', this.recuperationDesDonnes);
        FirebaseService.getOne('t1').on('value', this.recuperationUneDonnee);
    }

    recuperationDesDonnes(donnees) {
        console.log("Recuperation de toutes les données: "+JSON.stringify(donnees));
    }

    recuperationUneDonnee(donnee) {
        console.log("Recuperation d'une donnée: "+JSON.stringify(donnee));
    }

    render() {
        return (
            <div>
                <p>Donnée passée en paramètre : {this.props.match.params.toto}</p>
            </div>
        );
    }
}
