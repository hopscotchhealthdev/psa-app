import React, { Component } from "react";

import "./NavigationBar.scss";

class NavigationBar extends Component {
  static defaultProps = {
    shouldDisplayMenu: true
  };

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

goBackBtn = () => {
  window.history.back();
}
  render() {
    const baseClassName = "psa-navigation-bar";
    const {
           avatar
          } = this.props;

    const userProfile= (
       <div className={`${baseClassName}__username-div`}>
          <span className={`${baseClassName}__avatar-span`}><img src={avatar} className={`${baseClassName}__avatar`} alt="avatar"/></span><span>Logout</span>
        </div>
      )

    
    return (
      <div className={`${baseClassName}`}>
        <ul className={`${baseClassName}__nav-ul`}>
            <li><a href="# " className="active" onClick={()=>this.goBackBtn()}>Back</a></li>
            <li><a href={process.env.REACT_APP_LINK_VIDEO_LIB}>Video library</a></li>
            <li><a href={process.env.REACT_APP_LINK_REDIRECT_UNAUTHORIZED}>{userProfile}</a></li>
        </ul>
      </div>
    );
  }
}

NavigationBar.propTypes = {};

export default NavigationBar;
