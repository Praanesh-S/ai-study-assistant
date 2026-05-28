import { useState, useRef, useEffect } from "react"
import axios from "axios"

import AnimatedBackground from "./AnimatedBackground.jsx";
import SpeakingBlob from "./SpeakingBlob.jsx";
import FloatingRobot from "./FloatingRobot.jsx";
import { motion } from "framer-motion";

export default function App() {
  console.log('App component rendered');
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey, I'm Praans Agent. What can I do for you?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:8000/chat",{ text: input },{ timeout: 15000 })
      setMessages(prev => [...prev, { role: "assistant", text: res.data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Try again." }])
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 to-rose-300 text-gray-900 p-4">
      {/* Animated background */}
      <AnimatedBackground />
      {/* Speaking blob */}
      <SpeakingBlob trigger={messages.filter(m => m.role === "assistant").length} />
      <FloatingRobot />
      
      {/* Title with liquid glass text */}
      <motion.div
        className="absolute top-10 text-center w-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <h1 className="text-4xl font-bold text-gray-900 drop-shadow-lg bg-white/40 backdrop-blur-md rounded-2xl px-6 py-3 inline-block border border-white/30">
          PRAANS AGENT
        </h1>
        <p className="text-lg mt-2 text-gray-700 bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 mx-auto">
          Your friendly voice assistant
        </p>
      </motion.div>

      {/* Input bar with glass effect */}
      <div className="absolute bottom-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 p-4 flex items-center gap-2">
        <input
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none"
          placeholder="Start typing here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-lg disabled:opacity-50 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}