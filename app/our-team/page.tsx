import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const TEAM = [
  {
    name: 'Genizy',
    role: 'Porter',
    bio: 'Ported many of the games we host.',
    image: 'https://avatars.githubusercontent.com/u/185154684?v=4',
    link: 'https://github.com/genizy',
  },
  {
    name: 'Ashen Arrow',
    role: 'Design & UX, Porter',
    bio: 'Designed NPA’s website, branding, API, and ported multiple games.',
    image: 'https://i.imgur.com/bA1H2zY.jpeg',
    link: "https://github.com/ashenarrow",
  },
  {
    name: '98corbins',
    role: 'Porter',
    bio: 'Ported many of the games we host.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/The_C_Programming_Language_logo.svg/1200px-The_C_Programming_Language_logo.svg.png',
    link: 'https://98cornbin.netlify.app/',
  },
    {
    name: 'bog',
    role: 'Porter',
    bio: 'Ported multiple games.',
    image: 'https://avatars.githubusercontent.com/u/119977760?v=4',
    link: 'https://github.com/aukak',
  },
      {
    name: 'slqnt',
    role: 'Porter',
    bio: 'Ported multiple games.',
    image: 'https://avatars.githubusercontent.com/u/94934670?v=4',
    link: 'https://github.com/slqntdevss',
  }
];

export default function OurTeamPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <header className="bg-gradient-to-b from-[#0f172a] to-[#071024] py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Our Team</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            The small, focused team building high-quality web ports.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TEAM.map((m) => {
            const slug = m.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <article key={m.name} className="bg-card p-6 rounded-xl shadow-md ring-1 ring-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-none">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{m.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-300">{m.bio}</p>
                {m.link ? (
                  <div className="mt-4">
                    <a
                      href={m.link}
                      className="inline-block rounded-md bg-white/5 px-3 py-1 text-sm font-medium text-sky-400 hover:bg-white/10"
                    >
                      View Github/Bio
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
