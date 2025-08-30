"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Game {
  id: number
  title: string
  genre: string
  status: string
  description: string
  image: string
  playUrl: string | null
  originalPlatform: string
  portDate: string
  features: string[]
}

export default function GamesPage() {
useEffect(() => {
    if (window.location.pathname === "/games" && !sessionStorage.getItem("gamesPageReloaded")) {
      sessionStorage.setItem("gamesPageReloaded", "true");
      window.location.reload();
    }
    return () => {
      if (window.location.pathname !== "/games") {
        sessionStorage.removeItem("gamesPageReloaded");
      }
    };
  }, []);
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndExecuteNpaScript = async () => {
      try {
        // Initialize builder flags as provided by the user
        // @ts-ignore
        window.__builderFlags = { hideDevButton: true, env: 'prod' }

        const response = await fetch("/api/npa.js")
        if (!response.ok) {
          throw new Error(`Failed to fetch npa.js: ${response.statusText}`)
        }
        const scriptText = await response.text()
        console.log("Attempting to execute npa.js script via eval...")
        eval(scriptText)
        console.log("npa.js script executed. Checking window.Builder:", window.Builder)

        // Now that npa.js is executed, try to fetch games
        if (window.Builder && typeof window.Builder.fetchGames === "function") {
          const data = await window.Builder.fetchGames()
          setGames(Array.isArray(data) ? data : data.games)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500"
      case "Beta":
        return "bg-yellow-500"
      case "Coming Soon":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="py-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading games...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6 font-sans">
              Our Games
            </h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Discover our collection of ported PC games, now playable directly in your browser
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-sm px-4 py-2">
                {games.length} Games Available
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                {games.filter((g) => g.status === "Live").length} Live Games
              </Badge>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 overflow-hidden hover:shadow-xl transition-all duration-500 h-full">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className={`${getStatusColor(game.status)} text-white absolute top-4 right-4`}>
                      {game.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-card-foreground font-sans text-xl">{game.title}</CardTitle>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {game.genre}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {game.originalPlatform}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="font-serif mb-4 flex-1">{game.description}</CardDescription>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {game.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                      </p>
                    </div>

                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href={`/games/${game.id}`}>Play Now</Link>
                      </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
