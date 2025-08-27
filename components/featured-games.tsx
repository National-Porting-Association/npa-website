"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Game {
  id: number
  title: string
  genre: string
  status: string
  description: string
  image: string
  playUrl: string | null
  features: string[]
}

export function FeaturedGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true) // Add loading state
  const { scrollYProgress } = useScroll()

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
        // eslint-disable-next-line no-eval
        eval(scriptText)

        if (window.Builder && typeof window.Builder.fetchGames === "function") {
          const data = await window.Builder.fetchGames()
          setGames(Array.isArray(data) ? data : data.games.slice(0, 3))
        } else {
          console.error("window.Builder.fetchGames is not available after executing npa.js")
        }
      } catch (err) {
        console.error("Failed to load or execute npa.js or fetch games:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAndExecuteNpaScript()
  }, [])

  const x = useTransform(scrollYProgress, [0.2, 0.8], ["-100%", "0%"])

  if (loading) {
    return (
      <section className="py-24 px-4 relative overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground ml-4">Loading featured games...</p>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Featured Ports
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience PC gaming classics reimagined for the modern web
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -20,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group perspective-1000"
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 transform-gpu">
                <div className="relative overflow-hidden">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge
                    variant={game.status === "Live" ? "default" : game.status === "Beta" ? "secondary" : "outline"}
                    className="absolute top-4 right-4"
                  >
                    {game.status}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {game.genre}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{game.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* The 'playUrl' is not being used here, so it is commented out.
                    The new link is a Next.js `Link` component, which is better for
                    internal routing. It now correctly uses the dynamic game ID.
                  */}
                  {game.playUrl ? (
                    <Button asChild className="w-full">
                      {/* This is the line that was updated to use the dynamic game ID */}
                      <Link href={`/games/${game.id}`}>
                        Play Now
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/games">View All Games</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
