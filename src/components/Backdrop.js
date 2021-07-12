import React from 'react' 

function Backdrop({ onCancel }) {
  return (
    <div className='backdrop' onClick={onCancel}></div>
  )
}

export default Backdrop