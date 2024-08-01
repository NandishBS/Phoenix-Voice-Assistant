### About me
Iam Nandish BS. 
6th sem,
Computer Science student,
University BDT College of Engineering,

### About Project
this is a React App created by me along with my team mate,
i have just started to learn react js and tried an interesting project that is to make an Voice Assistant and "Phoenix" is the name of the Project.

### Implementation
this project uses three main dependencies library/hooks/apis
1. Google Gemini API
2. Speech Recognition
3. Speech Synthesis

### Explaination
1. install Google gemini and provide the history of previous chats to personalize the replies
2. training it with the history to respond the way we want
3. useSpeechRecoginition() hook listens to the voice and converts that voice into a text form
4. the text is stored as usermessage
5. send this message to google gemini api
6. wait for response and removing the emojis, * values since it will be disturbing to hear speech synthesis reading those symbols
7. if there is any url present in the reply store it in the url 
8. save the reply text in geminReply
9. use speech Synthesis to convert the text into voice
10. and if url exists open it in a new tab



