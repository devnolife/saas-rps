"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  duration?: number
  colors?: string[]
}

export function AnimatedGradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 8,
  colors = ["#5fa2db", "#7ab8e6", "#a8d1f0", "#7ab8e6"],
}: AnimatedGradientBorderProps) {
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative rounded-3xl ${className}`}>
      <div
        className="absolute inset-0 rounded-3xl z-0"
        style={{
          background: `conic-gradient(from ${rotate}deg, ${colors.join(", ")})`,
          padding: borderWidth,
          filter: "blur(8px)",
          opacity: 0.7,
          animationDuration: `${duration}s`,
        }}
      />
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl h-full">{children}</div>
    </div>
  )
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = ["#5fa2db", "#7ab8e6", "#a8d1f0", "#5fa2db"],
}: {
  children: React.ReactNode
  className?: string
  colors?: string[]
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.span>
  )
}

