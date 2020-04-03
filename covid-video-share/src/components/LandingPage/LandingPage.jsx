import React, { Component } from "react";
import { auth } from "../../services/firebase";
import { getUserVideos } from "../../helpers/db";
import Loader from "react-loader-spinner";

import VideoCard from "../VideoCard";
import "./LandingPage.scss";

class LandingPage extends Component {
  static defaultProps = {
    shouldDisplayMenu: true
  };

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isLoading: false,
      psaId: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    auth().onAuthStateChanged(user => {
      if (user) {
        getUserVideos(user.uid).onSnapshot(querySnapshot => {
          let videos = [];
          let psaId = [];
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            videos.push(doc.data());
            psaId.push(doc.id);
          });
          this.setState({
            videos: videos,
            isLoading: false,
            psaId: psaId
          });
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.videos.length === 0;
  }
  render() {
    const baseClassName = "psa-landing-page";
    const { isLoading, videos, psaId } = this.state;
    if (isLoading) {
      return (
        <div className={`${baseClassName}__loader-div`}>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      );
    }
    return (
      <div className={`${baseClassName}`}>
        <div className={`${baseClassName}__video-list`}>
          {videos.map((video, index) => {
            return (
              <VideoCard
                url={video.outputUrl}
                name={video.psaName}
                outputVideoId={video.outputVideoId}
                key={video.psaId}
                psaId={psaId[index]}
                videoId={video.videoId}
                redirect={true}
                date={video.createdDate}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {};

export default LandingPage;
