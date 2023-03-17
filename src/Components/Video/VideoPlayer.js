import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  // picture in picture
  const handlePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
  
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();

    const pipElement = document.pictureInPictureElement;
    
    if(pipElement !== null) {
      console.log(pipElement)
      Object.assign(pipElement.style, {
        width: '500px',
      })
    }
    
    if(video && videoRef && videoSrc) {
      if (Hls.isSupported() && video) {
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.pause();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', () => {
          video.pause();
        });
      }
    }
  }, [videoSrc]);

  return (
    videoSrc 
    ? <div className='video'>
        <video className='videoPlay' ref={videoRef}  controls/>
        <PictureInPictureAltIcon  onClick={handlePictureInPicture} className='PictureInPicture'/>
        {/* <button className='Picture-in-Picture' onClick={handlePictureInPicture}>Picture-in-Picture</button> */}
      </div>
    : <div>Not a video link</div>
  )
};

export default VideoPlayer;
