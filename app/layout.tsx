import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ParticlesBackground } from "@/components/particles-background"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "NPA - National Porting Association",
  description: "Leading PC game porting specialists bringing your favorite games to the web"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased dark`} suppressHydrationWarning>
      <head>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
  <link rel="apple-touch-icon" sizes="192x192" href="/android-chrome-192x192.png" />
  <link rel="apple-touch-icon" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#18181b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ParticlesBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
