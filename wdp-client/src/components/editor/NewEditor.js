import React from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import Console from './Console';
import contentFlow from './../../service/content.service';
import axios from 'axios';
import Loading from '../loading/Loading';

class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      language: "javascript",
      isEditorReady: true,
      content: localStorage.getItem('content'),
      loading : false
    }
  }


  componentDidMount(){
    this.contentFlowSub = contentFlow.subscribe((value)=>{
      let realCode ;
      this.setState({loading : true})
      axios.post('http://localhost:8080/git/get-file-content', {accessToken : localStorage.accessToken, content : value}).then(res => {
        realCode = res.data.content;
        this.setState({ content: realCode, loading : false});
      }).catch(err => {
        console.log(err);
      })
    });
  }

  componentWillUnmount() {
    if (this.contentFlowSub) {
      this.contentFlowSub.unsubscribe();
      this.contentFlowSub = null;
    }
  }


  handleEditorDidMount() {
    this.setState.isEditorReady = true;
  }

  handleEditorChange = (ev, value) => {
    this.setState({ code: value });
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        height: '100%', width: '100%'
      }}>
        <div className="playground">
        {/* {this.state.loading && <Loading />} */}
          <ControlledEditor
            height="100%"
            width="100%"
            theme={this.state.theme}
            language={this.state.language}
            loading={<Loading size='20'/>}
            editorDidMount={this.handleEditorDidMount.bind(this)}
            onChange={this.handleEditorChange.bind(this)}
            value={this.state.content}
          />
        </div>
        <div className="resizer"></div>
        <div className="result">
          <div className="url_navigation">
            <i className="fas fa-globe-asia" style={{color: 'gray', width: '15px', height: '15px', paddingRight: '5px'}}></i>
            <input defaultValue="localhost:8080/index.html" style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#0f0f0f', borderStyle: 'none', outline: 'none'}} />
          </div>
          <iframe srcDoc={this.state.code} className="iframe" title="Result" id="iframe"></iframe>
          <Console />
        </div>
      </div>
    );
  }

}

export default NewEditor;