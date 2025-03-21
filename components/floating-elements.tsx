"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

export function FloatingElement({
  children,
  className = "",
  delay = 0,
  duration = 3,
  x = 10,
  y = 10,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -y, 0],
        x: [0, x, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <FloatingElement
        className="absolute top-[10%] right-[15%] w-16 h-16 bg-[#5fa2db]/10 rounded-full blur-xl"
        duration={5}
        x={20}
        y={30}
      />
      <FloatingElement
        className="absolute top-[30%] left-[10%] w-24 h-24 bg-[#7ab8e6]/10 rounded-full blur-xl"
        duration={7}
        delay={1}
        x={-15}
        y={25}
      />
      <FloatingElement
        className="absolute bottom-[20%] right-[20%] w-32 h-32 bg-[#a8d1f0]/10 rounded-full blur-xl"
        duration={6}
        delay={2}
        x={-25}
        y={-20}
      />
      <FloatingElement
        className="absolute bottom-[10%] left-[25%] w-20 h-20 bg-[#5fa2db]/10 rounded-full blur-xl"
        duration={8}
        delay={3}
        x={30}
        y={-15}
      />
    </div>
  )
}

