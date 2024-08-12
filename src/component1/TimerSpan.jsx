/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react'

export default memo(function TimerSpan ({ expiration }) {
  const [time, setTime] = useState(expiration - new Date().getTime())

  useEffect(() => {
    let isMounted = true
    setInterval(() => {
      if (isMounted) {
        try {
          setTime(time => time - 1000)
        } catch (e) {
          // eslint-disable-next-line no-self-assign
          document.location.href = document.location.href
        }
      }
    }, 1000)
    return () => { isMounted = false }
  }, [])

  return (
    <span className='timer-span'>
      {Math.floor(time / 1000 / 60)}:{Math.floor(time / 1000 % 60)}
    </span>
  )
})
