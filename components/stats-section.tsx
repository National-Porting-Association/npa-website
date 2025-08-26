"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function CountUp({ end, duration = 1 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}


export function StatsSection() {
  const [stats, setStats] = useState([
    { label: "Games Ported", value: 0, suffix: "" },
    { label: "Games Ports In Development", value: 0, suffix: "" },
    { label: "Games Ports Coming Soon", value: 0, suffix: "" }
  ])

  useEffect(() => {
    const fetchAndExecuteNpaScript = async () => {
      try {
        // Initialize builder flags
        // @ts-ignore
        window.__builderFlags = { hideDevButton: true, env: 'prod' }

        const response = await fetch("/api/npa.js")
        if (!response.ok) {
          throw new Error(`Failed to fetch npa.js: ${response.statusText}`)
        }
        const scriptText = await response.text()
        eval(scriptText)

        if (window.Builder && typeof window.Builder.fetchGames === "function") {
          const data = await window.Builder.fetchGames()
          const games = Array.isArray(data) ? data : data.games || []
          const ported = games.filter((g: any) => g.status === "Live").length
          const inDev = games.filter((g: any) => g.status === "In Development").length
          const comingSoon = games.filter((g: any) => g.status === "Coming Soon").length
          setStats([
            { label: "Games Ported", value: ported, suffix: "" },
            { label: "Games Ports In Development", value: inDev, suffix: "" },
            { label: "Games Ports Coming Soon", value: comingSoon, suffix: "" },
          ])
        } else {
          console.error("window.Builder.fetchGames is not available after executing npa.js")
        }
      } catch (err) {
        console.error("Failed to load or execute npa.js or fetch game stats:", err)
      }
    }

    fetchAndExecuteNpaScript()
  }, [])

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Proven Excellence</h2>
          <p className="text-xl text-muted-foreground">Numbers that speak to our commitment to quality</p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
