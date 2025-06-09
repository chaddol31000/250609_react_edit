import React from 'react'

// type='text' ← 타입의 기본값은 텍스트라고 지정하는 것

// 데이터를 출력할 때는 store(데이터) + UI 컴포넌트
// 데이터를 입력 받을 때는 custom hook(데이터, 검증) + UI 컴포넌트 


// useUsername, useEmail, usePassword, useConfirmPassword + TextField 이런 식으로 진행될 예정
// 바빠서 하나하나 못 만든다면 field 로 바로 전개

function TextField({name, type='text', label, onChange, onBlur, message, value}) {
  return (
    <div className='mb-3 mt-3'>
        <label htmlFor={name} className='form-label'>{label}:</label>
        <input type={type} name={name} className='form-control' onChange={onChange} onBlur={onBlur} value={value} />
        {message!=='' && <span style={{color:'red'}}>{message}</span>}
      </div>
    
  )
}

export default TextField