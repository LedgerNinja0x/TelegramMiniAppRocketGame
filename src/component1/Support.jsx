/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import React, { memo, useContext, useRef, useState } from 'react'
import { validateEmail } from '../utils/inputValidator'
import { useCookies } from 'react-cookie'

export default memo(function Support ({ fromProfile }) {
  const context = useContext(AppContext)

  const cookies = !context.ssrFlag ? useCookies(['name', 'email'])[0] : context.cookies

  const modalRef = useRef()

  const [name, setName] = useState(cookies.name)
  const [email, setEmail] = useState(cookies.email)
  const [emailIncorrect, setEmailIncorrect] = useState(false)
  const [message, setMessage] = useState()

  function send () {
    if (!validateEmail(email)) {
      setEmailIncorrect(true)
    } else {
      setEmailIncorrect(false)
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/support', { method: 'POST', body: JSON.stringify({ name, email, message }), headers })
        .then(res => Promise.all([res.status, res.json()]))
        .then(([status, data]) => {
          if (status < 200 || status >= 300) {
            if (data.error === 'email_incorrect') {
              setEmailIncorrect(true)
            }
          } else {
            context.overlayRef.current.style.display = 'block'
            modalRef.current.style.display = 'block'
            setName('')
            setEmail('')
            setMessage('')
          }
        })
    }
  }

  function returnPageContent () {
    return <>
      <span className='page-text' style={{ marginBottom: '16px' }}>If You have ane questions of suggestions – please contact us using this form.</span>

      <span className='profile-label'>Your Name</span>
      <input type='text' defaultValue={cookies.name} value={name} onChange={e => { setName(e.target.value) }}/>
      <span className='profile-label'>Email for Reply</span>
      <input type='text' defaultValue={cookies.email} value={email} onChange={e => { setEmail(e.target.value) }}/>
      <span className='error-label' hidden={!emailIncorrect}>Email incorrect</span>
      <span className='profile-label'>Message</span>
      <textarea cols='40' rows='5' value={message} onChange={e => { setMessage(e.target.value) }}/>
      <button className='button-outlined' onClick={send}>Send</button>
    </>
  }

  return (
    <div id='profile-support'>
      <div className='modal' ref={modalRef} style={{ marginTop: '32px' }}>
        <p><h2>Thank you for your message!</h2></p>
        <p>We will reply to you as soon as possible!</p>
        <div className='close' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
          history.push('/')
        }}/>
        <button className='modal-button' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
          history.push('/')
        }}>Ok</button>
      </div>
      {fromProfile
        ? <>
          <h2>Support</h2>
          {returnPageContent()}
        </>
        : <div className='page-background'>
          <h1>Support</h1>
          {returnPageContent()}
        </div>
      }
    </div>
  )
})
