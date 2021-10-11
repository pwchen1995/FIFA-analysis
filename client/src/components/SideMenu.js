import React from 'react';
import AppMode from './../AppMode.js'

class SideMenu extends React.Component {

constructor() {
  super();
  this.state = {showEditAccountDialog: false,
                UserData: "",
                picURL: ""};
}
//renderModeItems -- Renders correct subset of mode menu items based on
//current mode, which is stored in this.prop.mode. Uses switch statement to
//determine mode.

componentDidMount() {
  setInterval(this.getData, 1000);
}
getData = () =>{
  let data = JSON.parse(localStorage.getItem(this.props.userId));
  if (data != null){
    this.setState({UserData: data});
    if (this.state.UserData.profilePicDataURL === ""){
      this.setState({picURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg"});
    }
    else{
      this.setState({picURL: this.state.UserData.profilePicDataURL});
    }
  } 
}

handleChangeMode = (newMode) => {
  this.setState({mode: newMode});
}
renderModeMenuItems = () => {
  switch (this.props.mode) {
    case AppMode.FEED:
      return(
        <div>
        <a className="sidemenu-item">
            <span className="fa fa-users"></span>&nbsp;Followed Users</a>
        <a className="sidemenu-item ">
            <span className="fa fa-search"></span>&nbsp;Search Feed</a>
        </div>
      );
    break;
    case AppMode.ROUNDS:
      return(
        <div>
          <a className="sidemenu-item">
            <span className="fa fa-plus"></span>&nbsp;Log New Round</a>
          <a className="sidemenu-item">
            <span className="fa fa-search"></span>&nbsp;Search Rounds</a>
        </div>
      );
    break;
    case AppMode.COURSES:
      return(
        <div>
        <a className="sidemenu-item">
            <span className="fa fa-plus"></span>&nbsp;Add a Course</a>
        <a className="sidemenu-item">
            <span className="fa fa-search"></span>&nbsp;Search Courses</a>
        </div>
      );
    default:
        return null;
    }
}

    render() {
       return (
        <div className={"sidemenu " + (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")}
             onClick={this.props.toggleMenuOpen}>
          {/* SIDE MENU TITLE */}
          {/* <div className="sidemenu-title">
              <img src={this.state.picURL} height='60' width='60' />
              <span id="userID" className="sidemenu-userID">&nbsp;{this.state.UserData.displayName}</span>
          </div> */}
          {/* MENU CONTENT */}
          {/* {this.renderModeMenuItems()} */}
          {/* The following menu items are present regardless of mode */}
          <a id="accountBtn" className="sidemenu-item" onClick={this.props.showEditAccount}>
            <span className="fa fa-user-circle"></span>&nbsp;Account</a>
          <a id="aboutBtn" className="sidemenu-item" onClick={()=>this.props.showAbout()}>
            <span className="fa fa-info-circle"></span>&nbsp;About</a>
            
        </div>
       );
    }
}

export default SideMenu;
