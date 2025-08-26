"use client"
// Reminder to fix light mode ruining text visibility on banners
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Code, Gamepad2, Zap, YoutubeIcon } from "lucide-react"
import Link from "next/link"

export default function BannerSections() {
  return (
    <div className="w-full">
      {/* Technology Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-background/80 to-blue-900/60"
          style={{
            backgroundImage: `url("/youtube-banner.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our YouTube Channel
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get sneak peaks of upcoming game ports, tutorials, and behind-the-scenes content on our YouTube channel.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
              <YoutubeIcon className="h-16 w-16 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Subscribe to our YouTube Channel</h3>
            <Button
              variant="outline"
              onClick={() =>
              window.open("https://www.youtube.com/@NPA-NationalPortingAssociation", "_blank")
              }
            >
            Subscribe
            </Button>
            </div>
          </div>
        </div>
      </section>
      {/* GitHub Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-background/80 to-slate-800/60"
          style={{
            backgroundImage: `url("/github-banner.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-300 to-white bg-clip-text text-transparent">
              Our GitHub
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Browse our source, report issues, and contribute to ports, tools, and examples on our GitHub organization.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-500/8 to-slate-700/8 rounded-2xl p-8 backdrop-blur-sm border border-slate-500/10">
              <Github className="h-16 w-16 text-slate-200 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Explore our repositories</h3>
              <Button
                variant="outline"
                onClick={() =>
                  window.open("https://github.com/National-Porting-Association", "_blank")
                }
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
