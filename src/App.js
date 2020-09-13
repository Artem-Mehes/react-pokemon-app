import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { navItems } from './shared/navigationItems';
import Navigation from './components/Navigation';
import PokemonsList from './components/PokemonsList';
import PokemonDetails from './components/PokemonDetails';

const App = () => {
    return (
        <>
            <Router basename='/'>
                <header className="header">
                    <h1 className="header__heading">Pokemon App</h1>
                    <Navigation navItems={navItems} />
                </header>

                <main className="main">
                    <Switch>
                        <Route exact path="/" component={PokemonsList} />
                        <Route exact path="/details" component={PokemonDetails} />
                        <Route path="/details/:id" component={PokemonDetails} />
                    </Switch>
                </main>
            </Router>
        </>
    );
};

export default App;
