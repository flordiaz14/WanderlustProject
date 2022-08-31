import React from 'react';
import { FaFacebook , FaLinkedinIn, FaTwitter , FaInstagram} from "react-icons/fa";

const SocialMedia = () => {
  return (
      <div className='social-media'>
        <a target="_blank" href="https://www.facebook.com/" rel="noreferrer">
          <FaFacebook/>
        </a>
        <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer">
          <FaLinkedinIn/>
        </a>
        <a target="_blank" href="https://www.twitter.com/" rel="noreferrer">
          <FaTwitter/>
        </a>
        <a target="_blank" href="https://www.instagram.com/" rel="noreferrer">
          <FaInstagram/>
          </a>
      </div>
  )
}

export default SocialMedia

