import React from 'react';
import BackGroundImage from './../background.jpg';
import Papa from 'papaparse';
import * as d3 from "d3";
import { timeDay } from 'd3';
import PosAtt from './../Season0809.png';
import WinTrend from './../WinningTrend.png';
import WinRate from './../WinRate_SeasonWise.png';
import AveAtt from './../AveAttemptsSeasonWise.png';
import AvePos from './../AvePosSeasonWise.png';
import WinLoseDraw from './../WinLoseDraw.png';


class ResultDisplayPage extends React.Component {

    constructor(){
        super();
        this.myRef = React.createRef(); 
        this.myRefSum = React.createRef();
        this.myRefScore = React.createRef();
        this.myRefAssist = React.createRef();
        this.myRefWin = React.createRef();
        this.myRefWinLose = React.createRef();
        this.myRefWinLosePlot = React.createRef();
        this.state = {
            gameResult: [],
            gameDate: [],
            winningTrend: [],
            xaxis: [],
            topScorer: [],
            topScore:[],
            topAssister: [],
            topAssist: [],
            homePos: [],
            awayPos: [],
            homeAtt: [],
            awayAtt: [],
            aveHomeAtt: "",
            aveAwayAtt: "",
            aveHomePos: "",
            aveAwayPos: "",
            winRate: [],
            winGames: [],
            loseGames: [],
            drawGames:[],
            wtf: []
        }
        this.dataset = []
    }
    componentDidMount(){ 
        console.log(this.myRef);
        this.readDataBase(); //win trend 
        this.TopScore();
        this.TopAssister();
        this.averageAtt();
        this.averagePos();
    }
    async averageAtt() {
        const parsed_data = await this.getData('./sortDate_matches.csv');
        const matchesData = parsed_data.data;
        // 25 = attempt home 26 away 22 home possesion 23 away possesion
        for (var i = 0; i < matchesData.length; ++i){
            const matchesDataSplit = matchesData[i];
            if(matchesDataSplit[2] == '2008/2009'){
                if (i == 0){
                    continue;
                }
                else{
                    if (matchesDataSplit[6] == 10260){ // MAnchester United home
                        await this.setState(prevState => ({ homeAtt: prevState.homeAtt.concat(matchesDataSplit[25])}));
                    }
                    else {
                        await this.setState(prevState => ({ awayAtt: prevState.awayAtt.concat(matchesDataSplit[26])}));
                    }
                }
            }
        }
        console.log(this.state.homeAtt,this.state.awayAtt)
        var len = this.state.homeAtt.length;
        var aveHomeAtt = d3.sum(this.state.homeAtt)/len;
        var len1 = this.state.awayAtt.length;
        var aveAwayAtt = d3.sum(this.state.awayAtt)/ len1;
        aveHomeAtt = aveHomeAtt.toFixed(2);
        aveAwayAtt = aveAwayAtt.toFixed(2);
        const d3TextHomeAtt= d3.select(this.myRefSum.current)
                    .append("h4");
        d3TextHomeAtt.text("Average attempts as home team: ").style('font-size','20px')
                    .append("h3")
                    .text(aveHomeAtt).style('font-size','25px').style('font-style', 'italic')
                    .append('p');

        const d3TextAwayAtt= d3.select(this.myRefSum.current)
                    .append("h4");
        d3TextAwayAtt.text("Average attempts as away team: ").style('font-size','20px')
                    .append("h3")
                    .text(aveAwayAtt).style('font-size','25px').style('font-style', 'italic')
                    .append('p');
    }
    async averagePos() {
        const parsed_data = await this.getData('./sortDate_matches.csv');
        const matchesData = parsed_data.data;
        // 25 = attempt home 26 away 22 home possesion 23 away possesion
        for (var i = 0; i < matchesData.length; ++i){
            const matchesDataSplit = matchesData[i];
            if(matchesDataSplit[2] == '2008/2009'){
                if (i == 0){
                    continue;
                }
                else{
                    if (matchesDataSplit[6] == 10260){ // MAnchester United home
                        await this.setState(prevState => ({ homePos: prevState.homePos.concat(matchesDataSplit[22])}));
                    }
                    else {
                        await this.setState(prevState => ({ awayPos: prevState.awayPos.concat(matchesDataSplit[23])}));
                    }
                }
            }
        }
        var len = this.state.homePos.length;
        var aveHomePos = d3.sum(this.state.homePos)/len-1;
        var len1 = this.state.awayPos.length;
        var aveAwayPos = d3.sum(this.state.awayPos)/ len1;
        aveHomePos = aveHomePos.toFixed(2);
        aveAwayPos = aveAwayPos.toFixed(2);
        const d3TextHomePos= d3.select(this.myRefSum.current)
                    .append("h4");
        d3TextHomePos.text("Average possession as home team: ").style('font-size','20px')
                    .append("h3")
                    .text(aveHomePos).style('font-size','25px')
                    .append('p');

        const d3TextAwayPos= d3.select(this.myRefSum.current)
                    .append("h4");
        d3TextAwayPos.text("Average possession as away team: ").style('font-size','20px')
                    .append("h3")
                    .text(aveAwayPos).style('font-size','25px')
                    .append('p');
    }
    async getData(URL) {
        // create a function that returns a Promise that resolves when papa parse complete is called
        const papaParsePromise = blob => new Promise(resolve => Papa.parse(blob, { complete: resolve }));
        const response = await fetch(URL);
        const blob = await response.blob();
        const data = await papaParsePromise(blob);
        return data;
    };
    async TopScore() {
        const parsed_data = await this.getData('./Top_Score.csv');
        const scoreData = parsed_data.data;
        var name = "";
        var score = 0;
        for(var i = 0; i < 4; ++i){
            const scoreDataSplit = scoreData[i];
            // if (i != 0){
                score = scoreDataSplit[3];
                name = scoreDataSplit[2];
                await this.setState(prevState => ({ topScorer: prevState.topScorer.concat(name)}));
                await this.setState(prevState => ({ topScore: prevState.topScore.concat(score)}));
            // }
        }
        // console.log("Top scorer: " + name + "with score: " + score);
        console.log(this.state.topScorer,this.state.topScore)
        var TopScore = d3.select(this.myRefScore.current)

        TopScore.append('table')
                .append("thead")        
        TopScore.append('tr').append('th').text("Top Scorer").style("font-size", "20px")

        TopScore.append("tbody")
        TopScore.append('tr').append('td').text("----------------------").style("font-size", "20px")
        TopScore.append('tr').append('td').text(this.state.topScorer[1]+ " : "+ this.state.topScore[1]).style("font-style", "italic").style("font-size", "25px")
        TopScore.append('tr').append('td').text(this.state.topScorer[2]+ " : "+ this.state.topScore[2]).style("font-size", "20px")
        TopScore.append('tr').append('td').text(this.state.topScorer[3]+ " : "+ this.state.topScore[3]).style("font-size", "20px")
    }
    async TopAssister() {
        const parsed_data = await this.getData('./Top_Assist.csv');
        const assistData = parsed_data.data;
        var name = "";
        var score = 0;
        for(var i = 0; i < 4; ++i){
            const assistDataSplit = assistData[i];
            // if (i != 0){
                score = assistDataSplit[4];
                name = assistDataSplit[2];
                await this.setState(prevState => ({ topAssister: prevState.topAssister.concat(name)}));
                await this.setState(prevState => ({ topAssist: prevState.topAssist.concat(score)}));
            // }
        }

        var TopAssist = d3.select(this.myRefAssist.current)
                            
        TopAssist.append('table')
                .append("thead")        
        TopAssist.append('tr').append('th').text("Top Assister").style("font-size", "20px")

        TopAssist.append("tbody")
        TopAssist.append('tr').append('td').text("----------------------").style("font-size", "20px")
        TopAssist.append('tr').append('td').text(this.state.topAssister[1]+ " : "+ this.state.topAssist[1]).style("font-style", "italic").style("font-size", "25px")
        TopAssist.append('tr').append('td').text(this.state.topAssister[2]+ " : "+ this.state.topAssist[2]).style("font-size", "20px")
        TopAssist.append('tr').append('td').text(this.state.topAssister[3]+ " : "+ this.state.topAssist[3]).style("font-size", "20px")
    }
    async winRateSeasonWise(Data) {
        // const data = Data;
        // var wincounter = 0;
        // var losecounter = 0;
        // var drawcounter = 0;
        // var seasoncounter = 0;
        // const seasons = ['2008/2009','2009/2010','2010/2011','2011/2012','2012/2013','2013/2014','2014/2015','2015/2016']
        // for (var s = 0; s < seasons.length; ++s){
        //     const season = seasons[s];
        //     for (var d = 0; d < data.length; ++d){
        //         const split = data[d];
        //         if(split[2] === season){
        //             seasoncounter++;
        //             console.log(split[6],split[7])
        //             var checkteam = split[6] - 10260
        //             if (checkteam == 0){ // home team
        //                 var score = split[8]-split[9]
        //                 if (score > 0){
        //                     wincounter++;
        //                 }
        //                 else if(score == 0){
        //                     drawcounter++;
        //                 }
        //                 else{
        //                     losecounter++;
        //                 }
        //             }
        //             else{
        //                 var score = split[8]-split[9]
        //                 if(score > 0){
        //                     wincounter++;
        //                 }
        //                 else if(score == 0){
        //                     drawcounter++;
        //                 }
        //                 else{
        //                     losecounter++;
        //                 }
        //             }
        //         }
        //     }
        //     await this.setState(prevState => ({ loseGames: prevState.loseGames.concat(losecounter)}));
        //     await this.setState(prevState => ({ drawGames: prevState.drawGames.concat(drawcounter)}));
        //     await this.setState(prevState => ({ winGames: prevState.winGames.concat(wincounter)}));
        //     var winrate = wincounter/seasoncounter * 100;
        //     console.log(this.state.winGames,this.state.drawGames,this.state.loseGames, seasoncounter);
        //     seasoncounter = 0;
        //     wincounter = 0;
        //     losecounter = 0;
        //     drawcounter = 0;
        //     console.log(winrate)
        //     await this.setState(prevState => ({ winRate: prevState.winRate.concat(winrate)}));
        //     console.log(this.state.winRate)
        // }
        // 
        const parsed_data = await this.getData('./wld.csv');
        const seasonInfo = parsed_data.data;
        const win_lose_draw = seasonInfo[1]
        var WinLose = d3.select(this.myRefWinLose.current)
        WinLose.append('table')
                .append("thead")        
        WinLose.append('tr').append('th').text("Games").style("font-size", "20px")

        WinLose.append("tbody")
        WinLose.append('tr').append('td').text("----------------------").style("font-size", "20px")
        WinLose.append('tr').append('td').text("Win: " + win_lose_draw[0]).style("font-style", "italic").style("font-size", "25px")
        WinLose.append('tr').append('td').text("Draw: " + win_lose_draw[2]).style("font-style", "italic").style("font-size", "25px")
        WinLose.append('tr').append('td').text("Lose: " + win_lose_draw[1]).style("font-style", "italic").style("font-size", "25px")
    }
    async readDataBase() {
        const season = this.props.season;
        const parsed_data = await this.getData('./sortDate_matches.csv');
        const matchesData = parsed_data.data;
        for(var i = 0; i < matchesData.length; ++i){
            const matchesDataSplit = matchesData[i];
            if (matchesDataSplit[2] === season){
                const parseTime = d3.timeParse('%Y-%m-%d %I:%M:%S'); // parse time
                const time = parseTime(matchesDataSplit[4])
                const timeFormat = d3.timeFormat('%Y-%m-%d')
                const normalDate = timeFormat(time);
                await this.setState(prevState => ({ gameDate: prevState.gameDate.concat(normalDate)}));
                if (matchesDataSplit[6] === 10260){ // home team
                    await this.setState(prevState => ({ gameResult: prevState.gameResult.concat(matchesDataSplit[24])}));
                }
                else{
                    await this.setState(prevState => ({ gameResult: prevState.gameResult.concat(matchesDataSplit[24]*-1)}));
                }
            }
        }
        this.winRateSeasonWise(matchesData);
        //////////////////////////////
        // Calculate winning trend 
        /////////////////////////////
        for (var j = 0; j < this.state.gameResult.length; ++j){
            const score = this.state.gameResult[j];
            if (score < 0){ // losing 
                if(this.state.winningTrend.length === 0){
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(0)}));
                }
                else{
                    const prev = this.state.winningTrend[j-1];
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(prev+0)}));
                }
                await this.setState(prevState => ({xaxis: prevState.xaxis.concat(j)}));
            }
            else if (score > 0){ 
                if(this.state.winningTrend.length === 0){
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(3)}));
                }
                else{
                    const prev = this.state.winningTrend[j-1];
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(prev+3)}));
                }
                await this.setState(prevState => ({xaxis: prevState.xaxis.concat(j)}));
            }
            else{
                if(this.state.winningTrend.length === 0){
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(1)}));
                }
                else{
                    const prev = this.state.winningTrend[j-1];
                    await this.setState(prevState => ({winningTrend: prevState.winningTrend.concat(prev+1)}));
                }
                await this.setState(prevState => ({xaxis: prevState.xaxis.concat(j)}));
            }
        }
        // console.log(matchesData);
        console.log(this.state.gameDate, this.state.winningTrend);
        this.setDataSet();
        // this.displayD3();
    }
    async setDataSet(){
        var X = {};
        var Y = [];
        for (var i = 0; i < this.state.gameDate.length; ++i){
            X[i] = {'date': this.state.gameDate[i], 'trend': this.state.winningTrend[i]}
        }
        await this.setState({dataset: X});
    }

    render() {
        return (
        <div className="padded-page">
            <center>
            <div id = "SelectLeague" className = "dropdown FIFA_wrap">
                <h3>Result</h3>
                {/* <p style={{fontStyle: "italic"}}>Version CptS 575 Final Project</p> */}
                {/* <img src={BackGroundImage} alt="bg"></img> */}
            </div>
            <div ref={this.myRefScore}></div>
            <div ref={this.myRefAssist}><p></p><p></p></div>
            <div>
                <h4>------------------------------------------------</h4>
                <h4>Season Winning Trend in Season 2008/2009</h4>
                <img src={WinTrend} alt="WinTrend"></img>
            </div>
            <div ref={this.myRefWinLose}></div>
            <div ref={this.myRefWinLosePlot}>
                <img src={WinLoseDraw} alt="WinLoseDraw"></img>
            </div>
            <div>
                <h4>------------------------------------------------</h4>
                <h4>Average Possession and Attempts in Season 2008/2009</h4>
                <img src={PosAtt} alt="WPosAtt"></img>
            </div>
            <div ref={this.myRefSum}></div>
            <div ref={this.myRefWin}></div>
            <div>
                <h4>------------------------------------------------</h4>
                <h4>Season-wise Win Rate</h4>
                <img src={WinRate} alt="WinRate"></img>
                <h4>Season-wise Average Attempts</h4>
                <img src={AveAtt} alt="AveAtt"></img>
                <h4>Season-wise Average Possession</h4>
                <img src={AvePos} alt="AvePos"></img>
            </div>
            <p></p>
            <p></p>
            <p style={{fontStyle: "italic"}}>&copy;Version CptS 575 Final Project</p>
            </center>
        </div>
        );
    }   
}

export default ResultDisplayPage;