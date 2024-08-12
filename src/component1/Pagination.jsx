/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

export default function Pagination ({ data, setShownData, perPage = 20 }) {
  const pageNum = Math.ceil(data.length / perPage)
  const [currentPage, setCurrentPage] = useState(1)

  const middleButtons = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1) {
      if (i < pageNum) {
        middleButtons.push(i)
      } else {
        break
      }
    }
  }

  useEffect(() => {
    setShownData([...data.slice((currentPage - 1) * perPage, currentPage * perPage)])
  }, [currentPage])

  return (
    <div className="pagination-buttons">
      <button onClick={ () => { setCurrentPage(currentPage - 1) }} disabled={currentPage === 1} className={currentPage === 1 ? 'disabled' : ''}>{'<'}</button>
      <button onClick={ () => { setCurrentPage(1) }} disabled={currentPage === 1} className={currentPage === 1 ? 'current' : ''}>1</button>
      {currentPage > 4 ? <span>...</span> : <></>}
      {middleButtons
        .map(value =>
          <button
            key={`pagination-middle-buttons-${value}`}
            onClick={ () => { setCurrentPage(value) } }
            disabled={currentPage === value}
            className={currentPage === value ? 'current' : ''}>{value}</button>)}
      {pageNum - currentPage > 3 ? <span>...</span> : <></>}
      {pageNum > 1 ? <button onClick={ () => { setCurrentPage(pageNum) }} disabled={currentPage === pageNum} className={currentPage === pageNum ? 'current' : ''}>{pageNum}</button> : <></>}
      <button onClick={ () => { setCurrentPage(currentPage + 1) }} disabled={currentPage === pageNum} className={currentPage === pageNum ? 'disabled' : ''}>{'>'}</button>
    </div>
  )
}
