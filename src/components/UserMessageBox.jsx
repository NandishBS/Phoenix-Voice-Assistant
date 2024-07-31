import React from 'react'
import './MessageBox.css'
export default function UserMessageBox({text}) {
  return (
    <div className='MessageBox User'><p>{text}</p></div>
  )
}
