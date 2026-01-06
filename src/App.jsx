import { useState, useEffect } from 'react';
import { Cpu, Lock, Unlock, Zap, ChevronRight, AlertCircle, Shield, ExternalLink, Brain, Target } from 'lucide-react';

/**
 * Nakaminsky Protocol Challenge - Psychology Edition v2.6
 * 1. FOMO Management
 * 2. Emotional Control (Drawdown)
 * 3. Discipline (Daily Target)
 * 4. Risk Adaptation (Volatility)
 * 5. Loss Acceptance (Stop Loss)
 */
const App = () => {
  const [step, setStep] = useState('intro'); // intro, challenge1...5, success
  const [logs, setLogs] = useState(["Initialisation du protocole Nakaminsky...", "En attente d'autorisation..."]);
  const [glitch, setGlitch] = useState(false);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-8), `> ${msg}`]);
  };

  const triggerError = (msg) => {
    addLog(msg);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 500);
  };

  // --- Navigation du Challenge ---
  const startChallenge = () => {
    setStep('challenge1');
    addLog("PHASE 1 : Gestion de l'impulsivité (FOMO).");
  };

  const handleChoice = (isCorrect, choiceText, nextStep) => {
    addLog(`Action choisie : ${choiceText}`);
    
    if (isCorrect) {
      addLog("Analyse comportementale : VALIDÉE.");
      if (nextStep === 'success') {
        setTimeout(() => setStep('success'), 800);
      } else {
        setTimeout(() => {
          setStep(nextStep);
          if (nextStep === 'challenge2') addLog("PHASE 2 : Contrôle émotionnel (Drawdown).");
          if (nextStep === 'challenge3') addLog("PHASE 3 : Discipline opérationnelle (Target).");
          if (nextStep === 'challenge4') addLog("PHASE 4 : Adaptation au risque (Volatilité).");
          if (nextStep === 'challenge5') addLog("PHASE 5 : Acceptation de la perte (Stop Loss).");
        }, 800);
      }
    } else {
      triggerError("ERREUR : Biais cognitif détecté. Accès refusé.");
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
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Nakaminsky.Protocol // Trading v2.6</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></div>
          </div>
        </div>

        {/* Zone de contenu */}
        <div className="p-6">

          {/* Logo Section */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Nakaminsky Logo" 
              className="h-28 sm:h-32 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
              }} 
            />
          </div>

          {/* Bannière de tarification et d'accès */}
          <div className="mb-6 text-center flex flex-col gap-2">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded py-3 px-4 animate-pulse">
               <span className="text-cyan-400 font-bold text-sm sm:text-lg tracking-tighter uppercase">
                ACCÈS VIP + COPY AUTO = 450$ / 3 MOIS
               </span>
            </div>
            
            <a 
              href="https://t.me/nakaminsky" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2.5 rounded transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] shadow-lg shadow-cyan-900/20 active:scale-[0.98]"
            >
              Paiement <ExternalLink size={14} />
            </a>

            <div className="text-slate-500 text-xs font-black tracking-[0.3em] mt-1">OU</div>
            
            <div className="text-emerald-400 text-xs sm:text-sm font-bold tracking-widest border border-emerald-500/20 py-2 rounded bg-emerald-500/5 uppercase">
              RÉUSSIR NOTRE TEST
            </div>
          </div>
          
          {/* Logs du Terminal */}
          <div className="mb-8 h-40 overflow-y-auto bg-black/40 p-4 rounded border border-slate-800/50 text-sm space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
            {logs.map((log, i) => (
              <div key={i} className={`${log.startsWith('>') ? 'text-cyan-400' : 'text-slate-500'}`}>
                {log}
              </div>
            ))}
          </div>

          {/* Interface Dynamique */}
          <div className="flex flex-col items-center min-h-[260px] justify-center text-center">
            
            {step === 'intro' && (
              <button 
                onClick={startChallenge}
                className="group relative px-8 py-4 bg-cyan-600 text-white font-bold rounded overflow-hidden transition-all hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-900/20"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-sm">
                  LANCER L'ÉVALUATION <Target size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            )}

            {step === 'challenge1' && (
              <div className="grid grid-cols-1 gap-3 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">Une bougie impulsive casse une résistance majeure sans vous. Que faites-vous ?</p>
                <button
                  onClick={() => handleChoice(false, "FOMO", "challenge2")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-red-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">A/</span> Entrer immédiatement au prix du marché pour ne pas rater le mouvement.
                </button>
                <button
                  onClick={() => handleChoice(true, "Patience", "challenge2")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-cyan-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">B/</span> Attendre un retest de la zone ou un nouveau setup de probabilité.
                </button>
              </div>
            )}

            {step === 'challenge2' && (
              <div className="grid grid-cols-1 gap-3 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">Vous subissez 3 pertes consécutives ce matin (Drawdown). Quelle est votre réaction ?</p>
                <button
                  onClick={() => handleChoice(false, "Revenge Trading", "challenge3")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-red-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">A/</span> Augmenter le levier sur le prochain trade pour récupérer rapidement.
                </button>
                <button
                  onClick={() => handleChoice(true, "Discipline Émotionnelle", "challenge3")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-cyan-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">B/</span> Fermer le terminal, analyser le journal et faire une pause mentale.
                </button>
              </div>
            )}

            {step === 'challenge3' && (
              <div className="grid grid-cols-1 gap-3 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">Objectif journalier atteint après seulement 20 min de trading. Action ?</p>
                <button
                  onClick={() => handleChoice(false, "Overtrading", "challenge4")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-red-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">A/</span> Continuer de chercher des opportunités pour faire une journée record.
                </button>
                <button
                  onClick={() => handleChoice(true, "Gestion des Gains", "challenge4")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-cyan-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">B/</span> Sécuriser les gains, éteindre les écrans et respecter son plan.
                </button>
              </div>
            )}

            {step === 'challenge4' && (
              <div className="grid grid-cols-1 gap-3 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">La volatilité du marché augmente soudainement de 300%. Quelle est votre approche ?</p>
                <button
                  onClick={() => handleChoice(false, "Risque Excessif", "challenge5")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-red-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">A/</span> Garder la même taille de position pour profiter de l'amplitude maximale.
                </button>
                <button
                  onClick={() => handleChoice(true, "Gestion du Risque", "challenge5")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-cyan-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">B/</span> Réduire la taille des positions pour conserver le même risque monétaire.
                </button>
              </div>
            )}

            {step === 'challenge5' && (
              <div className="grid grid-cols-1 gap-3 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">Le prix touche votre Stop Loss exact mais semble vouloir rebondir. Votre réaction ?</p>
                <button
                  onClick={() => handleChoice(false, "Espoir", "success")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-red-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">A/</span> Élargir ou supprimer le Stop Loss temporairement pour laisser respirer le trade.
                </button>
                <button
                  onClick={() => handleChoice(true, "Acceptation", "success")}
                  className="w-full bg-slate-800/30 border border-slate-700 p-3 rounded text-left text-xs hover:border-cyan-500 transition-all flex items-center gap-3"
                >
                  <span className="text-slate-500 font-bold">B/</span> Laisser le Stop Loss s'exécuter. Une perte fait partie du plan de trading.
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center animate-in zoom-in duration-500 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500 mb-4 shadow-[0_0_30px_#22d3ee44]">
                  <Unlock size={40} className="text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase">PROFIL CERTIFIÉ</h2>
                <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                  Accès autorisé à Nakaminsky Trading © par le biais d'un simple dépôt (capital de départ utiliser pour trader avec nous) chez notre exchange partenaire <a href="https://moonx.io/ref/QPHWJ1I" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-bold transition-colors">MoonX</a>
                </p>
                <a 
                  href="https://moonx.io/ref/QPHWJ1I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded transition-all flex items-center gap-2 uppercase tracking-[0.15em] shadow-xl shadow-cyan-900/30 active:scale-95"
                >
                  Ouvrir mon compte de trading <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Pied de page */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Shield size={12} />
            <span>Protection du capital active</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Link
            </span>
            <span>Ref: NKM-TRD-99</span>
          </div>
        </div>
      </div>

      {/* Message d'avertissement */}
      {step !== 'success' && (
        <div className="mt-8 flex items-center gap-2 text-slate-700 text-xs italic">
          <Brain size={14} />
          <span>Le trading comporte des risques. La psychologie est votre seul allié.</span>
        </div>
      )}
    </div>
  );
};

export default App;