import React, { useEffect, useState } from 'react'
import VoiceInput from './VoiceInput';
import GoogleGemini from './GoogleGemini';
import SpeechOutput from './SpeechOutput';
import "./App.css"
import ChatDisplay from './ChatDisplay';
import LineSpectrum from './assets/LineSpectrum.gif'
import Orbslow from './assets/Orbslow.gif'
import Orbfast from './assets/Orbfast.gif'
import MicOff from './assets/MicOff.mp3'
import MicOn from './assets/MicOn.mp3'

function App() {
  const [listen, setListen] = useState(false);
  const [chat, setChat] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [urlExists, setUrlExistis] = useState(false);
  const [url, setUrl] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [geminiReply, setGeminiReply] = useState('');
  const [stopSpeak, setStopSpeak] = useState(false)

  useEffect(()=>{
    fetch('https://backend-f1z6h80w6-nandish-b-ss-projects.vercel.app/')
  .then(response => response.json())
  .then(data => console.log('fetched data : 'data))
  .catch(error => console.error('Error:', error));
  },[])

  const micOffSound = () => {
    const audio = new Audio(MicOff);
    audio.play();
  };
  const micOnSound = () => {
    const audio = new Audio(MicOn);
    audio.play();
  };

  function turnOn() {
    setUrl('')
    setUrlExistis(false)
    setListen(true);
    setChat(false);
    setAnswer(false);
  }


  function listeningCompleted(value) {
    setUserMessage(value);
    setListen(false);
    setChat(true);
    setAnswer(false);
  }

  function chattingCompleted(value) {
    setUserMessage('')
    setGeminiReply(value);
    setListen(false);
    setChat(false);
    setAnswer(true);
  }


  function turnOff() {
    setListen(false)
    setChat(false)
    setAnswer(false)
  }

  function speekingCompleted() {
    if (urlExists) {
      setUrlExistis(false)
      window.open(url)
      setUrl('')
      turnOff()
    }
    else {
      turnOff()
      micOnSound()
    }
    micOffSound()
    setStopSpeak(false)
  }


  function updateURL(urlLink) {
    setUrlExistis(true)
    setUrl(urlLink)
  }


  return (
    <div className="App">
      <header></header>

      <div className='ChatDisplayArea'>
        <ChatDisplay listen={listen} chat={chat} answer={answer} userMessage={userMessage} geminiReply={geminiReply} />
      </div>

      {!listen && !chat && !answer && 
        <div className='textDisplayArea'>
        <div className='textContainer'>
          <input value={''} type="text"/>  
        </div>
      </div>
      }
      {listen && <VoiceInput listen={listen} listeningCompleted={listeningCompleted}/>}
      {chat && <GoogleGemini userMessage={userMessage} chat={chat} chattingCompleted={chattingCompleted} updateURL={updateURL} />}
      {answer && <SpeechOutput geminiReply={geminiReply} answer={answer} speekingCompleted={speekingCompleted} stopSpeak = {stopSpeak} />}


      <div className='visualsDisplayArea'>
        {
          !listen && !chat && !answer &&
          <img className='orb' onClick={()=>{micOnSound(); setListen(true)}} src={Orbslow} alt="orb" />
        }
        {
          listen && 
          <img id='linespectrum' src= {LineSpectrum} alt='line spectrum animation'/> 
        }
        {
          chat && 
          <img className='orb' src={Orbslow} alt="orb" />
        }
        {
          answer &&
          <img className='orb' onClick={()=>{setStopSpeak(true)}} src={Orbfast} alt="orb" />
        }
      </div>
    </div>
  );
}

export default App;
