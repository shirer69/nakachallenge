import { useState, useEffect } from 'react';
import { Cpu, Lock, Unlock, Zap, ChevronRight, AlertCircle, Shield } from 'lucide-react';

/**
 * Nakaminsky Protocol Challenge
 * Un défi interactif de type "Hacker" avec deux phases : 
 * 1. Logique (Séquence numérique)
 * 2. Mémoire (Pattern visuel)
 */
const App = () => {
  const [step, setStep] = useState('intro'); // intro, challenge1, challenge2, success
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(["Initialisation du protocole Nakaminsky...", "En attente d'autorisation..."]);
  const [glitch, setGlitch] = useState(false);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-8), `> ${msg}`]);
  };

  // --- Phase 1 : Déchiffrement Logique ---
  const startChallengeOne = () => {
    setStep('challenge1');
    addLog("PHASE 1 : Décodage de la séquence de sécurité.");
    addLog("Séquence : 2, 6, 12, 20, 30... Quel est le prochain nombre ?");
  };

  const checkChallengeOne = (e) => {
    e.preventDefault();
    // La logique est n(n+1) ou x + (2*index). 2(+4)=6, 6(+6)=12, 12(+8)=20, 20(+10)=30, 30(+12)=42
    if (input.trim() === '42') {
      addLog("Séquence validée. Accès au niveau 2 autorisé.");
      setInput('');
      setTimeout(() => setStep('challenge2'), 1000);
    } else {
      addLog("Erreur de calcul. Intégrité compromise.");
      setInput('');
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }
  };

  // --- Phase 2 : Pattern de Vitesse ---
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (step === 'challenge2') {
      const newPattern = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));
      setPattern(newPattern);
      setUserPattern([]);
      addLog("PHASE 2 : Réplication neuronale requise.");
      addLog("Observez la séquence lumineuse.");
      
      let i = 0;
      const interval = setInterval(() => {
        setActiveNode(newPattern[i]);
        setTimeout(() => setActiveNode(null), 400);
        i++;
        if (i >= newPattern.length) clearInterval(interval);
      }, 800);
    }
  }, [step]);

  const handleNodeClick = (index) => {
    if (step !== 'challenge2') return;
    const nextUserPattern = [...userPattern, index];
    setUserPattern(nextUserPattern);
    
    if (nextUserPattern[nextUserPattern.length - 1] !== pattern[nextUserPattern.length - 1]) {
      addLog("Désynchronisation détectée. Réinitialisation...");
      setUserPattern([]);
    } else if (nextUserPattern.length === pattern.length) {
      setStep('success');
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 font-mono p-4 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${glitch ? 'bg-red-950' : ''}`}>
      
      {/* Décoration de fond */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]"></div>
        <div className="grid grid-cols-12 h-full w-full border-slate-800 border-opacity-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-800/20"></div>
          ))}
        </div>
      </div>

      {/* Conteneur Principal */}
      <div className="relative w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Barre d'en-tête */}
        <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Nakaminsky.Protocol // v2.1</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></div>
          </div>
        </div>

        {/* Zone de contenu */}
        <div className="p-6">
          
          {/* Logs du Terminal */}
          <div className="mb-8 h-48 overflow-y-auto bg-black/40 p-4 rounded border border-slate-800/50 text-sm space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
            {logs.map((log, i) => (
              <div key={i} className={`${log.startsWith('>') ? 'text-cyan-400' : 'text-slate-500'}`}>
                {log}
              </div>
            ))}
          </div>

          {/* Interface Dynamique */}
          <div className="flex flex-col items-center min-h-[200px] justify-center">
            
            {step === 'intro' && (
              <button 
                onClick={startChallengeOne}
                className="group relative px-8 py-4 bg-cyan-600 text-white font-bold rounded overflow-hidden transition-all hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-900/20"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase">
                  INITIER LE CHALLENGE <Zap size={18} fill="currentColor" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            )}

            {step === 'challenge1' && (
              <form onSubmit={checkChallengeOne} className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4">
                <div className="relative">
                  <input 
                    autoFocus
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Résultat..."
                    className="w-full bg-slate-950 border-2 border-slate-800 p-4 rounded text-center text-2xl tracking-widest focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
                  />
                  <div className="mt-4 flex justify-center">
                    <button type="submit" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 uppercase tracking-widest transition-colors">
                      Valider la séquence <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 'challenge2' && (
              <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-300">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => handleNodeClick(i)}
                    className={`w-24 h-24 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      activeNode === i 
                        ? 'bg-cyan-400 border-white shadow-[0_0_25px_#22d3ee] scale-105' 
                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`text-sm font-bold ${activeNode === i ? 'text-slate-900' : 'text-slate-600'}`}>
                      {['ALPHA', 'BETA', 'GAMMA', 'DELTA'][i]}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 'success' && (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500 mb-4 shadow-[0_0_30px_#22d3ee44]">
                  <Unlock size={40} className="text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">ACCÈS TOTAL ACCORDÉ</h2>
                <p className="text-slate-400 text-sm">Noyau Nakaminsky synchronisé. Protocoles de sécurité levés.</p>
                <button 
                  onClick={() => setStep('intro')}
                  className="mt-6 text-xs border border-slate-700 px-4 py-2 rounded hover:bg-slate-800 transition-colors uppercase tracking-widest"
                >
                  Réinitialiser le terminal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pied de page */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Shield size={12} />
            <span>Encodage Quantum-Safe</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Link
            </span>
            <span>Ref: NKM-CORE-77</span>
          </div>
        </div>
      </div>

      {/* Message d'avertissement */}
      {step !== 'success' && (
        <div className="mt-8 flex items-center gap-2 text-slate-700 text-xs italic">
          <AlertCircle size={14} />
          <span>Usage strictement réservé aux opérateurs Nakaminsky autorisés.</span>
        </div>
      )}
    </div>
  );
};

export default App;