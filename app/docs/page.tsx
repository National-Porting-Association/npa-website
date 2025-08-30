"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Link from 'next/link'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const DocSection = ({ id, title, children, isVisible }) => {
  return isVisible ? (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <h2>{title}</h2>
      {children}
    </motion.div>
  ) : null
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quick-start');
  const [runtimeFlags, setRuntimeFlags] = useState<Record<string, any> | null>(null);

  function loadRuntimeFlags() {
    try {
      // prefer Builder API if available
      const f = (window as any).Builder && typeof (window as any).Builder.flags === 'function'
        ? (window as any).Builder.flags()
        : (window as any).__builderFlags || {};
      setRuntimeFlags(f || {});
    } catch (e) { setRuntimeFlags({ error: String(e) }); }
  }

  useEffect(() => {
    // auto-load flags so the docs show them without an extra click
    loadRuntimeFlags();
  }, []);

  return (
    <main className="min-h-screen">
     <Navigation /> 

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 items-start">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Builder Documentation</h1>
            <p className="mt-3 text-muted-foreground">Quick reference for the api-development bundle, runtime flags, and examples.</p>
          </motion.header>

          <aside className="hidden md:block md:col-span-1 sticky top-28 self-start">
            <nav className="space-y-4 p-4 rounded bg-card/50 border border-primary/10">
              <h3 className="font-semibold">Contents</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a
                    href="#quick-start"
                    onClick={() => setActiveSection('quick-start')}
                    className={`hover:underline cursor-pointer ${activeSection === 'quick-start' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Quick start
                  </a>
                </li>
                <li>
                  <a
                    href="#flags"
                    onClick={() => setActiveSection('flags')}
                    className={`hover:underline cursor-pointer ${activeSection === 'flags' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Flags
                  </a>
                </li>
                <li>
                  <a
                    href="#embedded"
                    onClick={() => setActiveSection('embedded')}
                    className={`hover:underline cursor-pointer ${activeSection === 'embedded' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Embedded data
                  </a>
                </li>
                <li>
                  <a
                    href="#api-client"
                    onClick={() => setActiveSection('api-client')}
                    className={`hover:underline cursor-pointer ${activeSection === 'api-client' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    API client
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    onClick={() => setActiveSection('examples')}
                    className={`hover:underline cursor-pointer ${activeSection === 'examples' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#play"
                    onClick={() => setActiveSection('play')}
                    className={`hover:underline cursor-pointer ${activeSection === 'play' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Play
                  </a>
                </li>
                <li>
                  <a
                    href="#troubleshooting"
                    onClick={() => setActiveSection('troubleshooting')}
                    className={`hover:underline cursor-pointer ${activeSection === 'troubleshooting' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
              <div className="mt-4">
              </div>
            </nav>
          </aside>

          <article className="md:col-span-3">
            <DocSection id="quick-start" title="Quick start" isVisible={activeSection === 'quick-start'}>
              <p>Include the built bundle on any page. The bundle exposes <code>window.Builder</code> for runtime helpers and embeds data so your app can fall back when the API is unavailable.</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`<script src="bundle.js" data-flags="env=dev"></script>`}</code></pre>
              <p>Recommended: include a small inline script to set environment or hide the dev button in production:</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`<script>window.__builderFlags = { hideDevButton: true, env: 'prod' }</script>
<script src="bundle.js"></script>`}</code></pre>
            </DocSection>

            <DocSection id="flags" title="Flags" isVisible={activeSection === 'flags'}>
              <p>Flags control runtime behavior. Pass them via the <code>data-flags</code> attribute on the bundle script or set <code>window.__builderFlags</code> before the bundle loads.</p>
              <p className="text-sm text-muted-foreground">Parsing rules: bare names (for example <code>hideDevButton</code>) are treated as booleans and set to <code>true</code>. Use <code>key=value</code> pairs for strings, numbers, and explicit booleans (for example <code>env=prod</code>, <code>maxPlayers=10</code>, <code>featureX=false</code>).</p>
              <ul>
                <li><strong>hideDevButton</strong> — hide the floating developer button (useful for production). When true, the panel button and menu won't be attached to the document.</li>
                <li><strong>env</strong> — environment name (informational only; returned by <code>Builder.getFlag('env')</code>).</li>
                <li><strong>apiBase</strong> — base URL used by the bundle to prefix relative play URLs (used by <code>Play.open</code> and the mini-player logic).</li>
                <li><strong>any other key</strong> — custom flags are parsed and returned by <code>Builder.flags()</code>. The bundle doesn't impose a schema — pass whatever you need.</li>
              </ul>
              <p>Where flags are read in the code:</p>
              <ul>
                <li><code>hideDevButton</code> — respected when attaching the dev button in <code>src/ui/panel.js</code>.</li>
                <li><code>apiBase</code> — read by <code>src/play.js</code> to prefix relative play URLs, and by the UI to build doc links.</li>
                <li><code>env</code> — informational, used in examples and can be read via <code>Builder.getFlag('env')</code>.</li>
              </ul>
              <div className="mt-4">
                <button className="btn btn-sm" onClick={() => loadRuntimeFlags()}>Load runtime flags</button>
              </div>

              {/* derive an ordered list of flag entries for display */}
              {useMemo(() => {
                return null // placeholder to keep hook order stable
              }, [runtimeFlags])}

              {runtimeFlags && (
                <div className="mt-4 bg-muted p-3 rounded not-prose">
                  <h4>Runtime flags</h4>

                  <h5 className="text-sm mb-2">Known flags</h5>
                  <table className="w-full text-sm mb-3 border-collapse">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b">
                        <th className="py-2">Flag</th>
                        <th className="py-2">Default</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">hideDevButton</td>
                        <td className="py-2">false</td>
                        <td className="py-2">If true, the floating developer button and panel will not be attached.</td>
                        <td className="py-2 text-muted-foreground">boolean</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">env</td>
                        <td className="py-2">(none)</td>
                        <td className="py-2">Informational environment label (dev/prod), readable via <code>Builder.getFlag('env')</code>.</td>
                        <td className="py-2 text-muted-foreground">string</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">apiBase</td>
                        <td className="py-2">""</td>
                        <td className="py-2">Base URL used to prefix play and API routes when opening games or constructing links.</td>
                        <td className="py-2 text-muted-foreground">string</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">redirect</td>
                        <td className="py-2">(none)</td>
                        <td className="py-2">If set, the page will redirect to this path after bundle initialization. Example: <code>window.__builderFlags.redirect = '/games'</code></td>
                        <td className="py-2 text-muted-foreground">string</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* chart + table for all flags */}
                  {Object.keys(runtimeFlags || {}).length === 0 ? (
                    <p className="text-muted-foreground"></p>
                  ) : (
                    <div className="space-y-4">
                      {/* compute scaling values */}
                      {(() => {
                        const entries = Object.entries(runtimeFlags || {})
                        const numbers = entries.filter(([, v]) => typeof v === 'number').map(([, v]) => Number(v))
                        const maxNumber = numbers.length ? Math.max(...numbers) : 0
                        const stringLens = entries.filter(([, v]) => typeof v === 'string').map(([, v]) => String(v).length)
                        const maxStr = stringLens.length ? Math.max(...stringLens) : 0

                        return (
                          <>
                            <div className="w-full">
                              <h5 className="text-sm mb-2">Flag values (visual)</h5>
                              <div className="space-y-2">
                                {entries.map(([k, v]) => {
                                  const type = v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v
                                  let pct = 0
                                  if (typeof v === 'number') {
                                    pct = maxNumber > 0 ? Math.round((Number(v) / maxNumber) * 100) : 50
                                  } else if (typeof v === 'boolean') {
                                    pct = v ? 100 : 0
                                  } else if (typeof v === 'string') {
                                    pct = maxStr > 0 ? Math.round((String(v).length / maxStr) * 100) : 50
                                  } else {
                                    pct = 0
                                  }

                                  // Use neutral color for non-boolean bars
                                  let barColor = '';
                                  if (typeof v === 'boolean') {
                                    barColor = v ? 'bg-green-500' : 'bg-red-500';
                                  } else if (typeof v === 'number') {
                                    barColor = 'bg-blue-400';
                                  } else if (typeof v === 'string') {
                                    barColor = 'bg-gray-400';
                                  } else {
                                    barColor = 'bg-border';
                                  }
                                  return (
                                    <div key={k} className="flex items-center gap-3">
                                      <div className="w-40 text-sm font-medium truncate">{k}</div>
                                      <div className="flex-1">
                                        <div className="w-full bg-border rounded h-4 overflow-hidden">
                                          <div style={{ width: `${pct}%` }} className={`h-4 ${barColor} rounded`} />
                                        </div>
                                      </div>
                                      <div className="w-32 text-right text-xs text-muted-foreground">
                                        {typeof v === 'string' ? <span className="inline-block max-w-[200px] truncate">"{String(v)}"</span> : <code className="bg-muted/30 p-1 rounded">{String(v)}</code>}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm mb-2">Flag table</h5>
                              <table className="w-full text-sm border-collapse">
                                <thead>
                                  <tr className="text-left text-muted-foreground border-b">
                                    <th className="py-2">Flag</th>
                                    <th className="py-2">Value</th>
                                    <th className="py-2">Type</th>
                                    <th className="py-2">Visual</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {entries.map(([k, v]) => {
                                    const t = v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v
                                    let pct = 0
                                    if (typeof v === 'number') pct = maxNumber > 0 ? Math.round((Number(v) / maxNumber) * 100) : 50
                                    else if (typeof v === 'boolean') pct = v ? 100 : 0
                                    else if (typeof v === 'string') pct = maxStr > 0 ? Math.round((String(v).length / maxStr) * 100) : 50

                                    // Use neutral color for non-boolean bars in table
                                    let barColor = '';
                                    if (typeof v === 'boolean') {
                                      barColor = v ? 'bg-green-500' : 'bg-red-500';
                                    } else if (typeof v === 'number') {
                                      barColor = 'bg-blue-400';
                                    } else if (typeof v === 'string') {
                                      barColor = 'bg-gray-400';
                                    } else {
                                      barColor = 'bg-border';
                                    }
                                    return (
                                      <tr key={k} className="align-top border-b">
                                        <td className="py-2 font-medium">{k}</td>
                                        <td className="py-2"><code className="bg-muted/30 p-1 rounded">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</code></td>
                                        <td className="py-2 text-muted-foreground">{t}</td>
                                        <td className="py-2 w-48">
                                          <div className="w-full bg-border rounded h-3">
                                            <div style={{ width: `${pct}%` }} className={`h-3 ${barColor} rounded`} />
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )}
              <div className="mb-4 bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap text-sm">
                <strong>Redirect flag:</strong><br />
                <code>window.__builderFlags.redirect = '/games';</code><br />
                Allows you to set a custom redirect path for when the close button is clicked in the play overlay or mini-player.
              </div>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`<script src="bundle.js" data-flags="hideDevButton,env=prod,featureX=true"></script>`}</code></pre>
            </DocSection>

            <DocSection id="embedded" title="Embedded data" isVisible={activeSection === 'embedded'}>
              <p>The build embeds JSON and small assets under <code>window.__embeddedData</code>. Keys match the paths listed in <code>files.txt</code> (for example <code>data/games.json</code> or <code>data/config.json</code>).</p>
              <p>At runtime the client will try to fetch the configured endpoint; on failure it falls back to the embedded value. The bundle also includes helper utilities:</p>
              <ul>
                <li><code>Builder.listEmbeddedKeys()</code> — returns available embedded keys.</li>
                <li><code>Builder.downloadEmbedded(key)</code> — trigger download of an embedded JSON asset.</li>
                <li><code>Builder.copyEmbedded(key)</code> — copy embedded JSON to clipboard.</li>
              </ul>
            </DocSection>

            <DocSection id="api-client" title="API client & caching" isVisible={activeSection === 'api-client'}>
              <p>Use <code>window.Builder.fetchGames([url])</code> to fetch the games list. Behavior:</p>
              <ul>
                <li>If a custom API client is present (<code>__builderModules.apiClient.fetchGames</code>), it will be used.</li>
                <li>Otherwise the browser <code>fetch</code> is used.</li>
                <li>On network error the call falls back to embedded JSON (<code>window.__embeddedData['data/games.json']</code> or <code>data/games.sample.json</code>).</li>
                <li>Responses are cached in-memory for the page lifetime; call again to reuse the cached value.</li>
              </ul>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// basic usage
window.Builder.fetchGames().then(games => console.log(games)).catch(err => console.error(err))
`}</code></pre>
            </DocSection>

            <DocSection id="dev-ui" title="Dev menu & UI" isVisible={activeSection === 'examples'}>
              <p>The bundle adds a small floating developer button (bottom-left) with a compact dev menu. Features:</p>
              <ul>
                <li>Open documentation / quick links.</li>
                <li>Show runtime flags.</li>
                <li>List, preview, copy and download embedded assets.</li>
                <li>Try fetching the games endpoint and show the result.</li>
                <li>Toggle the page theme via the <code>data-theme</code> attribute.</li>
              </ul>
              <p>Keyboard shortcut: <strong>Ctrl + Shift + B</strong> toggles the menu.</p>
              <p>The menu uses a small modal for displaying JSON or messages; you can also call it directly:</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// open a modal with text or JSON
window.Builder.openDocsModal('Hello world')
window.Builder.openDocsModal({ ok: true, msg: 'embedded loaded' })
`}</code></pre>
            </DocSection>

            <DocSection id="play" title="Play overlay & mini-player" isVisible={activeSection === 'play'}>
              <p>The bundle includes a play overlay for previewing games and a compact "play in panel" mini-player that runs inside the dev menu.</p>
              <p>Use <code>window.Play.open(url)</code> to open a full-screen iframe overlay. The overlay includes a header (matching the mini-player theme) with controls:</p>
              <ul>
                <li>Fullscreen toggle</li>
                <li>Show/hide performance stats (FPS)</li>
                <li>Close overlay</li>
              </ul>
              <p>Examples:</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// open a specific url in the fullscreen overlay
// open by game id (numeric id or title)
window.Play.open('1')

// open the first game's playUrl from the games list (network-first, falls back to embedded)
window.Builder.fetchGames().then(games => {
  const g = (games && games[0]) || null
  if (g && g.playUrl) window.Play.open(g.playUrl)
})
`}</code></pre>
              <p className="mt-3">Programmatic mini-player: use <code>Builder.openMiniPlayer(arg)</code>. Examples:</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// open the first game in a compact mini-player (no arg)
window.Builder.openMiniPlayer()

// open by id/slug/title (resolved against the games list)
window.Builder.openMiniPlayer('1')
window.Builder.openMiniPlayer('among-us')

// open by absolute or relative url
window.Builder.openMiniPlayer('https://example.com/play/game')
window.Builder.openMiniPlayer('/play/123')

// pass an object with url and title
window.Builder.openMiniPlayer({ playUrl: '/play/123', title: 'Preview' })
`}</code></pre>
              <p>Play-in-panel: use the dev menu's <strong>Play in panel</strong> action to open a compact iframe anchored above the dev menu. This is useful for quick previews without leaving the page.</p>
              <p>Mini-player features:</p>
              <ul>
                <li>Resizable: drag the small handle in the mini-player's bottom-right while holding the mouse/finger to resize (min: 200×120).</li>
                <li>Draggable: drag the header to move the mini-player.</li>
                <li>Stats widget: click the <strong>Stats</strong> button in the mini-player header to attach a small FPS widget inside the mini-player (placed below the header so it won't overlap header buttons). Click again to remove.</li>
                <li>Fullscreen: the mini-player and fullscreen overlay use the same header styling for a consistent look.</li>
              </ul>
            </DocSection>

            <DocSection id="examples" title="Examples" isVisible={activeSection === 'examples'}>
              <h3>Fetch with override</h3>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`window.Builder.fetchGames('http://localhost:3000/data/games.json')`}</code></pre>
              <h3>Read flags / get a single flag</h3>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// read all flags
const flags = window.Builder.flags()
// read a single flag with a default
const env = window.Builder.getFlag('env', 'dev')
`}</code></pre>
              <h3>Inspect embedded assets</h3>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// list keys
console.log(window.Builder.listEmbeddedKeys())
// preview and copy
window.Builder.copyEmbedded('data/games.json')
// download
window.Builder.downloadEmbedded('data/games.json')
`}</code></pre>
              <h3>Programmatic theme toggle</h3>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`// toggles document.documentElement data-theme between 'light' and 'dark'
window.Builder.toggleTheme()
`}</code></pre>
              <h3>Global flags</h3>
              <p>Set flags programmatically before the bundle loads:</p>
              <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap"><code>{`<script>window.__builderFlags = { hideDevButton: true }</script>
<script src="bundle.js"></script>`}</code></pre>
            </DocSection>

            <DocSection id="troubleshooting" title="Troubleshooting" isVisible={activeSection === 'troubleshooting'}>
              <ul>
                <li>If <code>window.Builder</code> is undefined, ensure the bundle is loaded and not blocked by CSP.</li>
                <li>If embedded assets are missing, re-run the build and check <code>api-development/dist/manifest.json</code>.</li>
                <li>If fetch calls always fail, check the configured <code>data/config.json</code> and network settings; the bundle will fall back to embedded data when possible.</li>
                <li>Use the developer floating button or <code>Builder</code> API to inspect embedded assets and flags.</li>
              </ul>
              <div className="mt-8">
                <Link href="/" className="text-primary">Back to home</Link>
              </div>
            </DocSection>
          </article>
        </div>
      </div>

 <Footer />
    </main>
  )
}
