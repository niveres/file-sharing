import logo from './logo.svg';
import './App.scss';
import TorrentList from './TorrentList';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {AfficherEtTelechargerTorrent} from './components/AfficherEtTelechargerTorrent';
import {TestParams} from './TestParams';
import {UploadAndSeed} from './components/UploadAndSeed';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/download">Download</Link></li>
                            <li><Link to="/upload">Upload</Link></li>
                            <li><Link to="/users/1321549879-3213465987-1321654-51dqdadaz-ad-aa-zda-d">URL avec path parametre</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/download">
                            <AfficherEtTelechargerTorrent aa="aa" bb={1 + 2}/>
                        </Route>
                        <Route path="/upload">
                            <UploadAndSeed/>
                        </Route>
                        <Route path="/users/:toto" component={TestParams}/>
                        <Route path="/">
                            <TorrentList/>
                        </Route>
                        {/*Redirection de toutes les autres routes vers l'accueil*/}
                        <Route path="*" to="/"/>
                    </Switch>
                </div>
            </Router>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        </div>
    );
}

export default App;
