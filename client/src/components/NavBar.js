import React from 'react';
import AppMode from '../AppMode';

class NavBar extends React.Component {

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ROUNDS_LOGROUND || 
          this.props.mode === AppMode.ROUNDS_EDITROUND)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ROUNDS_LOGROUND ||
        this.props.mode === AppMode.ROUNDS_EDITROUND) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode !== AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  }

    
  render() {
    return (
    <div className="navbar">  
    <span className="navbar-items">
      {/* <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
        <span id="menuBtnIcon" className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
        </span>
      </button> */}
      <img src="https://drive.google.com/uc?export=view&id=1g3U71ZzJcVr03APIEt1bVcY3VakgdBPN" alt="FIFA Logo" height="38px"
      width="38px" />
      <span className="navbar-title">
        &nbsp;{this.props.title}
      </span>
      <a></a>
      <a>&nbsp;&nbsp;</a>
      <a id="aboutBtn" className="navbar-item" onClick={()=>this.props.showAbout()}>
            <span className="fa fa-info-circle"></span>&nbsp;About</a>
    </span>
  </div>
); 
}
}

export default NavBar;
