import React, { useEffect, useState } from "react"
import LottieModule from "lottie-react"
const Lottie = LottieModule.default || LottieModule
import { motion } from "framer-motion"
import voiceJson from './assets/animations/voice.json'

/**
 * VoiceAnimation – animates when assistant sends a response
 * `trigger` should be a number that changes (e.g., messages.length)
 */
export default function VoiceAnimation({ trigger }) {
  const [animate, setAnimate] = useState(false)

  // Animate when trigger increases (new assistant message)
  useEffect(() => {
    if (trigger > 0) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 1000) // 1s animation
    }
    return () => {}
  }, [trigger])

  return (
    <motion.div
      className="fixed bottom-10 left-[50%] transform-[translateX(-50%)] z-10"
      style={{ pointerEvents: 'none' }}
      animate={animate ? { scale: 1.2 } : { scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Lottie animationData={voiceJson} autoplay={false} loop={false} />
    </motion.div>
  )
}