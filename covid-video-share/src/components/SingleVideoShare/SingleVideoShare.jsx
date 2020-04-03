import React, { Component } from "react";
import { auth } from "../../services/firebase";
import {Helmet} from "react-helmet";
import { getVideo } from "../../helpers/db";
import Loader from "react-loader-spinner";

import VideoCard from "../VideoCard";
import "./SingleVideoShare.scss";

class SingleVideoShare extends Component {
  static defaultProps = {
    shouldDisplayMenu: true
  };

  constructor(props) {
    super(props);
    this.state = {
      video: {},
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    const videoId = this.props.match.params.id;
    auth().onAuthStateChanged(user => {
      if (user) {
        getVideo(user.uid, videoId).onSnapshot(querySnapshot => {
          console.log(querySnapshot.data())
          this.setState({
                  video: querySnapshot.data(),
                  isLoading: false
                });
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(this.state.video).length === 0;
  }

  render() {
    const baseClassName = "psa-single-video-share";

    const { isLoading, video } = this.state;
    
    if (isLoading) {
      // TODO : User might have no videos, to be fixed
      return (
        <div className={`${baseClassName}__loader-div`}>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        </div>
      );
    }
    return (
      <div className={`${baseClassName}`}>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Covid-19</title>
            <meta name="description" content="Help to spread awareness for covid-19" />
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <VideoCard
         url={video.outputUrl}
         name={video.psaName} 
         date={video.createdDate}
         outputVideoId={video.outputVideoId}
         videoId={video.videoId}
         />
      </div>
    );
  }
}

SingleVideoShare.propTypes = {};

export default SingleVideoShare;
