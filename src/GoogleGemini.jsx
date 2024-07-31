import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import training_data from './trainingData';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GoogleGemini({ userMessage, chat, chattingCompleted, updateURL }) {
  const [history, setHistory] = useState(training_data);
  const [chatError, setChatError] = useState(false)

  function dataPreProcess(str) {
    console.log(str)
    let words = str.split(' ')
    let isUrl = false
    let url = ""

    words.map((element, index) => {
      if (element.includes('http')) {
        isUrl = true
        url = element
      }
      return element
    })

    if (words[0] === 'Opening' && isUrl === true) {
      updateURL(url)
      console.log(url)
      return (str.slice(0, str.indexOf('http')))
    }
    else {
      let removedAsteric = str.replace(/\x2a/g, '.');
      let removedEmojis = removedAsteric.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
      return (removedEmojis);
    }
  }


  async function chatWithGemini() {
    try {
      const chat = model.startChat({
        history: history,
      });
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      let text = response.text();
      text = dataPreProcess(text)
      chattingCompleted(text)
    }
    catch (e) {
      setChatError(true)
      console.log(e)
      chattingCompleted('it seems like i have already reached my limit... see you later')
    }
  }

  useEffect(() => {
    if (chat) { chatWithGemini() }
  }, [chat])


  return (
    <div className='textDisplayArea'>
      <div className='textContainer extendedTextContainer'>
        <input value={
          chatError ? "There was a error while chatting" : ""
        } type="text" />
      </div>
    </div>
  )
}
