import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import AppMode from "./../AppMode.js"
import LeaguePage from './LeaguePage.js';
import TeamsPage from './TeamsPage.js';
import AboutBox from './AboutBox.js';
import SeasonsPage from './SeasonsPage.js';
import Analyze from './Analyze.js';
import ResultDisplayPage from './ReultDisplay.js';
import { CSVReader } from 'react-papaparse';
import Papa from 'papaparse';
import * as d3 from "d3";
import { thresholdScott } from 'd3';
 
// import LeaguesFile from './../leagues.csv'
var LeaguesFile = './leagues.csv';

// var LeaguePath = './../leagues.csv';
// var LeagueFile = 'leagues.csv';
// var LeagueURL = LeaguePath + LeagueFile;

const modeTitle = {};
modeTitle[AppMode.LEAGUE] = "FIFA Analysis";
modeTitle[AppMode.TEAMS] = "FIFA Analysis";
modeTitle[AppMode.SEASONS] = "FIFA Analysis";

const modeToPage = {};
modeToPage[AppMode.LEAGUE] = LeaguePage;
modeToPage[AppMode.TEAMS] = TeamsPage;
modeToPage[AppMode.SEASONS] = TeamsPage;

class App extends React.Component {

  constructor() {
    super();
    // this.getData = this.getData.bind(this);
    this.state = {mode: AppMode.LEAGUE,
                  menuOpen: false,
                  showAbout: false,
                  showResults: false,
                  selectedLeague: true,
                  League: "",
                  selectedTeam: false,
                  Team: "",
                  selectedSeason: false,
                  Season: "",
                  Analyze: false,
                  data: [],
                  leagueID: "", //selected league ID will later be used for searching team
                  teamID:[]};
  }
  componentDidMount() {
  }
  
  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  closeAboutDialog = () =>{
    this.setState({showAbout: false});
  }
  showAboutDialog = () => {
    this.setState({showAbout: true});
  }

  ///////////////////////////////////////////////////
  // SELECT league and retrieve league ID. 
  // Then query through matches table to find team ID
  ///////////////////////////////////////////////////
  selectLeague = (league) =>{
    this.setState({selectedLeague: false});
    this.setState({selectedTeam: true});
    this.setState({League: league});
    //alert("League Selected");
    this.queryThroughLeague(league);
    console.log("League Selected: " + league)
  }
  // Find the league ID and set state's ID
  queryThroughLeague = async (league) =>{
    const data = Papa.parse(await fetchCsv());
    const leagueData = data.data;
    // console.log(leagueData);
    
    async function fetchCsv() {
        const response = await fetch('./leagues.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result.value);
        // console.log('csv', csv);
        return csv;
    }

    for(var i = 0; i < leagueData.length; ++i){
      const leagueDataSplit = leagueData[i]
      if(leagueDataSplit[2] === league){
        await this.setState({leagueID: leagueDataSplit[0]});
        console.log(leagueDataSplit[0], this.state.leagueID);
      }
    }
  }


  ///////////////////////////////////////////////////
  // SELECT league and retrieve league ID. 
  // Then query through matches table to find team ID
  ///////////////////////////////////////////////////
  selectTeam = (team) =>{
    this.setState({selectedTeam: false});
    this.setState({selectedSeason: true});
    this.setState({Team: team});
    //alert("League Selected");
    // this.queryThroughTeam(Team);
    console.log("Team Selected: " + team)
  }
  handleTeam = async(team) => {
    console.log("App.js receive " + team);
    await this.setState({teamID: team});
  }
  selectSeason = (season) =>{
    this.setState({selectedSeason: false});
    this.setState({Analyze: true});
    this.setState({Season: season});
    //alert("League Selected");
    console.log("Season Selected: " + season)
  }
  showResults = () =>{
    this.setState({showResults: true});
    this.setState({Analyze: false});
  }
  


read_file = () =>{
  d3.csv(LeaguesFile, function(data) {
    // var newdata = JSON.stringify(data);
    // console.log(JSON.stringify(data));
    // console.log(data.name);
  });
}
// d3.csv(dataUrl, function(data){
//   console.table(data); //用table的方式在console呈現json
//   d3.select('.demo').text(JSON.stringify(data)) //把json寫到.demo上
// });

  render() {
    // const ModePage = modeToPage[this.state.mode];
    this.read_file()
    return (
      <div>
        {this.state.showAbout === true? <AboutBox closeAbout={this.closeAboutDialog}/>: null}
        <NavBar 
          title={modeTitle[this.state.mode]} 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}
          showAbout={this.showAboutDialog}/>
          <SideMenu 
            menuOpen = {this.state.menuOpen}
            mode={this.state.mode}
            toggleMenuOpen={this.toggleMenuOpen}
            showAbout={this.showAboutDialog}/>
          {this.state.selectedLeague === true ? 
          <LeaguePage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          selectLeague={this.selectLeague}
          changeMode={this.handleChangeMode}/>:null}
          {this.state.selectedTeam === true ?
          <TeamsPage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          selectTeam={this.selectTeam}
          handleTeam={this.handleTeam}
          League={this.state.League}
          LeagueID={this.state.leagueID}
          changeMode={this.handleChangeMode}/>:null}
          {this.state.selectedSeason === true ? 
          <SeasonsPage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          selectSeason={this.selectSeason}
          League={this.state.League}
          Team={this.state.Team}
          teamID={this.state.teamID}
          changeMode={this.handleChangeMode}/>: null}
          {this.state.Analyze === true ? 
          <Analyze
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          selectSeason={this.selectSeason}
          League={this.state.League}
          Team={this.state.Team}
          Season={this.state.Season}
          showResults={this.showResults}
          changeMode={this.handleChangeMode}/>: null}
          {this.state.showResults === true ? 
          <ResultDisplayPage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          season={this.state.Season}
          changeMode={this.handleChangeMode}/>:null}
          {/* <ModePage 
            menuOpen={this.state.menuOpen}
            mode={this.state.mode}
            selectLeague={this.selectLeague}
            changeMode={this.handleChangeMode}/> */}
        </div>
        
    );  
  }
}

export default App;