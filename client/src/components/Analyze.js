import React from 'react';
import BackGroundImage from './../background.jpg';


class AnalyzePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            league:"",
            team:"",
            season:"",
            loginBtnIcon: "fa fa-sign-in",
            loginBtnLabel: "Start Analyze",
        }
    }
    componentDidMount() {

    }

    handleLoginSubmit = async (event) => {
        event.preventDefault();
        this.setState({loginBtnIcon: "fa fa-spin fa-spinner",
                       loginBtnLabel: "Analyzing..."});
        setTimeout(()=>this.props.showResults(),3000);
    }

    render() {
        return (
        <div className="padded-page FIFA_wrap">
            <center>
            <form id="loginInterface" onSubmit={this.handleLoginSubmit}>
            <div id = "SelectLeague" className = "dropdown" onChange ={this.selectLeague}>
                <h2>Welcome to FIFA Analysis</h2>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Analyze team {this.props.Team} at season {this.props.Season}</p>
                <p>League: {this.props.League}</p>
                <p>Team: {this.props.Team}</p>
                <p>Season: {this.props.Season}</p>
                <button
                    type="submit"
                    className="btn-color-theme btn btn-primary btn-block">
                    <span id="login-btn-icon" className={this.state.loginBtnIcon}/>
                    &nbsp;{this.state.loginBtnLabel}
                </button>
                <p>&nbsp;</p>
                <p style={{fontStyle: "italic"}}>&copy;Version CptS 575 Final Project</p>
            </div>
            </form>
            </center>
            <img src={BackGroundImage} alt="bg"></img>
        </div>
        );
    }   
}

export default AnalyzePage;