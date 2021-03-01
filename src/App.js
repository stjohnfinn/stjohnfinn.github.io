import React from 'react';
import Header from './Header';
import About from './About';
import Portfolio from './Portfolio';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div id='app-cont'>
                <Header />
                <Switch>
                    <Route path='/' exact component={About} />
                    <Route path='/projects' exact component={Portfolio} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;