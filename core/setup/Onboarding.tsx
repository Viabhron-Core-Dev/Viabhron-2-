import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Settings, 
  ClipboardList, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Code, 
  Briefcase, 
  Search, 
  User, 
  ShieldCheck,
  Globe,
  Zap
} from 'lucide-react';
import { OnboardingState, OnboardingStep } from '../../types';

interface OnboardingProps {
  onComplete: (state: OnboardingState) => void;
  onSkipToChat: () => void;
  onSkipToSettings: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkipToChat, onSkipToSettings }) => {
  const [step, setStep] = useState<OnboardingStep>('choice');
  const [intent, setIntent] = useState<OnboardingState['intent']>();
  const [hardware, setHardware] = useState<OnboardingState['hardwareProfile']>();

  const handleChoice = (choice: 'chat' | 'settings' | 'questionnaire') => {
    if (choice === 'chat') onSkipToChat();
    else if (choice === 'settings') onSkipToSettings();
    else setStep('questionnaire');
  };

  const handleQuestionnaireSubmit = () => {
    setStep('roadmap');
  };

  const handleFinalize = () => {
    onComplete({
      step: 'completed',
      intent,
      hardwareProfile: hardware,
      completed: true
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'choice' && (
          <motion.div 
            key="choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full space-y-8 text-center"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Viabhron OS</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Your private cloud infrastructure is connected. How would you like to begin?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => handleChoice('chat')}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-left space-y-4"
              >
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 w-fit group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Direct Exploration</h3>
                  <p className="text-xs text-gray-500 mt-1">Dive straight into the chat and ask the Resident AI anything.</p>
                </div>
              </button>

              <button 
                onClick={() => handleChoice('questionnaire')}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left space-y-4 ring-2 ring-blue-500/20"
              >
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 w-fit group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Intent Questionnaire</h3>
                  <p className="text-xs text-gray-500 mt-1">Map your usage plan for tailored advice and roadmap.</p>
                </div>
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Recommended</div>
              </button>

              <button 
                onClick={() => handleChoice('settings')}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gray-500/50 hover:bg-white/5 transition-all text-left space-y-4"
              >
                <div className="p-3 rounded-xl bg-gray-500/20 text-gray-400 w-fit group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Machine Room</h3>
                  <p className="text-xs text-gray-500 mt-1">Manual OS tuning and substrate configuration.</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'questionnaire' && (
          <motion.div 
            key="questionnaire"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-xl w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Intent Mapping</h2>
              <p className="text-sm text-gray-400">Tell us how you plan to use Viabhron so we can optimize your substrate.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Primary Goal</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'coding', label: 'Coding', icon: Code },
                    { id: 'business', label: 'Business', icon: Briefcase },
                    { id: 'research', label: 'Research', icon: Search },
                    { id: 'personal', label: 'Personal', icon: User },
                    { id: 'enterprise', label: 'Enterprise', icon: Globe },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setIntent(item.id as any)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        intent === item.id 
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hardware Profile</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Mobile/Lite', desc: 'PWA/APK' },
                    { id: 'medium', label: 'Laptop', desc: 'Standard' },
                    { id: 'high', label: 'Workstation', desc: 'High-Spec' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setHardware(item.id as any)}
                      className={`p-3 rounded-xl border transition-all text-center space-y-1 ${
                        hardware === item.id 
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-[10px] opacity-60">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              disabled={!intent || !hardware}
              onClick={handleQuestionnaireSubmit}
              className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2"
            >
              Generate Roadmap <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 'roadmap' && (
          <motion.div 
            key="roadmap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Sovereign Roadmap</h2>
                <p className="text-sm text-gray-400">Tailored advice for your {intent} mission.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" /> Recommended Substrate
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {hardware === 'low' 
                    ? "Based on your mobile profile, we recommend a Cloud-Dominant Hybrid substrate. Keep the heavy reasoning in the cloud while using this device as a secure hardware key."
                    : hardware === 'high'
                    ? "Your hardware is capable of a Local-Dominant substrate. We recommend 'Hatching' the HQ locally for maximum privacy and offline performance."
                    : "A balanced Hybrid substrate is recommended. Use the cloud for Level 3 Contractors and local hardware for the Resident AI."
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Key Extensions</h3>
                  <ul className="text-[11px] text-gray-500 space-y-1">
                    {intent === 'coding' && (
                      <>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Adversarial Auditor</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Web Recon Shield</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Forge IDE</li>
                      </>
                    )}
                    {intent === 'business' && (
                      <>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> SOP Registry</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Fiscal Division</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Sentinel Feed</li>
                      </>
                    )}
                    {intent === 'research' && (
                      <>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Global Pulse</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Librarian Agent</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Neural Archive</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Blind Spot Alert</h3>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    Don't forget to set up your **Sovereign Intercom** for mobile ratification. This ensures you stay in control even when away from your desk.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalize}
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all"
            >
              Initialize OS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
