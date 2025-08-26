import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Zap } from "lucide-react"
import DiscordInvite from "react-discord-invite";
import "react-discord-invite/dist/style.css";

export function DiscordCard() {
  return (
    <Card className="bg-[#5865F2] border-[#5865F2] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] to-[#4752C4]" />
      <CardContent className="relative p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">NPA Official</h3>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <p className="text-white/80 text-sm mb-4">
              Get exclusive sneak peeks of upcoming game ports and connect with the gaming community
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
              <div className="flex items-center gap-1">
              </div>
              <div className="flex items-center gap-1">
              </div>
            </div>
            <Button asChild className="bg-white text-[#5865F2] hover:bg-white/90 font-semibold">
              <a href="https://discord.gg/SsW6agAQxR" target="_blank" rel="noopener noreferrer">
                <Zap className="w-4 h-4 mr-2" />
                Join Server
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
