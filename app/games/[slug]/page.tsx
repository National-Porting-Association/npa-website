"use client"

import { useEffect, useState } from 'react'

export default function GamePage() {
	const [scriptLoaded, setScriptLoaded] = useState(false)
	const [opened, setOpened] = useState(false)

	useEffect(() => {
		try {
			try {
  				(window as any).__builderFlags = (window as any).__builderFlags || {};
				(window as any).__builderFlags.hideDevButton = true;
  				(window as any).__builderFlags.redirect = '/games';
			} 
			catch (e) {}
			if (!document.querySelector('script[data-npa]')) {
				const s = document.createElement('script')
				s.setAttribute('data-npa', '1')
				s.src = '/api/npa.js'
				s.async = true
				s.onload = () => { setScriptLoaded(true); try { resolveAndOpen(); } catch (e) {} }
				document.body.appendChild(s)
			} else {
				setScriptLoaded(true)
				try { resolveAndOpen(); } catch (e) {}
			}
		} catch (e) {
			// ignore
		}

		function resolveAndOpen() {
			try {
				const search = new URLSearchParams(window.location.search)
				const qid = search.get('gameid')
				let slug = qid
				if (!slug) {
					const m = window.location.pathname.match(/\/games\/(?:@?([^\/\?#]+))/)
					if (m && m[1]) slug = decodeURIComponent(m[1])
				}
				if (!slug) return false

				const tryCall = () => {
					try {
									if ((window as any).Play && typeof (window as any).Play.open === 'function') {
														// avoid double-opening the player (some environments may call this twice)
														if ((window as any).__npa_player_opened) return true
														try { (window as any).__npa_player_opened = true } catch (e) {}
														(window as any).Play.open(String(slug))
															setOpened(true)
															return true
													}
					} catch (e) {}
					return false
				}

				if (!tryCall()) {
					let attempts = 0
					const iv = setInterval(() => {
						attempts++
						if (tryCall() || attempts > 30) clearInterval(iv)
					}, 200)
				}
			} catch (e) {}
		}

		resolveAndOpen()
		const onLoad = () => resolveAndOpen()
		window.addEventListener('builder:loaded', onLoad)
		return () => window.removeEventListener('builder:loaded', onLoad)
	}, [])

	return (
		<main className="min-h-screen p-8">
			<h1 className="text-2xl font-bold mb-4">Game preview</h1>
			<div className="space-y-3">
				<div>Script loaded: {String(scriptLoaded)}</div>
				<div>Player opened: {String(opened)}</div>
				<button
					className="btn"
					onClick={() => {
						try {
							const search = new URLSearchParams(window.location.search)
							const qid = search.get('gameid')
							let slug = qid
							if (!slug) {
								const m = window.location.pathname.match(/\/games\/(?:@?([^\/\?#]+))/)
								if (m && m[1]) slug = decodeURIComponent(m[1])
							}
							if (!slug) return
											  if ((window as any).Play && typeof (window as any).Play.open === 'function') {
													if ((window as any).__npa_player_opened) return
													try { (window as any).__npa_player_opened = true } catch (e) {}
													(window as any).Play.open(String(slug))
									setOpened(true)
								}
						} catch (e) {}
					}}
				>Open player</button>
			</div>
		</main>
	)
}

