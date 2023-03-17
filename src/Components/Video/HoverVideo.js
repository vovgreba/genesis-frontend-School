import React, { useState, useRef } from 'react';
import Hls from 'hls.js';
import './previewHover.scss'
const HoverVideo = ({ videoSrc, imageSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    // Перевіряємо, чи існує змінна `videoRef` і чи містить вона посилання на відтворювач відео
    if(videoRef && videoRef.current) {
      if (Hls.isSupported() ) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
        videoRef.current.play();
  
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSrc;
        videoRef.current.play();
      } else {
        console.error('HLS is not supported in this browser.');
      }
      setIsPlaying(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

   return (
    
    <div className='previewHover' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>\
      {videoSrc && (
        <video className='preview-video' ref={videoRef} muted loop style={{ display: isPlaying ? 'block' : 'none' }}>
          <source src={videoSrc} type='application/x-mpegURL' />
        </video>
      )}

      <img className='preview-image' ref={imageRef} src={imageSrc} style={{ display: isPlaying ? 'none' : 'block' }} alt='imageCourse'/>
    </div>
  );

};

export default HoverVideo;
