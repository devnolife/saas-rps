"use client"

import { TopNavigation } from "@/components/top-navigation"
import { RpsGeneratorForm } from "@/components/rps-generator-form"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedGradientText } from "@/components/animated-gradient-border"

export default function RpsGeneratorPage() {
  return (
    <div className="p-6 relative">
      <FloatingElements />
      <TopNavigation />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 mr-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white p-2 rounded-2xl"
            >
              <FileSpreadsheet className="h-6 w-6" />
            </motion.div>
            <h1 className="text-3xl font-bold">Generator RPS</h1>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="px-3 py-1 bg-[#e6f1fa] dark:bg-[#2c4c6b] rounded-full text-[#5fa2db] dark:text-[#a8d1f0] text-xs font-medium flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </motion.div>
          </div>
          <p className="text-muted-foreground ml-14">Buat Rencana Pembelajaran Semester (RPS) dengan bantuan AI</p>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="rounded-full border-dashed border-2">
              Lihat Template
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-full bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] text-white border-0">
              <AnimatedGradientText className="font-medium">Tutorial</AnimatedGradientText>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative">
        <motion.div
          className="absolute -z-10 top-20 right-20 w-72 h-72 bg-[#d0e4f5] dark:bg-[#2c4c6b]/20 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -z-10 bottom-20 left-20 w-80 h-80 bg-[#e6f1fa] dark:bg-[#3a5d7d]/20 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <RpsGeneratorForm />
      </div>

      <Toaster />
    </div>
  )
}

