import React from "react";
import ReactPlayer from "react-player";

const VideoContainer = (props) => {
  const { children, containerStyle, url, setAnimate, width } = props;

  return (
    <div className={containerStyle} onMouseOver={() => setAnimate(true)}>
      <ReactPlayer
        url={url}
        playing
        loop
        width={width}
        height={"100%"}
      />
      {children}
    </div>
  );
};

export default VideoContainer;
