import React,{useState, useEffect} from 'react'
import {useSpeechSynthesis} from 'react-recipes'


export default function SpeechOutput({geminiReply,answer,speekingCompleted,stopSpeak}) {
    const [speechError, setSpeechError] = useState(false)
    const [isPause, setisPause] = useState(false)

    const onEnd = () => {
      cancel();
      speekingCompleted()};
    const onError = (event) => {
      setSpeechError(true)
      console.log(event);
    };
  
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis({onEnd, onError});
  
    useEffect(()=>{
      if(answer){
        speak({text: geminiReply, voice: voices[0], pitch:3 , volume:2, speed:1.5 })
      }
    },[answer])

    useEffect(()=>{
      if(stopSpeak === true){
        onEnd()
      }
    },[stopSpeak])


        

    return (
        <div className='textDisplayArea'>
        <div className='textContainer'>
          <input value={''} type="text"/>  
        </div>
      </div>
    );
}
