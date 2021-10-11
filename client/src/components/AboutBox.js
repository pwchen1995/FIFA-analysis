import React from 'react';

class AboutBox extends React.Component {

    render() {
      return(
        <div id="aboutModal" className="modal" role="dialog">
            <div className="modal-content" style={{background: '#fff'}}>
                <div className="modal-header">
                    <center>
                    <h3 className="modal-title"><b>About FIFA Analyzer</b></h3>
                    </center>
                    <button id="modalClose" className="close"
                        style={{border: '2px solid black',
                        backgroundColor: 'black', color: 'white'}} onClick={()=>this.props.closeAbout()}>
                        &times;</button>
                    
                </div>
                <div className="modal-body">
                    <center>
                    <img
                    src="https://drive.google.com/thumbnail?id=1g3U71ZzJcVr03APIEt1bVcY3VakgdBPN"
                    alt = "Ph" height="300" width="300"></img>
                    <h3>FIFA Analytics Based Application</h3>
                    <p style={{fontStyle:'italic'}}>Version CptS 575 Final Project, Build 27.11.2020 &copy; 2020-20 The Students of Data Science. All rights.
                    </p>
                    </center>
                    <p>FIFA Analyzer apps support</p>
                    <ul>
                    <li>Analyzing player ability &reg;</li>
                    <li>Analyzing team philosophy &reg;</li>
                    <li>Visulize data analysis &reg;</li>
                    </ul>
                    <p>FIFA Analyzer was first developed by Ping-Wen Chen, Yize Hu, Pinak Bhalerao,
                    students of computer science at Washington State University.</p>
                </div>
                <div className="modal-footer">
                        <button id="aboutOK" className="close" style={{border: '2px solid black', padding: '4px',
                         backgroundColor: 'black' , color: 'white'}} onClick={()=>this.props.closeAbout()}>
                        OK</button>
                </div>
            </div>
        </div>
      );
    }
}

export default AboutBox;