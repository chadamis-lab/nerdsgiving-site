"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"

const TARGET_DATE_MS = new Date(2027, 1, 20, 0, 0, 0).getTime()

const MAILERLITE_ACTION =
  "https://assets.mailerlite.com/jsonp/2197156/forms/182130170613728782/subscribe"

const ALL_GLYPHS = [
  {
    id: "controller",
    className: "left-[6%] top-[8%] text-2xl text-violet-300/90 hidden sm:block",
    symbol: "🎮",
    duration: 9,
    delay: 0.2,
  },
  {
    id: "spark",
    className: "left-[10%] top-[42%] text-5xl text-fuchsia-300/55 hidden sm:block",
    symbol: "✦",
    duration: 7,
    delay: 0.8,
  },
  {
    id: "infinity",
    className: "left-[24%] top-[26%] text-3xl text-emerald-300/80",
    symbol: "∞",
    duration: 8.5,
    delay: 0.4,
  },
  {
    id: "command",
    className: "right-[8%] top-[14%] text-xl text-violet-200/60 hidden sm:block",
    symbol: "⌘",
    duration: 10,
    delay: 0.1,
  },
  {
    id: "bolt",
    className: "right-[8%] top-[34%] text-5xl text-fuchsia-400/80",
    symbol: "⚡",
    duration: 7.5,
    delay: 1.1,
  },
  {
    id: "wand",
    className: "left-[42%] top-[58%] text-5xl text-fuchsia-300/35 hidden sm:block",
    symbol: "🪄",
    duration: 9.5,
    delay: 0.5,
  },
  {
    id: "square",
    className: "left-[58%] top-[74%] text-4xl text-violet-200/30 hidden sm:block",
    symbol: "▣",
    duration: 8.8,
    delay: 0.7,
  },
  {
    id: "rook",
    className: "right-[20%] bottom-[24%] text-5xl text-emerald-300/70",
    symbol: "♜",
    duration: 8.2,
    delay: 0.3,
  },
  {
    id: "ring",
    className: "right-[6%] bottom-[10%] text-3xl text-cyan-300/55 hidden sm:block",
    symbol: "◎",
    duration: 9.2,
    delay: 0.9,
  },
  {
    id: "d20",
    className: "left-[12%] bottom-[18%] text-amber-200/65",
    symbol: "d20",
    duration: 8.7,
    delay: 0.6,
  },
  {
    id: "puzzle",
    className: "right-[18%] top-[52%] text-3xl text-cyan-200/50 hidden sm:block",
    symbol: "🧩",
    duration: 9.8,
    delay: 0.4,
  },
  {
    id: "alien",
    className: "left-[18%] top-[18%] text-3xl text-fuchsia-200/45 hidden sm:block",
    symbol: "👾",
    duration: 7.9,
    delay: 1.2,
  },
  {
    id: "ufo",
    className: "right-[28%] top-[8%] text-2xl text-emerald-200/45 hidden sm:block",
    symbol: "🛸",
    duration: 10.4,
    delay: 0.5,
  },
  {
    id: "brain",
    className: "left-[8%] top-[70%] text-3xl text-cyan-200/55 hidden sm:block",
    symbol: "🧠",
    duration: 8.9,
    delay: 0.2,
  },
  {
    id: "target",
    className: "right-[12%] top-[68%] text-3xl text-violet-200/55 hidden sm:block",
    symbol: "🎯",
    duration: 9.1,
    delay: 0.7,
  },
]

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE_MS - Date.now())

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownCard({ value, label }) {
  return (
    <div
      className="relative w-full max-w-[156px] sm:w-[152px] md:w-[176px]"
      aria-label={`${value} ${label.toLowerCase()}`}
    >
      <div className="absolute inset-0 rounded-[22px] bg-fuchsia-500/20 blur-xl" />
      <div
        className="relative rounded-[22px] border border-white/10 bg-[#171126]/90 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8"
        style={{ animation: "pulseGlow 4.5s ease-in-out infinite" }}
      >
        <div className="text-[38px] font-black tracking-[-0.05em] text-[#d06dff] sm:text-[52px] md:text-[62px]">
          {String(value).padStart(2, "0")}
        </div>
        <div className="mt-2 text-[12px] tracking-[0.22em] text-zinc-400 sm:text-[13px]">
          {label}
        </div>
      </div>
    </div>
  )
}

function FloatingGlyph({ className, children, duration = 8, delay = 0, reduceMotion = false }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute select-none ${className}`}
      style={{
        animation: reduceMotion ? "none" : `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  )
}

function D20Icon() {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-[1.15em] w-[1.15em] drop-shadow-[0_0_14px_rgba(196,76,255,0.45)]"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="45%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      <polygon
        points="50,6 86,30 74,76 26,76 14,30"
        fill={`url(#${gradientId})`}
        fillOpacity="0.16"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M50 6 50 76M14 30 50 6 86 30M26 76 50 6 74 76M14 30 50 76 86 30"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
      <text
        x="50"
        y="48"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fontWeight="900"
        fill="#fdf4ff"
      >
        20
      </text>
    </svg>
  )
}

export default function NerdsgivingPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const rafRef = useRef(0)
  const hiddenFormRef = useRef(null)

  useEffect(() => {
    const updateViewportMode = () => {
      setIsMobile(window.innerWidth < 640)
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateReducedMotion = () => {
      setReduceMotion(mediaQuery.matches)
    }

    updateViewportMode()
    updateReducedMotion()

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    const handleMove = (e) => {
      if (window.innerWidth < 640 || mediaQuery.matches) return
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        setMouse({ x, y })
      })
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("resize", updateViewportMode)

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateReducedMotion)
    } else {
      mediaQuery.addListener(updateReducedMotion)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("resize", updateViewportMode)

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateReducedMotion)
      } else {
        mediaQuery.removeListener(updateReducedMotion)
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const cards = useMemo(
    () => [
      { value: timeLeft.days, label: "DAYS" },
      { value: timeLeft.hours, label: "HOURS" },
      { value: timeLeft.minutes, label: "MINUTES" },
      { value: timeLeft.seconds, label: "SECONDS" },
    ],
    [timeLeft]
  )

  const particles = useMemo(() => {
    const count = isMobile ? 12 : 24
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${8 + ((i * 19) % 84)}%`,
      left: `${4 + ((i * 23) % 92)}%`,
      delay: `${(i % 7) * 0.6}s`,
      duration: `${3.2 + (i % 5) * 0.9}s`,
    }))
  }, [isMobile])

  const glyphs = useMemo(() => {
    const visibleGlyphs = isMobile
      ? ALL_GLYPHS.filter((glyph) => !glyph.className.includes("hidden sm:block"))
      : ALL_GLYPHS

    return visibleGlyphs.map((glyph) => ({
      ...glyph,
      symbol: glyph.symbol === "d20" ? <D20Icon key={glyph.id} /> : glyph.symbol,
    }))
  }, [isMobile])

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email.trim() || isSubmitting || subscribed) return

    setIsSubmitting(true)
    setSubmitError("")
    setSuccessMessage("")

    try {
      if (!hiddenFormRef.current) {
        throw new Error("MailerLite form is not ready.")
      }

      hiddenFormRef.current.submit()

      setSubscribed(true)
      setSuccessMessage(
        "You’re in. Check your inbox for the welcome email and future Nerdsgiving updates."
      )
      setEmail("")
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const mouseX = reduceMotion ? 0 : mouse.x
  const mouseY = reduceMotion ? 0 : mouse.y

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 0 34px rgba(196,76,255,0.32), 0 0 90px rgba(111,86,255,0.14);
          }
          50% {
            box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 0 48px rgba(196,76,255,0.48), 0 0 110px rgba(111,86,255,0.22);
          }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.35); }
        }
      `}</style>

      <div className="min-h-screen overflow-hidden bg-[#05030d] text-white">
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(72,34,140,0.32),transparent_28%),radial-gradient(circle_at_15%_50%,rgba(209,56,255,0.14),transparent_22%),radial-gradient(circle_at_85%_60%,rgba(0,210,255,0.14),transparent_22%),linear-gradient(to_bottom,#080512,#05030d_42%,#05030d)]" />

          <div
            className="absolute -left-24 top-[28%] -z-10 h-[460px] w-[460px] rounded-full bg-fuchsia-600/20 blur-[150px]"
            style={{ transform: `translate(${mouseX * -16}px, ${mouseY * -18}px)` }}
          />
          <div
            className="absolute -right-20 bottom-[18%] -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/18 blur-[140px]"
            style={{ transform: `translate(${mouseX * 18}px, ${mouseY * 14}px)` }}
          />

          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute h-1 w-1 rounded-full bg-white/70"
                style={{
                  top: particle.top,
                  left: particle.left,
                  animation: reduceMotion
                    ? "none"
                    : `twinkle ${particle.duration} ease-in-out ${particle.delay} infinite`,
                  boxShadow: "0 0 10px rgba(255,255,255,0.35)",
                  opacity: reduceMotion ? 0.35 : undefined,
                }}
              />
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{ transform: `translate(${mouseX * 10}px, ${mouseY * 10}px)` }}
          >
            {glyphs.map((glyph) => (
              <FloatingGlyph
                key={glyph.id}
                className={glyph.className}
                duration={glyph.duration}
                delay={glyph.delay}
                reduceMotion={reduceMotion}
              >
                {glyph.symbol}
              </FloatingGlyph>
            ))}
          </div>

          <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[14px] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:px-6 sm:text-[15px]">
              <span className="text-violet-400">✦</span>
              <span>The 3rd Saturday of February</span>
            </div>

            <h1 className="text-[42px] font-black leading-none tracking-[-0.06em] sm:text-[88px] md:text-[118px] lg:text-[142px]">
              <span className="text-[#f4f4f7]">NERDS</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #b55cff, #cf6cff, #7dd3fc, #df7aff, #b55cff)",
                  backgroundSize: "200% 200%",
                  animation: reduceMotion ? "none" : "shimmer 8s ease-in-out infinite",
                }}
              >
                GIVING
              </span>
            </h1>

            <p className="mt-6 max-w-4xl px-2 text-[17px] leading-[1.55] text-zinc-400 sm:mt-8 sm:text-[23px] md:text-[26px]">
              A celebration of gratitude, geekdom, and great times. Where nerds unite to feast,
              game, and give thanks for the things we love.
            </p>

            <div className="mt-14 flex items-center gap-3 text-[20px] font-extrabold tracking-[-0.03em] text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.22)] sm:mt-16 sm:text-[28px]">
              <span className="text-[24px] sm:text-[28px]">⏱️</span>
              <span>Countdown to Nerdsgiving</span>
            </div>

            <div className="mt-4 text-[16px] text-zinc-300 sm:mt-5 sm:text-[22px]">
              Saturday, February 20, 2027
            </div>

            <div
              className="mt-8 grid w-full max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 md:gap-5"
              aria-live="polite"
              aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until Nerdsgiving`}
            >
              {cards.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5"
                >
                  <CountdownCard value={item.value} label={item.label} />
                  {index < cards.length - 1 && (
                    <div className="hidden text-[40px] font-thin text-violet-400/75 sm:block">
                      :
                    </div>
                  )}
                </div>
              ))}
            </div>

            <section className="mt-24 w-full max-w-6xl">
              <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
                    <span>🧠</span>
                    <span>What is Nerdsgiving?</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                    Part holiday, part hangout, part celebration of everything nerdy.
                  </h2>
                  <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
                    Nerdsgiving is a made-up holiday with very real energy: a day for games,
                    fandoms, friendship, snacks, inside jokes, and gratitude for the hobbies and
                    communities that make life fun.
                  </p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <div className="text-sm font-semibold text-fuchsia-300">
                        Celebrate your fandoms
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Board games, video games, sci-fi, fantasy, comics, coding, cosplay, and
                        every niche obsession in between.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <div className="text-sm font-semibold text-cyan-300">
                        Gather your people
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Host a themed dinner, a LAN party, a one-shot campaign, or just a low-key
                        night with your favorite crew.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <div className="text-sm font-semibold text-emerald-300">
                        Share the gratitude
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Give thanks for the stories, tech, creators, and communities that helped
                        shape who you are.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <div className="text-sm font-semibold text-violet-300">Make it your own</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Every Nerdsgiving can look different: cozy or chaotic, online or in person,
                        wholesome or gloriously over-the-top.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0f0a19]/90 p-7 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-8 md:p-10">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  <div className="absolute -left-10 bottom-10 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />
                  <div className="relative">
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                      The vibe
                    </div>
                    <div className="mt-4 space-y-4">
                      {[
                        [<D20Icon key="vibe-d20" />, "Game night energy"],
                        ["🍕", "Comfort food and snacks"],
                        ["🛸", "Sci-fi, fantasy, and fandom chaos"],
                        ["💜", "Gratitude for the things you love"],
                      ].map(([icon, label]) => (
                        <div
                          key={label}
                          className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl">
                            {icon}
                          </div>
                          <div className="text-base font-medium text-zinc-200">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 w-full max-w-4xl">
              <div className="mb-4 px-1 text-sm text-zinc-500 sm:hidden">
                Built to look great on phones too.
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 md:p-10">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                    <span>✉️</span>
                    <span>Nerdletter Signup</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                    Join the mailing list for updates, invites, and launch drops.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
                    Subscribe to get a welcome email instantly, then stay on the full Nerdsgiving
                    list for future announcements, schedule updates, and special event drops.
                  </p>
                </div>

                <form
                  className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row"
                  onSubmit={handleSubscribe}
                >
                  <div className="relative flex-1">
                    <div className="absolute inset-0 rounded-2xl bg-fuchsia-500/15 blur-lg" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="relative h-14 w-full rounded-2xl border border-white/10 bg-[#100b1b]/90 px-5 text-white outline-none placeholder:text-zinc-500 focus:border-fuchsia-400/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribed || isSubmitting}
                    className="h-14 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-8 text-base font-semibold text-white shadow-[0_12px_40px_rgba(167,80,255,0.35)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:px-7"
                  >
                    {isSubmitting ? "Subscribing..." : subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </form>

                <form
                  ref={hiddenFormRef}
                  action={MAILERLITE_ACTION}
                  method="post"
                  target="_blank"
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <input type="email" name="fields[email]" value={email} readOnly />
                  <input type="hidden" name="ml-submit" value="1" />
                  <input type="hidden" name="anticsrf" value="true" />
                </form>

                {successMessage && (
                  <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-left text-sm text-emerald-200">
                    {successMessage}
                  </div>
                )}

                {submitError && (
                  <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-left text-sm text-rose-200">
                    {submitError}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}