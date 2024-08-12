/* eslint-disable react/prop-types */
import AppContext from './AppContext'
import React, { memo, useContext, useReducer, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { validateEmail, validatePassword } from '../utils/inputValidator'

export default memo(function Security () {
  const context = useContext(AppContext)

  const [cookies, setCookie] = !context.ssrFlag ? useCookies(['name', 'user_id', 'session']) : [context.cookies]

  const modalRef = useRef()

  const initialState = {
    email: cookies.email,
    newEmail: '',
    newPassword: '',
    passwordConfirmation: '',
    oldPassword: '',
    password: '',
    errorEmailIncorrect: false,
    errorEmailOccupied: false,
    errorImageSize: false,
    errorImageFormat: false,
    errorNewPasswordIncorrect: false,
    errorOldPasswordIncorrect: false,
    errorPasswordsMismatch: false,
    modalContent: 'password'
  }

  function reducer (state, action) {
    const newState = { ...state }

    switch (action.type) {
      case 'EMAIL':
        newState.email = action.value
        break
      case 'NEW_EMAIL':
        newState.newEmail = action.value
        break
      case 'PASSWORD':
        newState.password = action.value
        break
      case 'NEW_PASSWORD':
        newState.newPassword = action.value
        break
      case 'PASSWORD_CONFIRMATION':
        newState.passwordConfirmation = action.value
        break
      case 'OLD_PASSWORD':
        newState.oldPassword = action.value
        break
      case 'ERROR_EMAIL_INCORRECT':
        newState.errorEmailIncorrect = action.value
        break
      case 'NEW_EMAIL_OCCUPIED':
        newState.errorEmailOccupied = action.value
        break
      case 'ERROR_PASSWORD_INCORRECT':
        newState.errorPassword = action.value
        break
      case 'ERROR_IMAGE_SIZE':
        newState.errorImageSize = action.value
        break
      case 'ERROR_IMAGE_FORMAT':
        newState.errorImageFormat = action.value
        break
      case 'ERROR_NEW_PASSWORD_INCORRECT':
        newState.errorNewPasswordIncorrect = action.value
        break
      case 'ERROR_OLD_PASSWORD_INCORRECT':
        newState.errorOldPasswordIncorrect = action.value
        break
      case 'ERROR_PASSWORDS_MISMATCH':
        newState.errorPasswordsMismatch = action.value
        break
      case 'MODAL_CONTENT':
        newState.modalContent = action.value
        break
    }
    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function changePassword () {
    if (!validatePassword(state.newPassword)) {
      dispatch({ type: 'ERROR_NEW_PASSWORD_INCORRECT', value: true })
    } else if (state.passwordConfirmation !== state.newPassword) {
      dispatch({ type: 'ERROR_PASSWORDS_MISMATCH', value: true })
    } else {
      dispatch({ type: 'ERROR_OLD_PASSWORD_INCORRECT', value: false })
      dispatch({ type: 'ERROR_NEW_PASSWORD_INCORRECT', value: false })
      dispatch({ type: 'ERROR_PASSWORDS_MISMATCH', value: false })

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/change_password', { method: 'POST', body: JSON.stringify({ oldPassword: state.oldPassword, newPassword: state.newPassword }), headers })
        .then(res => Promise.all([res.status, res.json()]))
        .then(([status, data]) => {
          if (status < 200 || status >= 300) {
            if (data.error === 'name' || data.error === 'session' || data.error === 'login') {
              alert('Relogin please')
            } else if (data.error === 'password') {
              dispatch({ type: 'ERROR_OLD_PASSWORD_INCORRECT', value: true })
            } else if (data.error === 'new_password') {
              dispatch({ type: 'ERROR_NEW_PASSWORD_INCORRECT', value: true })
            }
          } else {
            dispatch({ type: 'OLD_PASSWORD', value: '' })
            dispatch({ type: 'NEW_PASSWORD', value: '' })
            dispatch({ type: 'PASSWORD_CONFIRMATION', value: '' })

            dispatch({ type: 'ERROR_OLD_PASSWORD_INCORRECT', value: false })
            dispatch({ type: 'ERROR_NEW_PASSWORD_INCORRECT', value: false })
            dispatch({ type: 'ERROR_PASSWORDS_MISMATCH', value: false })

            dispatch({ type: 'MODAL_CONTENT', value: 'password' })

            context.overlayRef.current.style.display = 'block'
            modalRef.current.style.display = 'block'
          }
        })
        .catch(err => alert(err))
    }
  }

  function changeEmail () {
    if (!validateEmail(state.newEmail)) {
      dispatch({ type: 'ERROR_EMAIL_INCORRECT', value: true })
      dispatch({ type: 'NEW_EMAIL_OCCUPIED', value: false })
    } else if (!validatePassword(state.password)) {
      dispatch({ type: 'ERROR_PASSWORD_INCORRECT', value: true })
    } else {
      dispatch({ type: 'ERROR_EMAIL_INCORRECT', value: false })
      dispatch({ type: 'NEW_EMAIL_OCCUPIED', value: false })
      dispatch({ type: 'ERROR_PASSWORD_INCORRECT', value: false })

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      fetch('/change_email', { method: 'POST', body: JSON.stringify({ email: state.newEmail, password: state.password }), headers })
        .then(res => Promise.all([res.status, res.json()]))
        .then(([status, data]) => {
          if (status < 200 || status >= 300) {
            if (data.error === 'name' || data.error === 'session') {
              alert('Relogin please')
            } else if (data.error === 'email_occupied') {
              dispatch({ type: 'ERROR_EMAIL_INCORRECT', value: false })
              dispatch({ type: 'NEW_EMAIL_OCCUPIED', value: true })
              dispatch({ type: 'ERROR_PASSWORD_INCORRECT', value: false })
            } else if (data.error === 'email_incorrect') {
              dispatch({ type: 'ERROR_EMAIL_INCORRECT', value: true })
              dispatch({ type: 'NEW_EMAIL_OCCUPIED', value: false })
              dispatch({ type: 'ERROR_PASSWORD_INCORRECT', value: false })
            } else if (data.error === 'password') {
              dispatch({ type: 'ERROR_PASSWORD_INCORRECT', value: true })
              dispatch({ type: 'ERROR_EMAIL_INCORRECT', value: false })
              dispatch({ type: 'NEW_EMAIL_OCCUPIED', value: false })
            }
          } else {
            setCookie('email', state.newEmail)
            dispatch({ type: 'EMAIL', value: state.newEmail })
            dispatch({ type: 'NEW_EMAIL', value: '' })
            dispatch({ type: 'PASSWORD', value: '' })

            dispatch({ type: 'MODAL_CONTENT', value: 'email' })

            context.overlayRef.current.style.display = 'block'
            modalRef.current.style.display = 'block'
          }
        })
        .catch(() => {})
    }
  }

  return (
    <div id='profile-security'>
      <div className='modal' ref={modalRef} style={{ marginTop: '32px' }}>
        <h2>Success!</h2>
        <p>{`Your ${state.modalContent} has been changed successfully!`}</p>

        <button className='modal-button' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
        }}>Ok</button>

        <div className='close' onClick={() => {
          context.overlayRef.current.style.display = 'none'
          modalRef.current.style.display = 'none'
        }}/>
      </div>

      <h2>Security</h2>
      <div id='profile-security-grid'>
        <div>
          <h3>Change Your Password</h3>
          <span className='profile-security-grid-label'>Old password</span>
          <input type='password' value={state.oldPassword} onChange={e => { dispatch({ type: 'OLD_PASSWORD', value: e.target.value }) }}/>
          <span className='error-label' hidden={!state.errorOldPasswordIncorrect}>{state.oldPassword.length ? 'Wrong password' : 'Input required'}</span>
          <span className='profile-security-grid-label'>New password</span>
          <input type='password' value={state.newPassword} onChange={e => { dispatch({ type: 'NEW_PASSWORD', value: e.target.value }) }}/>
          <span className='error-label' hidden={!state.errorNewPasswordIncorrect}>Password incorrect</span>
          <span className='profile-security-grid-label'>Confirm new password</span>
          <input type='password' value={state.passwordConfirmation} onChange={e => { dispatch({ type: 'PASSWORD_CONFIRMATION', value: e.target.value }) }}/>
          <span className='error-label' hidden={!state.errorPasswordsMismatch}>Passwords mismatch</span>
          <button className='button-outlined' onClick={changePassword}>Save</button>
        </div>
        <div>
          <h3>Change Your Email</h3>
          <span className='profile-text'>{`Current email: ${state.email}`}</span>
          <span className='profile-security-grid-label'>Email</span>
          <input type='email' value={state.newEmail} onChange={e => { dispatch({ type: 'NEW_EMAIL', value: e.target.value }) }}/>
          <span className='error-label' hidden={!state.errorEmailIncorrect}>Email incorrect</span>
          <span className='error-label' hidden={!state.errorEmailOccupied}>Email occupied</span>
          <span className='profile-security-grid-label'>Password</span>
          <input type='password' value={state.password} onChange={e => { dispatch({ type: 'PASSWORD', value: e.target.value }) }}/>
          <span className='error-label' hidden={!state.errorPassword}>Wrong password</span>
          <button className='button-outlined' onClick={changeEmail}>Save</button>
        </div>
      </div>
    </div>
  )
})
