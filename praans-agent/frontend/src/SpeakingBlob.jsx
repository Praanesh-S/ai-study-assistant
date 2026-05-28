import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * SpeakingBlob – a pulsating blob that animates whenever the assistant sends a new message.
 * `trigger` should be a number that changes (e.g., the count of assistant messages).
 */
export default function SpeakingBlob({ trigger }) {
  const [animate, setAnimate] = useState(false);

  // When the trigger changes, run a short pulse animation.
  useEffect(() => {
    setAnimate(true);
    const id = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(id);
  }, [trigger]);

  // The blob sits behind the UI but above the background canvas.
  // pointer-events: none ensures it doesn't block input.
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 5 }}
      animate={animate ? { scale: [1, 1.3, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-56 h-56 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full blur-2xl opacity-60" />
    </motion.div>
  );
}
