import React from 'react';
import BackGroundImage from './../background.jpg';
import Papa from 'papaparse';


class SeasonsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {seasonList: []}
    }

    componentDidMount(){ 
        this.searchSeason();
    }

    async getData(URL) {
        // create a function that returns a Promise that resolves when papa parse complete is called
        const papaParsePromise = blob => new Promise(resolve => Papa.parse(blob, { complete: resolve }));
        const response = await fetch(URL);
        const blob = await response.blob();
        const data = await papaParsePromise(blob);
        return data;
    };

    async searchSeason() {
        const parsed_data = await this.getData('./matches.csv');
        const matchesData = parsed_data.data;
        // console.log("Reference: "+ matchesData[3]);
        const teams = this.props.teamID;
        for(var j = 0; j < teams.length; ++j){
            for (var i = 0; i < matchesData.length; ++i){
                const matchesDataSplit = matchesData[i];
                if (matchesDataSplit[7] === teams[j]){
                    if(this.state.seasonList.includes(matchesDataSplit[3]) === false){
                        // index 7 = home_api_id
                        await this.setState(prevState => ({ seasonList: prevState.seasonList.concat(matchesDataSplit[3])}));
                    }   
                }
            }
        }
        // console.log(this.state.seasonList);
        this.addOption();
    }

    addOption = () => {
        const season = this.state.seasonList;
        var x = document.getElementById("myDropdown");
        for (var i = 0; i < season.length; ++i){
            var option = document.createElement("option");
            option.text = season[i];
            option.value = season[i];
            x.add(option);
        }
    }

    selectSeason = (event) =>{
        this.props.selectSeason(event.target.value);
    }

    render() {
        return (
        <div className="padded-page FIFA_wrap">
            <center>
            <div id = "SelectTeam" className = "dropdown">
                <h2>Welcome to FIFA Analysis</h2>
                <p>&nbsp;</p>
                <p>League: {this.props.League}</p>
                <p>Team: {this.props.Team}</p>
                <p>Please Select a Season.</p>
                <select id="myDropdown" className="dropdown-content" onChange={this.selectSeason}>
                    <option value="0">Select Season</option>
                </select>
                <p>&nbsp;</p>
                <p style={{fontStyle: "italic"}}>&copy;Version CptS 575 Final Project</p>
            </div>
            </center>
            <img src={BackGroundImage} alt="bg"></img>
        </div>
        );
    }   
}

export default SeasonsPage;