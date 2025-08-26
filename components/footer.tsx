export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-sans">National Porting Association</h3>
            <p className="text-primary-foreground/80 mb-4 font-serif">
              Transforming PC gaming experiences into seamless web adventures.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@NPA-NationalPortingAssociation" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                YouTube
              </a>
              <a href="https://discord.gg/SsW6agAQxR" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Discord
              </a>
              <a href="https://github.com/National-Porting-Association" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-sans">Pages</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="/games" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Game Ports
                </a>
              </li>
              <li>
                <a href="/community" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="/sites" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Sites
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-sans">Company</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 font-serif">
            © 2025 National Porting Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
