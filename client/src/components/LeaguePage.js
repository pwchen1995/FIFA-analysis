import React from 'react';
import BackGroundImage from './../background.jpg';


class LeaguePage extends React.Component {

    constructor(){
        super();
        this.state = {League:""}
    }
    selectLeague = (event) =>{
        this.props.selectLeague(event.target.value);
    }

    render() {
        return (
        <div className="padded-page FIFA_wrap">
            <center>
            <div id = "SelectLeague" className = "dropdown" onChange ={this.selectLeague}>
                <h2>Welcome to FIFA Analysis</h2>
                <p>&nbsp;</p>
                <p>Please Select a League.</p>
                <select id="myDropdown" className="dropdown-content">
                    <option value="0">Select League</option>
                    <option value="Belgium Jupiler League">Belgium Jupiler League</option>
                    <option value="England Premier League">England Premier League</option>
                    <option value="France Ligue 1">France Ligue 1</option>
                    <option value="Germany 1. Bundesliga">Germany 1. Bundesliga</option>
                    <option value="Italy Serie A">Italy Serie A</option>
                    <option value="Netherlands Eredivisie">Netherlands Eredivisie</option>
                    <option value="Poland Ekstraklasa">Poland Ekstraklasa</option>
                    <option value="Portugal Liga ZON Sagres">Portugal Liga ZON Sagres</option>
                    <option value="Scotland Premier League">Scotland Premier League</option>
                    <option value="Spain LIGA BBVA">Spain LIGA BBVA</option>
                    <option value="Switzerland Super League">Switzerland Super League</option>
                </select>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p style={{fontStyle: "italic"}}>&copy;Version CptS 575 Final Project</p>
            </div>
            </center>
            <img src={BackGroundImage} alt="bg"></img>

        </div>
        );
    }   
}

export default LeaguePage;