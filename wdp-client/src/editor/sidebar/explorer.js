import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
class Explorer extends Component {
    getExplorer() {
        alert("hello");
    }
    render() {
        return (
            <div style={{textAlign: 'center',width: '200px',height: '100%', margin: '10px auto', color: '#f0f0f0', fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif', fontWeight: '600'}}>
                EXPLORER
            </div>
        );
    }
}

export default Explorer;