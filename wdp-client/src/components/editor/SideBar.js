import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Explorer from './sidebar/Explorer';
import Github from './sidebar/Github';
import './css/sidebar.css';
import axios from 'axios';

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: "explorer"
        }
    }
    setActiveItem = (name) => {
        this.setState({
            ...this.setState,
            activeItem: name
        })
    }
    explorer() {
        var x = document.getElementById("explorer");
        if (this.state.activeItem !== "explorer") {
            this.setActiveItem("explorer");
            x.className += " open";
            document.getElementById("github").className = "icon";
        }
        else {
            this.setActiveItem("none");
            x.className = "icon";
        }
    }
    github() {
        var x = document.getElementById("github");
        if (this.state.activeItem !== "github") {
            this.setActiveItem("github");
            x.className += " open";
            document.getElementById("explorer").className = "icon";
        }
        else {
            this.setActiveItem("none");
            x.className = "icon";
        }
    }

    render() {
        let username = localStorage.getItem('username');
        let projectName = localStorage.getItem('projectName');
        let downloadURL = "https://github.com/" + username + "/" + projectName + "/archive/master.zip";
        return (
            <div className="sidebar">
                <div className="sbar_icons">
                    <div className="icon open" id="explorer" title="Explorer" onClick = {() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="github" title="GitHub" onClick = {() => this.github()}>
                        <i className="fas fa-code-branch" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <a  href = {downloadURL}>
                        <div className="icon" id="export" title="Export">
                            <i className="fas fa-download" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                        </div>
                    </a>
                </div>
                <div className="sbar_content">
                    {this.state.activeItem === "explorer" && <Explorer />}
                    {this.state.activeItem === "github" && <Github />}
                </div>
            </div>
        );
    }
}

export default withRouter(SideBar);