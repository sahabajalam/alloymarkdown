import { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import FileUpload from './components/FileUpload';
import ThemeToggle from './components/ThemeToggle';
import { RotateCcw, Github } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const currentScrollY = mainRef.current.scrollTop;
      const isScrollDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // Only toggle if scroll difference is significant to avoid jitter
      if (scrollDifference > 10) {
        setIsHeaderVisible(!isScrollDown || currentScrollY < 50);
      }

      lastScrollY.current = currentScrollY;
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen font-sans transition-colors duration-500 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px] delay-1000" />
      </div>

      {/* Header */}
      <header
        className={cn(
          "absolute top-0 left-0 right-0 z-50 transition-all duration-300 transform",
          "border-b border-[var(--border-color)] bg-[var(--bg-primary)]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg-primary)]/60",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 h-[4.5rem] flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setMarkdown(null)}
            title="Return to Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-indigo-600 rounded-xl shadow-lg flex items-center justify-center text-white relative z-10 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                <img src="/vite.svg" alt="Logo" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] leading-none group-hover:text-[var(--accent)] transition-colors">
                Alloy Markdown
              </h1>
              <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mt-1">
                Viewer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="w-px h-8 bg-[var(--border-color)] hidden sm:block" />

            {markdown ? (
              <button
                onClick={() => setMarkdown(null)}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300
                  bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm hover:shadow-md
                  hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
                <span>Reset</span>
              </button>
            ) : (
              <a
                href="#"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all
                  text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main
        ref={mainRef}
        className={cn(
          "flex-1 relative z-10 overflow-y-auto scroll-smooth pt-[4.5rem] transition-all duration-300",
          // Adjust padding or scroll behavior if needed when header hides, but usually fixed layout handles this.
        )}
      >
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-full flex flex-col justify-center">
          {!markdown ? (
            <div className="max-w-6xl mx-auto w-full animate-in fade-in zoom-in-95 duration-700 slide-in-from-bottom-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Column: Text */}
                <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                    Visualize Content <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-600 block mt-2">Beautifully.</span>
                  </h2>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Transform your raw Markdown into an elegant, readable document with advanced support for code, math, and tables.
                  </p>

                  {/* Optional decorative elements could go here */}
                  <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-[var(--text-secondary)] opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <span>Instant Rendering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>Secure Processing</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Upload Box */}
                <div className="w-full order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-purple-500/10 rounded-3xl blur-[40px] pointer-events-none" />
                    <FileUpload onFileLoaded={setMarkdown} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500 pb-10">
              <div className="p-8 md:p-14 rounded-3xl shadow-2xl transition-all duration-500
                bg-[var(--bg-card)] border border-[var(--border-color)]">
                <MarkdownRenderer content={markdown} />
              </div>
              <div className="mt-12 text-center">
                <div className="inline-flex items-center justify-center p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] mr-2 animate-pulse" />
                  <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">End of Document</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer inside scroll area (moved inside to flow with content if needed, but keeping fixed behavior relative to main area) */}
        {!markdown && (
          <footer className="flex-none py-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)]">
                Designed for <span className="text-[var(--text-primary)] font-bold">Clarity</span> & <span className="text-[var(--text-primary)] font-bold">Focus</span> with <a href="https://deepmind.google" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Google Antigravity</a>
              </p>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;
