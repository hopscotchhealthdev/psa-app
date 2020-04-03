import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { auth } from "../../services/firebase";
import { signin } from "../../helpers/auth";
import { readUserData } from "../../helpers/db";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {

    auth().onAuthStateChanged(user => {
      if (user) {
        readUserData(user.uid)
        // .onSnapshot(querySnapshot => {
        //   console.log('hi');
        //   console.log(querySnapshot.data())
        // });
        console.log(user)
        this.setState({
          authenticated: true,
          userName: user.displayName,
          email: user.email,
          avatar: user.photoURL
        });
      } else {

        signin("tech@hopscotch.health", "111111");
        // this.setState({
        //   authenticated: false
        // });
        // window.setTimeout(function() {
        //   // Move to a new location or you can do something else
        //   window.location.href =
        //     process.env.REACT_APP_LINK_REDIRECT_UNAUTHORIZED;
        // }, 3000);
      }
    });
  }
  
  render() {
    const baseClassName = "psa-app";
    const  {userName, email, avatar} = this.state;
    return (
      <div className={`${baseClassName}`}>
        <NavigationBar
         userName={userName}
         email={email}
         avatar={avatar} 
         />
        <div className={`${baseClassName}__app-div`}>{this.props.children}</div>
      </div>
    );
  }
}

export default App;
