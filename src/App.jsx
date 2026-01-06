import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // <--- CETTE LIGNE EST CRUCIALE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


import { Terminal, Shield, Cpu, Lock, Unlock, Zap, ChevronRight, AlertCircle } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('intro'); // intro, challenge1, challenge2, success
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(["Initialisation du protocole Nakaminsky...", "En attente d'autorisation..."]);
  const [glitch, setGlitch] = useState(false);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-8), `> ${msg}`]);
  };

  // --- Challenge 1: Supply Limit ---
  const startChallengeOne = () => {
    setStep('challenge1');
    addLog("PHASE 1 : Vérification des fondamentaux économiques.");
    addLog("Quel est le nombre maximum de Bitcoins (en millions) qui existeront ?");
  };

  const checkChallengeOne = (e) => {
    e.preventDefault();
    if (input === '21') {
      addLog("Supply validée. Rareté confirmée.");
      addLog("Accès au niveau 2 autorisé.");
      setInput('');
      setTimeout(() => setStep('challenge2'), 1000);
    } else {
      addLog("Erreur de donnée. Connaissance du marché insuffisante.");
      setInput('');
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }
  };

  // --- Challenge 2: Genesis Block ---
  useEffect(() => {
    if (step === 'challenge2') {
      addLog("PHASE 2 : Identification de l'origine.");
      addLog("Quel est le nom donné au tout premier bloc de la blockchain ?");
    }
  }, [step]);

  const checkChallengeTwo = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();
    if (cleanInput === 'genesis' || cleanInput === 'genesis block') {
      addLog("Bloc Origine identifié. Clé privée décryptée.");
      setStep('success');
    } else {
      addLog("Erreur historique. Accès refusé.");
      setInput('');
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 font-mono p-4 flex flex-col items-center justify-center overflow-hidden ${glitch ? 'animate-pulse bg-red-950' : ''}`}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]"></div>
        <div className="grid grid-cols-12 h-full w-full border-slate-800 border-opacity-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-800/20"></div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Header bar */}
        <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Nakaminsky.Protocol // v2.0</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Logo Zone */}
          <div className="flex justify-center mb-5">
            <img 
              src="/logo.png" 
              alt="Naka Capital" 
              className="h-12 object-contain filter drop-shadow-[0_0_5px_rgba(34,211,238,0.2)]"
            />
          </div>

          {/* VIP Access Text */}
          <div className="mb-6 text-center space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="text-emerald-400 font-bold tracking-widest text-sm border border-emerald-500/30 bg-emerald-500/5 py-2 px-4 rounded shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
               Accès VIP + COPY AUTO = 450$ / 3 MOIS
             </div>
             <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
               OU REUSSIR LE CHALLENGE CI DESSOUS
             </div>
          </div>
          
          {/* Terminal Logs */}
          <div className="mb-8 h-48 overflow-y-auto bg-black/40 p-4 rounded border border-slate-800/50 text-sm space-y-1">
            {logs.map((log, i) => (
              <div key={i} className={`${log.startsWith('>') ? 'text-cyan-400' : 'text-slate-500'}`}>
                {log}
              </div>
            ))}
          </div>

          {/* Dynamic Steps */}
          <div className="flex flex-col items-center">
            
            {step === 'intro' && (
              <button 
                onClick={startChallengeOne}
                className="group relative px-8 py-3 bg-cyan-600 text-white font-bold rounded overflow-hidden transition-all hover:bg-cyan-500 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  INITIER LE PROTOCOLE TRADING <Zap size={18} fill="currentColor" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            )}

            {step === 'challenge1' && (
              <form onSubmit={checkChallengeOne} className="w-full max-w-sm">
                <div className="relative">
                  <input 
                    autoFocus
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Entrez le montant (millions)..."
                    className="w-full bg-slate-950 border-2 border-slate-800 p-4 rounded text-center text-2xl tracking-widest focus:border-cyan-500 outline-none transition-colors"
                  />
                  <div className="mt-4 flex justify-center">
                    <button type="submit" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 uppercase tracking-widest">
                      Valider Supply <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 'challenge2' && (
               <form onSubmit={checkChallengeTwo} className="w-full max-w-sm">
               <div className="relative">
                 <input 
                   autoFocus
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Entrez le nom du bloc..."
                   className="w-full bg-slate-950 border-2 border-slate-800 p-4 rounded text-center text-2xl tracking-widest focus:border-cyan-500 outline-none transition-colors"
                 />
                 <div className="mt-4 flex justify-center">
                   <button type="submit" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 uppercase tracking-widest">
                     Confirmer Origine <ChevronRight size={14} />
                   </button>
                 </div>
               </div>
             </form>
            )}

            {step === 'success' && (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500 mb-4 shadow-[0_0_30px_#22d3ee44]">
                  <Unlock size={40} className="text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">WALLET DÉVERROUILLÉ</h2>
                <p className="text-slate-400 text-sm">Le noyau Nakaminsky est maintenant sous votre contrôle.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 text-xs border border-slate-700 px-4 py-2 rounded hover:bg-slate-800 transition-colors"
                >
                  RÉINITIALISER LE PROTOCOLE
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Shield size={12} />
            <span>Encodage 256-bit actif</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Market Live
            </span>
            <span>Ref: BTC-CORE-77</span>
          </div>
        </div>
      </div>

      {/* Warning display */}
      {step !== 'success' && (
        <div className="mt-8 flex items-center gap-2 text-slate-600 text-xs italic">
          <AlertCircle size={14} />
          <span>Usage strictement réservé aux Traders Nakaminsky autorisés.</span>
        </div>
      )}
    </div>
  );
};

export default App;