import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authenticate from '../../authprovider/Authenticate'

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    signIn() {
        const authenticate = new Authenticate();
        authenticate.signin(() => this.props.history.push('/editor'));
    }
    render() {
        return (
            <div className="SidebarElement">
                <div className="sidebar_title">GITHUB</div>
                <div className="signin_git_button" onClick={() => this.signIn()}>
                    <i className="fab fa-github" style={{width: '18px', height: '18px', paddingRight: '5px'}}></i>
                    <span>Sign in with GitHub</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Github);