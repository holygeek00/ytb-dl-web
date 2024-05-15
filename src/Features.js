import React from 'react'
import { FaCheck, FaTachometerAlt, FaInfinity } from 'react-icons/fa'
import './Features.css'

function Features () {
  return (
    <div className="features">
      <h2>Why Choose FreeDownLoad?</h2>
      <p>The best free tool for downloading no watermark TikTok videos.</p>
      <div className="features-grid">
        <div className="feature-card">
          <FaCheck className="feature-icon" />
          <h3>Super Easy to Use</h3>
          <p>Give us the video link, and we give you the no watermark video.</p>
        </div>
        <div className="feature-card">
          <FaTachometerAlt className="feature-icon" />
          <h3>Fast & Reliable</h3>
          <p>Multiple line analysis, fast response.</p>
        </div>
        <div className="feature-card">
          <FaInfinity className="feature-icon" />
          <h3>Always Free to Use</h3>
          <p>You can use this website anytime, anywhere.</p>
        </div>
      </div>
    </div>
  )
}

export default Features
