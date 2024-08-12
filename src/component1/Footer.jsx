/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

export default memo(function Footer () {
  return (
    <footer id='footer'>
      <hr/>
      <div id='footer-flexbox'>
        <span id='footer-flexbox-left'>© 2020 <Link to='/'>Rocket-X.io</Link>. All rights reserved.</span>
        <div id='footer-flexbox-right'>
          <Link to='/terms'>Terms and Privacy Policy</Link>
          <Link to='/support'>Support</Link>
        </div>
      </div>
    </footer>
  )
})
