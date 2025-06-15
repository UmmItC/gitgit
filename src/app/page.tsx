'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [showSecretPanel, setShowSecretPanel] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  const flag = 'NHNC{???????????????????????}';
  
  useEffect(() => {
    const newParticles = [...Array(50)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);
  
  useEffect(() => {
    const text = 'Initializing secure connection... Access granted.';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowFlag(true), 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [showSecretPanel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 animate-glow">
            ICEDTEA CTF 2025
          </h1>
          <p className="text-xl text-gray-300">
            Can you find the flag?
          </p>

        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-10">

            <div 
              className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/100 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setShowSecretPanel(!showSecretPanel)}
            >
              <div className="text-blue-400 text-3xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-2">ICEDTEA Terminal</h3>
              <p className="text-gray-400">Click me!</p>
            </div>
          </div>

          {showSecretPanel && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-black border border-green-400 rounded-lg p-8 max-w-2xl w-full mx-4 font-mono">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-green-400 text-xl">SECURE TERMINAL v2.1.5</h2>
                  <button 
                    onClick={() => setShowSecretPanel(false)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="bg-gray-900 p-4 rounded mb-4 h-64 overflow-auto">
                  <div className="text-green-400 mb-2">
                    root@ICEDTEA:~$ icedtea --access
                  </div>
                  <div className="text-yellow-400 mb-4">
                    {terminalText}
                    <span className="animate-blink">|</span>
                  </div>
                  
                  {showFlag && (
                    <div className="animate-fade-in">
                      <div className="text-red-400 mb-2">
                        WARNING: Development credentials exposed!
                      </div>
                      <div className="text-green-400 mb-2">
                        {flag}
                      </div>
                       <div className="text-gray-400 text-sm">小愛是最可愛的！！</div>
                    </div>
                  )}
                </div>
                
                <div className="text-gray-400 text-sm">
                  Authorized personnel only :)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
