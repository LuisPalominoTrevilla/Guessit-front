import React, { Component } from 'react';

import GuessIt from './GuessIt/GuessIt';
import GStats from './GStats';
import Images from 'app/components/UserImages/Images';
import Profile from './Profile';

import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class Wrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.updateWindowWidth());
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateWindowWidth());
    }

    updateWindowWidth() {
        this.setState({
            width: window.innerWidth
        });
    }
    
    render() {
        return (
            <div className={`main-container ${(this.state.width <= 768) ? 'menu-not-visible' : 'menu-visible'}` }>
                <Route exact path='/' component={GuessIt} />
                <Route path='/g-stats' component={GStats} />
                <Route path='/images' component={Images} />
                <Route path='/profile' component={Profile} />
            </div>
        )
    }
}

export default withRouter(Wrapper);