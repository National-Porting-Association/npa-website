import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans">About NPA</h1>
            <p className="text-xl text-muted-foreground font-serif">
              Pioneering the future of web-based gaming through innovative PC game porting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground font-sans">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif text-base">
                  To make PC gaming accessible to everyone by bringing high-quality games directly to web browsers,
                  eliminating the need for downloads or installations while maintaining the original gaming experience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground font-sans">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-serif text-base">
                  A world where any game can be played instantly in any browser, breaking down barriers between
                  platforms and making gaming truly universal and accessible to all.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4 font-sans">Our Story</h2>
            <p className="text-muted-foreground font-serif mb-6">
              Founded by a team of passionate developers and gaming enthusiasts, the National Porting Association
              emerged from a simple yet powerful idea: gaming should be accessible to everyone, everywhere, without the
              constraints of hardware limitations or complex installations.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-sans">Technical Excellence</h2>
            <p className="text-muted-foreground font-serif mb-6">
              Our team combines deep expertise in game development, web technologies, and performance optimization. We
              use cutting-edge WebAssembly, advanced JavaScript frameworks, and custom optimization techniques to ensure
              that ported games run smoothly across all modern browsers and devices.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-sans">Community First</h2>
            <p className="text-muted-foreground font-serif">
              We believe in the power of community. Every project we undertake is guided by feedback from gamers,
              developers, and industry partners. We're not just porting games – we're building bridges between
              traditional PC gaming and the future of web-based entertainment.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
