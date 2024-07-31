import React, { useEffect, useState } from 'react'
import Offline from './components/Offline'
import UserMessageBox from './components/UserMessageBox'
import GeminiReplyBox from './components/GeminiReplyBox'
import "./ChatDisplay.css"


export default function ChatDisplay({listen,chat,answer,userMessage,geminiReply}) {
    const [history,setHistory] = useState([])
    useEffect(()=>{
        if(!listen && chat ){
            setHistory((prev)=>{
                return(
                    [{role:"user",message:userMessage},...prev]
                )
            })
        }
        else if(!listen && !chat && answer){
            setHistory((prev)=>{
                return(
                    [{role:"gemini",message:geminiReply},...prev]
                )
            })
        }
    },[chat])

    if(!window.navigator.onLine){
        return (
            <Offline/>
        )
    }


  return (
    <>
    <div className='chatContainer'>
        {
        history.map((element, index)=>{
            if(element.role === "user"){
                return(<UserMessageBox key={index} text={element.message} />)
            }
            else{
                return(<GeminiReplyBox key={index} text={element.message}/>)
            }
        })}
    </div>
    </>
  )
}
