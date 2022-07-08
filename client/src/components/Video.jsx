import picture from '../assets/picture.jpg';
import vidmp4 from '../assets/video.mp4';
import vidwebm from '../assets/video.webm';

const Video = () => {
    return (
    <video poster={picture} autoPlay playsInline muted loop>
      <source src={vidmp4} type="video/webm" />
      <source src={vidwebm} type="video/mp4" />
    </video>
     
    )
  
      
  }
  
  export default Video;