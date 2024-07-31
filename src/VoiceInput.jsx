import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceInput({ listen, listeningCompleted }) {
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [text, setText] = useState("");

  useEffect(() => {
    if (listen === true) {
      SpeechRecognition.startListening({ isFuzzyMatch: false });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listen]);

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (listen) {
      if (listening === false && text !== "") {
        listeningCompleted(text);
        resetTranscript();
      } else if (listening === false && text === "") {
        SpeechRecognition.startListening({ isFuzzyMatch: false });
      }
    }
  }, [listening]);


  function displayText(){
    if(browserSupportsSpeechRecognition === false){
      return("Your Browser does not supports Speech Recognition")
    }
    else if(isMicrophoneAvailable === false){
      return("Microphone permission is not granted")
    }
    else if(listen){
      return transcript
    }
  }

  return (
      <div className='textDisplayArea'>
      <div className='textContainer extendedTextContainer'>
          <input value={
            displayText()
          } type="text"/>  
      </div>
      </div>
  );
}
