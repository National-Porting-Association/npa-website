import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary font-sans cursor-pointer">NPA</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/games" className="text-foreground hover:text-primary transition-colors font-serif">
                  Games
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors font-serif">
                  About
                </Link>
                <Link href="/sites" className="text-foreground hover:text-primary transition-colors font-serif">
                  Sites
                </Link>
                <Link href="/community" className="text-foreground hover:text-primary transition-colors font-serif">
                  Community
                </Link>
                <Link href="/our-team" className="text-foreground hover:text-primary transition-colors font-serif">
                  Our Team
                </Link>
                <Link href="/docs" className="text-foreground hover:text-primary transition-colors font-serif">
                  Documentation
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild className="bg-[#5865F2] text-white hover:bg-[#4752C4] font-serif">
              <a href="https://discord.gg/SsW6agAQxR" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
