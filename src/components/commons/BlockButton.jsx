import React from 'react'

function BlockButton({label, onClick, styleName, disabled}) {
  const className = `btn btn-outline-${styleName} btn-block`;
  return (
    <div className='d-grid gap-3 mt-3 mb-3'>
      <button type='button' className={className} onClick={onClick} disabled={disabled}>{label}</button> 
    </div>
  )
}

export default BlockButton