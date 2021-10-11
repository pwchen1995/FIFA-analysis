import React from 'react';
import BackGroundImage from './../background.jpg';
import Papa from 'papaparse';
import fs from 'fs';
import { thresholdScott } from 'd3';


class TeamsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {LeagueID: this.props.LeagueID,
                      TeamID: [],
                      TeamName:[],
                      NoDuplicate: true}
    }

    componentDidMount(){ 
        this.searchTeamID();
    }

    // const data_url = "acdata.csv";
    async getData(URL) {
        // create a function that returns a Promise that resolves when papa parse complete is called
        const papaParsePromise = blob => new Promise(resolve => Papa.parse(blob, { complete: resolve }));
        const response = await fetch(URL);
        const blob = await response.blob();
        const data = await papaParsePromise(blob);
        return data;
    };

    async searchTeamID() {
        const parsed_data = await this.getData('./matches.csv');
        const matchesData = parsed_data.data;
        console.log("Reference: "+ matchesData[3]);
        const leagueID = this.props.LeagueID;
        for (var i = 0; i < matchesData.length; ++i){
            const matchesDataSplit = matchesData[i];
            if (matchesDataSplit[1] === leagueID){
                if(this.state.TeamID.includes(matchesDataSplit[7]) === false){
                    // index 7 = home_api_id
                    await this.setState(prevState => ({ TeamID: prevState.TeamID.concat(matchesDataSplit[7])}));
                }   
            }
        }
        console.log("Team ID list: " + this.state.TeamID);
        this.props.handleTeam(this.state.TeamID);
        this.convertTeamName()
    }

    async convertTeamName(){
        const team = this.state.TeamID;
        const parsed_data = await this.getData('./teams.csv');
        const teamsData = parsed_data.data;
        // var j = 0;
        // console.log(teamsData);
        for (var j = 0; j < team.length; ++j){
            for (var i = 0; i < teamsData.length; ++i){
                const teamsDataSplit = teamsData[i]
                if(teamsDataSplit[2] === team[j]){
                    await this.setState(prevState => ({ TeamName: prevState.TeamName.concat(teamsDataSplit[4])}));
                }
            }
        }
        this.addOption()
        // console.log("Team ID length: " + team.length + " Team Name length: " + this.state.TeamName.length);
        // console.log(this.state.TeamName);
    }

    addOption = () => {
        const team = this.state.TeamName;
        var x = document.getElementById("myDropdown");
        for (var i = 0; i < team.length; ++i){
            var option = document.createElement("option");
            option.text = team[i];
            option.value = team[i];
            x.add(option);
        }
    }

    selectTeam = (event) =>{
        this.props.selectTeam(event.target.value);
    }

    render() {
        return (
        <div className="padded-page FIFA_wrap">
            <center>
            <div id = "SelectTeam" className = "dropdown">
                <h2>Welcome to FIFA Analysis</h2>
                <p>&nbsp;</p>
                <p>League: {this.props.League}</p>
                <p>Please Select a Team.</p>
                <p>&nbsp;</p>
                <select id="myDropdown" className="dropdown-content" onChange={this.selectTeam}>
                    <option value="0">Select Team</option>
                </select>
                {/* <img src={BackGroundImage} alt="bg"></img> */}
                <p>&nbsp;</p>
                <p style={{fontStyle: "italic"}}>&copy;Version CptS 575 Final Project</p>
            </div>
            </center>
            <img src={BackGroundImage} alt="bg"></img>
        </div>
        );
    }   
}

export default TeamsPage;