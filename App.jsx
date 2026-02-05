// App.jsx
// District / BookMyShow-like Movies page — ONE FILE
// ✅ No shadcn/ui
// ✅ No alias @
// ✅ Works with: Vite + React + Tailwind
// ✅ Only extra packages: framer-motion, lucide-react
//
// How to run (local):
// 1) npm create vite@latest district-one -- --template react
// 2) cd district-one && npm i
// 3) npm i framer-motion lucide-react
// 4) Setup Tailwind (see steps in chat)
// 5) Replace src/App.jsx with this file
// 6) npm run dev
//
// Deploy (GitHub + Vercel):
// - Push repo to GitHub
// - Import in Vercel

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  PlayCircle,
  Search,
  Star,
  Ticket,
  UserCircle2,
  X,
} from "lucide-react";

// -------------------------
// Data (replace with your API later)
// -------------------------
const MOVIES = [
  {
    id: "border-2",
    title: "Border 2",
    cert: "UA13+",
    genres: ["Action", "Drama"],
    lang: "Hindi",
    durationMins: 152,
    rating: 4.3,
    votes: 18243,
    status: "Now Showing",
    format: ["2D"],
    banner:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "A high-stakes story of courage and sacrifice on the frontlines. A new chapter of a legacy begins.",
    cast: ["Lead Actor", "Lead Actress", "Supporting Actor"],
  },
  {
    id: "skyline",
    title: "Skyline Run",
    cert: "UA",
    genres: ["Thriller", "Adventure"],
    lang: "English",
    durationMins: 126,
    rating: 4.0,
    votes: 9012,
    status: "Now Showing",
    format: ["2D", "IMAX"],
    banner:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "A fast-paced chase across a city skyline where one mistake changes everything.",
    cast: ["Actor A", "Actor B"],
  },
  {
    id: "mystic-river",
    title: "Mystic River",
    cert: "U",
    genres: ["Drama", "Mystery"],
    lang: "Hindi",
    durationMins: 140,
    rating: 4.6,
    votes: 21045,
    status: "Now Showing",
    format: ["2D"],
    banner:
      "https://images.unsplash.com/photo-1522120692538-0f23f7c9d6d7?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "A missing clue, a hidden truth, and a mystery that refuses to stay buried.",
    cast: ["Actor X", "Actor Y", "Actor Z"],
  },
  {
    id: "comicverse",
    title: "ComicVerse",
    cert: "UA13+",
    genres: ["Action", "Sci-Fi"],
    lang: "English",
    durationMins: 164,
    rating: 4.1,
    votes: 15500,
    status: "Now Showing",
    format: ["3D", "IMAX"],
    banner:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "A multiverse collision. Heroes rise, timelines break, and the final battle begins.",
    cast: ["Hero 1", "Hero 2", "Villain"],
  },
  {
    id: "desi-dil",
    title: "Desi Dil",
    cert: "U",
    genres: ["Romance", "Comedy"],
    lang: "Hindi",
    durationMins: 132,
    rating: 3.9,
    votes: 7201,
    status: "Now Showing",
    format: ["2D"],
    banner:
      "https://images.unsplash.com/photo-1522120692538-0f23f7c9d6d7?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "A sweet love story with chaos, comedy, and a little bit of destiny.",
    cast: ["Actor M", "Actor N"],
  },
  {
    id: "krrish-x",
    title: "Krrish X",
    cert: "UA13+",
    genres: ["Action", "Fantasy"],
    lang: "Hindi",
    durationMins: 158,
    rating: 4.2,
    votes: 11110,
    status: "Coming Soon",
    format: ["2D"],
    banner:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop",
    synopsis:
      "The next evolution of a beloved superhero. New powers. New enemies.",
    cast: ["Superhero", "Scientist", "Antagonist"],
  },
];

const LOCATIONS = [
  { city: "Gurugram", state: "Haryana" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Surat", state: "Gujarat" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
];

const NAV_ITEMS = ["For you", "Dining", "Movies", "Events", "Stores", "Activities", "Play"];

// -------------------------
// Small helpers
// -------------------------
function minutesToHrMin(m) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}h ${mm}m`;
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// -------------------------
// Reusable UI components (no libraries)
// -------------------------
function Btn({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    primary: "bg-zinc-950 text-white hover:bg-zinc-900",
    outline: "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",
    ghost: "bg-transparent text-zinc-800 hover:bg-zinc-100",
    soft: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(base, styles[variant] || styles.primary, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

function Badge({ children, variant = "soft", className = "" }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  const styles = {
    soft: "bg-zinc-100 text-zinc-900",
    outline: "border border-zinc-200 bg-white text-zinc-900",
    dark: "bg-zinc-950 text-white",
  };
  return <span className={cx(base, styles[variant] || styles.soft, className)}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={cx("rounded-[22px] border border-zinc-200 bg-white shadow-sm", className)}>{children}</div>;
}

function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx(
        "h-11 w-full rounded-full border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-950/10 focus:ring-4",
        className
      )}
    />
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <motion.div
          className="absolute left-1/2 top-1/2 w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] bg-white shadow-xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// -------------------------
// App
// -------------------------
export default function App() {
  const [activeNav, setActiveNav] = useState("Movies");
  const [location, setLocation] = useState(LOCATIONS[0]);

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("now"); // now | soon
  const [sort, setSort] = useState("popularity");

  const [langs, setLangs] = useState(new Set());
  const [genres, setGenres] = useState(new Set());
  const [formats, setFormats] = useState(new Set());

  const [heroIndex, setHeroIndex] = useState(0);
  const [openMovie, setOpenMovie] = useState(null);

  const heroMovies = useMemo(() => {
    const now = MOVIES.filter((m) => m.status === "Now Showing");
    return now.length ? now : MOVIES;
  }, []);

  const activeHero = heroMovies[clamp(heroIndex, 0, heroMovies.length - 1)];

  const allLangs = useMemo(() => {
    const s = new Set();
    MOVIES.forEach((m) => s.add(m.lang));
    return [...s].sort();
  }, []);

  const allGenres = useMemo(() => {
    const s = new Set();
    MOVIES.forEach((m) => m.genres.forEach((g) => s.add(g)));
    return [...s].sort();
  }, []);

  const allFormats = useMemo(() => {
    const s = new Set();
    MOVIES.forEach((m) => m.format.forEach((f)) => s.add(f));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MOVIES.slice();

    if (tab === "now") list = list.filter((m) => m.status === "Now Showing");
    if (tab === "soon") list = list.filter((m) => m.status === "Coming Soon");

    if (q) {
      list = list.filter((m) => {
        const hay = `${m.title} ${m.lang} ${m.genres.join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (langs.size) list = list.filter((m) => langs.has(m.lang));
    if (genres.size) list = list.filter((m) => m.genres.some((g) => genres.has(g)));
    if (formats.size) list = list.filter((m) => m.format.some((f) => formats.has(f)));

    if (sort === "popularity") list.sort((a, b) => b.votes - a.votes);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "duration") list.sort((a, b) => a.durationMins - b.durationMins);
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [query, tab, sort, langs, genres, formats]);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroMovies.length);
    }, 6500);
    return () => clearInterval(id);
  }, [heroMovies.length]);

  function toggleInSet(setter, value) {
    setter((prev) => {
      const n = new Set(prev);
      if (n.has(value)) n.delete(value);
      else n.add(value);
      return n;
    });
  }

  function clearAll() {
    setQuery("");
    setSort("popularity");
    setLangs(new Set());
    setGenres(new Set());
    setFormats(new Set());
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <TopNav
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        location={location}
        setLocation={setLocation}
      />

      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 pt-6">
          <div className="relative overflow-hidden rounded-[28px] border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white shadow-sm">
            <div className="absolute inset-0">
              <img src={activeHero.banner} alt="hero" className="h-full w-full object-cover opacity-[0.12]" />
            </div>

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-2">
                  <Badge>{activeHero.cert}</Badge>
                  <Badge variant="outline">{activeHero.status}</Badge>
                  <div className="ml-1 flex items-center gap-1 text-sm text-zinc-700">
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">{activeHero.rating}</span>
                    <span className="text-zinc-500">({activeHero.votes.toLocaleString()})</span>
                  </div>
                </div>

                <h1 className="text-4xl font-black tracking-tight md:text-6xl">{activeHero.title}</h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-700">
                  <span className="font-semibold">{activeHero.lang}</span>
                  <span className="text-zinc-400">•</span>
                  <span>{activeHero.genres.join(", ")}</span>
                  <span className="text-zinc-400">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {minutesToHrMin(activeHero.durationMins)}
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span>{activeHero.format.join(" / ")}</span>
                </div>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">{activeHero.synopsis}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Btn className="px-7 py-3" onClick={() => setOpenMovie(activeHero)}>
                    <Ticket className="h-5 w-5" /> Book now
                  </Btn>
                  <Btn variant="outline" className="px-7 py-3" onClick={() => setOpenMovie(activeHero)}>
                    <PlayCircle className="h-5 w-5" /> Watch trailer
                  </Btn>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <Btn
                    variant="ghost"
                    className="h-10 w-10 rounded-full p-0"
                    onClick={() => setHeroIndex((i) => (i - 1 + heroMovies.length) % heroMovies.length)}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Btn>

                  <div className="flex items-center gap-2">
                    {heroMovies.map((_, i) => (
                      <button
                        key={i}
                        className={cx(
                          "h-2.5 w-2.5 rounded-full transition",
                          i === heroIndex ? "bg-zinc-950" : "bg-zinc-300"
                        )}
                        onClick={() => setHeroIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <Btn
                    variant="ghost"
                    className="h-10 w-10 rounded-full p-0"
                    onClick={() => setHeroIndex((i) => (i + 1) % heroMovies.length)}
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Btn>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <motion.div
                  key={activeHero.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-[360px]"
                >
                  <div className="relative overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-sm">
                    <img src={activeHero.poster} alt={activeHero.title} className="aspect-[3/4] w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4">
                      <div className="text-sm font-semibold text-white">{activeHero.title}</div>
                      <div className="mt-1 text-xs text-white/80">
                        {activeHero.cert} • {activeHero.lang} • {activeHero.genres[0]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-4 rounded-[22px] border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, genres, languages..."
                className="pl-11"
              />
            </div>

            <div className="flex w-full items-center gap-2 md:w-auto">
              <TabBtn active={tab === "now"} onClick={() => setTab("now")}>
                Now Showing
              </TabBtn>
              <TabBtn active={tab === "soon"} onClick={() => setTab("soon")}>
                Coming Soon
              </TabBtn>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-11 w-[190px] appearance-none rounded-full border border-zinc-200 bg-white px-4 pr-10 text-sm font-semibold outline-none ring-zinc-950/10 focus:ring-4"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="duration">Duration</option>
                <option value="az">A → Z</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>

            <Btn variant="outline" className="h-11" onClick={clearAll}>
              Clear
            </Btn>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <FiltersPanel
            allLangs={allLangs}
            allGenres={allGenres}
            allFormats={allFormats}
            langs={langs}
            genres={genres}
            formats={formats}
            toggleLang={(v) => toggleInSet(setLangs, v)}
            toggleGenre={(v) => toggleInSet(setGenres, v)}
            toggleFormat={(v) => toggleInSet(setFormats, v)}
          />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-zinc-600">
                Showing <span className="font-semibold text-zinc-950">{filtered.length}</span> movies in{" "}
                <span className="font-semibold text-zinc-950">{location.city}</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <MovieCard key={m.id} movie={m} onOpen={() => setOpenMovie(m)} />
              ))}
            </div>

            {!filtered.length && (
              <div className="mt-10 rounded-[22px] border border-zinc-200 bg-zinc-50 p-8 text-center">
                <div className="text-lg font-bold">No movies found</div>
                <div className="mt-1 text-sm text-zinc-600">Try clearing filters or searching a different name.</div>
                <Btn className="mt-4" onClick={clearAll}>
                  Reset
                </Btn>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <Modal open={!!openMovie} onClose={() => setOpenMovie(null)}>
        {openMovie && <MovieModal movie={openMovie} onClose={() => setOpenMovie(null)} />}
      </Modal>
    </div>
  );
}

// -------------------------
// TopNav
// -------------------------
function TopNav({ activeNav, setActiveNav, location, setLocation }) {
  const [openLoc, setOpenLoc] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-950 text-white">
              <span className="text-sm font-black">d</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight">district</div>
              <div className="text-[11px] font-semibold text-zinc-500">by zomato</div>
            </div>
          </div>

          {/* Location */}
          <div className="relative hidden md:block">
            <Btn variant="ghost" className="h-10" onClick={() => setOpenLoc((v) => !v)}>
              <MapPin className="h-4 w-4" />
              <span className="font-semibold">{location.city}</span>
              <span className="ml-1 text-zinc-500">{location.state}</span>
            </Btn>

            <AnimatePresence>
              {openLoc && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-[52px] w-[320px] overflow-hidden rounded-[18px] border border-zinc-200 bg-white shadow-lg"
                >
                  <div className="p-3">
                    <div className="mb-2 text-xs font-semibold text-zinc-500">Choose city</div>
                    <div className="grid gap-1">
                      {LOCATIONS.map((l) => (
                        <button
                          key={l.city}
                          className={cx(
                            "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-zinc-50",
                            l.city === location.city ? "bg-zinc-50" : ""
                          )}
                          onClick={() => {
                            setLocation(l);
                            setOpenLoc(false);
                          }}
                        >
                          <span className="font-semibold">{l.city}</span>
                          <span className="text-zinc-500">{l.state}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = item === activeNav;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "bg-zinc-100 text-zinc-950" : "text-zinc-600 hover:bg-zinc-50"
                )}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Btn variant="ghost" className="h-10 w-10 rounded-full p-0" aria-label="Search">
            <Search className="h-5 w-5" />
          </Btn>
          <Btn variant="ghost" className="h-10 w-10 rounded-full p-0" aria-label="Account">
            <UserCircle2 className="h-5 w-5" />
          </Btn>
        </div>
      </div>
    </header>
  );
}

function TabBtn({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "h-11 flex-1 rounded-full px-4 text-sm font-bold transition md:flex-none",
        active ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
      )}
    >
      {children}
    </button>
  );
}

// -------------------------
// Filters
// -------------------------
function FiltersPanel({ allLangs, allGenres, allFormats, langs, genres, formats, toggleLang, toggleGenre, toggleFormat }) {
  return (
    <aside className="rounded-[22px] border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <div className="text-sm font-black">Filters</div>
      </div>

      <div className="space-y-4">
        <Group title="Language">
          <div className="grid gap-2">
            {allLangs.map((l) => (
              <CheckRow key={l} label={l} checked={langs.has(l)} onClick={() => toggleLang(l)} />
            ))}
          </div>
        </Group>

        <Divider />

        <Group title="Genre">
          <div className="grid gap-2">
            {allGenres.map((g) => (
              <CheckRow key={g} label={g} checked={genres.has(g)} onClick={() => toggleGenre(g)} />
            ))}
          </div>
        </Group>

        <Divider />

        <Group title="Format">
          <div className="grid gap-2">
            {allFormats.map((f) => (
              <CheckRow key={f} label={f} checked={formats.has(f)} onClick={() => toggleFormat(f)} />
            ))}
          </div>
        </Group>
      </div>
    </aside>
  );
}

function Group({ title, children }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{title}</div>
      {children}
    </div>
  );
}

function CheckRow({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-zinc-50",
        checked ? "bg-zinc-50" : ""
      )}
    >
      <span
        className={cx(
          "grid h-5 w-5 place-items-center rounded-md border text-[12px] font-black",
          checked ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-300 bg-white text-transparent"
        )}
      >
        ✓
      </span>
      <span className="text-sm font-semibold text-zinc-800">{label}</span>
    </button>
  );
}

// -------------------------
// Movie Card
// -------------------------
function MovieCard({ movie, onOpen }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={movie.poster} alt={movie.title} className="aspect-[3/4] w-full object-cover" loading="lazy" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge>{movie.cert}</Badge>
          <Badge variant={movie.status === "Now Showing" ? "dark" : "outline"}>{movie.status}</Badge>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-black text-white">{movie.title}</div>
            <div className="flex items-center gap-1 text-xs text-white/90">
              <Star className="h-4 w-4" />
              <span className="font-bold">{movie.rating}</span>
            </div>
          </div>
          <div className="mt-1 text-xs text-white/75">{movie.lang} • {movie.genres.join(", ")}</div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {movie.format.map((f) => (
            <Badge key={f} variant="outline">{f}</Badge>
          ))}
          <Badge variant="outline">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {minutesToHrMin(movie.durationMins)}
          </Badge>
        </div>

        <Btn className="w-full" onClick={onOpen}>
          <Ticket className="h-4 w-4" /> Book now
        </Btn>
      </div>
    </Card>
  );
}

// -------------------------
// Movie Modal
// -------------------------
function MovieModal({ movie, onClose }) {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img src={movie.banner} alt="banner" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white" />
      </div>

      <div className="relative p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm md:block">
              <img src={movie.poster} alt={movie.title} className="h-[170px] w-[130px] object-cover" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black tracking-tight md:text-3xl">{movie.title}</h2>
                <Badge>{movie.cert}</Badge>
                <Badge variant="outline">{movie.status}</Badge>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-700">
                <span className="font-semibold">{movie.lang}</span>
                <span className="text-zinc-400">•</span>
                <span>{movie.genres.join(", ")}</span>
                <span className="text-zinc-400">•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {minutesToHrMin(movie.durationMins)}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1 text-white">
                  <Star className="h-4 w-4" />
                  <span className="font-bold">{movie.rating}</span>
                </span>
                <span className="text-zinc-600">{movie.votes.toLocaleString()} votes</span>
              </div>
            </div>
          </div>

          <Btn variant="ghost" className="h-10 w-10 rounded-full p-0" onClick={onClose}>
            <X className="h-5 w-5" />
          </Btn>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="text-sm font-black">About</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">{movie.synopsis}</p>

            <div className="mt-5">
              <div className="text-sm font-black">Cast</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {movie.cast.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Card className="p-4">
            <div className="text-sm font-black">Book tickets</div>
            <div className="mt-2 text-sm text-zinc-600">Select your preferred format</div>

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.format.map((f) => (
                <Badge key={f} variant="outline">{f}</Badge>
              ))}
            </div>

            <Btn className="mt-4 w-full py-3">
              <Ticket className="h-5 w-5" /> Proceed
            </Btn>

            <Btn variant="outline" className="mt-2 w-full py-3">
              <PlayCircle className="h-5 w-5" /> Trailer
            </Btn>

            <div className="mt-4 text-xs text-zinc-500">
              Note: This is a UI clone demo. Connect backend for real booking.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// Footer
// -------------------------
function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-black">district</div>
            <div className="mt-1 text-sm text-zinc-600">Movie ticket booking UI clone — React + Tailwind.</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pages</div>
            <div className="mt-2 grid gap-1 text-sm text-zinc-700">
              <a className="hover:underline" href="#">Movies</a>
              <a className="hover:underline" href="#">Events</a>
              <a className="hover:underline" href="#">Dining</a>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Support</div>
            <div className="mt-2 grid gap-1 text-sm text-zinc-700">
              <a className="hover:underline" href="#">Help Center</a>
              <a className="hover:underline" href="#">Terms</a>
              <a className="hover:underline" href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-zinc-500">© {new Date().getFullYear()} Demo UI</div>
      </div>
    </footer>
  );
}
