import './App.css';
import { useState } from "react"
import socketIOClient from "socket.io-client"

const socket = socketIOClient("http://localhost:5005")

function App() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const handleClick = e => {
    e.preventDefault()
    // Send message to the server
    socket.emit("new-message", {
      message: message
    })
    
    setMessage("")
  }

  socket.on("message", payload => {
    // Set text with the message
    setChat(() => [...chat, payload.message])
  })

  const handleChange = e => {
    setMessage(e.target.value)
  }

  return (
    <div className="App">
      <input type="text" value={message} onChange={handleChange} />
      <button onClick={handleClick}>Send message</button>
      <ul>{
        chat.map(chatMessage => (
          <p>{chatMessage}</p>
        ))
      }</ul>
    </div>
  );
}

export default App;
