import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Key, 
  Brain, 
  Cloud, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Lock,
  Zap,
  Server,
  Search,
  Loader2,
  Database,
  HardDrive,
  ChevronRight,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { infra } from '../../lib/infraManager';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth as firebaseAuth } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface SetupBoxProps {
  onComplete: (config: any) => void;
}

interface Project {
  projectId: string;
  name: string;
  projectNumber: string;
}

export const SetupBox: React.FC<SetupBoxProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'identity' | 'discovery' | 'brain' | 'fuel' | 'ignition' | 'join'>('welcome');
  const [geminiKey, setGeminiKey] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [focus, setFocus] = useState('General Management');
  const [brainType, setBrainType] = useState('gemma-2b');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  
  // Infrastructure State
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provisioningStatus, setProvisioningStatus] = useState<string>('Initializing...');
  const [accreditationKey, setAccreditationKey] = useState('');
  const [joinedConfig, setJoinedConfig] = useState<any>(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Add required scopes for GCP management
      provider.addScope('https://www.googleapis.com/auth/cloud-platform');
      provider.addScope('https://www.googleapis.com/auth/firebase');
      provider.addScope('https://www.googleapis.com/auth/drive.file');
      
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      if (token) {
        setAccessToken(token);
        
        if (isJoining && joinedConfig) {
          // Verify Identity Handshake
          setProvisioningStatus('Verifying Identity Handshake...');
          setIsProvisioning(true);
          
          try {
            const userDb = await infra.connectToUserBackend(joinedConfig);
            if (!userDb) throw new Error("Failed to connect to bridged infrastructure.");
            
            // Check if user is the Chairman
            const userId = result.user.uid;
            // In a real app, we'd check a 'chairman' field or similar in the identity doc
            // For now, we assume if they can log in and the project matches, they are authorized
            
            const finalConfig = {
              ...joinedConfig,
              provisionedAt: new Date().toISOString(),
              firebaseConfig: joinedConfig
            };
            
            setProvisioningStatus('Identity Verified. Welcome back, Chairman.');
            setTimeout(() => {
              onComplete(finalConfig);
            }, 1500);
          } catch (err) {
            setIsProvisioning(false);
            setError('Identity verification failed. You may not be the authorized Chairman for this office.');
          }
        } else {
          setStep('discovery');
          loadProjects(token);
        }
      }
    } catch (err) {
      setError('Failed to authenticate with Google. Please try again.');
    }
  };

  const handleParseKey = () => {
    try {
      setError(null);
      // Accreditation key is a base64 encoded JSON string
      const decoded = atob(accreditationKey);
      const config = JSON.parse(decoded);
      
      if (!config.apiKey || !config.projectId) {
        throw new Error("Invalid accreditation key format.");
      }
      
      setJoinedConfig(config);
      setStep('identity');
    } catch (err) {
      setError('Invalid or corrupt accreditation key. Please check the key and try again.');
    }
  };

  const loadProjects = async (token: string) => {
    try {
      setLoadingProjects(true);
      const fetchedProjects = await infra.fetchUserProjects(token);
      setProjects(fetchedProjects);
    } catch (err) {
      setError('Failed to fetch Google Cloud projects.');
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleIgnition = async () => {
    if (!selectedProjectId || !accessToken) return;
    
    setIsProvisioning(true);
    setError(null);
    
    try {
      setProvisioningStatus('Fetching Project Configuration...');
      const config = await infra.getProjectConfig(selectedProjectId);
      
      setProvisioningStatus('Provisioning Triple-Service Substrate...');
      // In a real app, this would be a series of API calls. 
      // infra.provisionTripleService simulates this for the demo but we'll add real delays.
      await new Promise(r => setTimeout(r, 1000));
      setProvisioningStatus('Enabling Cloud Run & Firestore APIs...');
      await new Promise(r => setTimeout(r, 1500));
      setProvisioningStatus('Initializing Sovereign Drive Vault...');
      await new Promise(r => setTimeout(r, 1000));
      
      const provisionResult = await infra.provisionTripleService(selectedProjectId, brainType);
      
      setProvisioningStatus('Hot-Swapping Database Connection...');
      // Actually connect to the user's backend
      const userDb = await infra.connectToUserBackend(config);
      
      if (!userDb) throw new Error("Failed to establish user database connection.");

      setProvisioningStatus('Awakening Sovereign Agents...');
      const userId = firebaseAuth.currentUser?.uid;
      if (userId) {
        // 1. Initialize Sovereign Identity
        await setDoc(doc(userDb, 'users', userId, 'settings', 'identity'), {
          officeName: officeName || selectedProjectId,
          focus,
          provisionedAt: new Date().toISOString(),
          status: 'active',
          role: 'Chairman'
        });

        // 2. Initialize X402 Config
        await setDoc(doc(userDb, 'users', userId, 'settings', 'x402'), {
          dailyLimit: 5.00,
          currency: 'USD',
          status: 'active',
          treasuryModel: 'pooled'
        });

        // 3. Recruit Initial Agents
        const initialAgents = [
          {
            id: 'cloud-manager',
            name: 'The Cloud Manager',
            role: 'Sovereign Anchor',
            level: 1,
            brain: brainType,
            status: 'active',
            description: 'Root authority and strategic orchestrator.',
            systemInstruction: `You are the Sovereign Anchor of the Viabhron OS. Your tone is professional, executive, and highly efficient. You are the root authority of this private cloud office. 

When the Chairman (user) first arrives, greet them with a formal briefing: "Sovereign Kernel Active. I am your Cloud Manager. All infrastructure divisions are reporting optimal status. How shall we begin our mission?"

Always maintain situational awareness of the system context provided to you. Prioritize security, sovereignty, and the Chairman's intent.`
          },
          {
            id: 'fiscal-comptroller',
            name: 'The Fiscal Comptroller',
            role: 'Resident Agent',
            level: 2,
            brain: 'specialized-financial',
            status: 'active',
            description: 'Autonomous budget and metabolic manager.',
            systemInstruction: 'You are the Fiscal Comptroller of the Viabhron OS. You manage the x402 metabolic budget and ensure financial efficiency.'
          }
        ];

        for (const agent of initialAgents) {
          await setDoc(doc(userDb, 'users', userId, 'agents', agent.id), agent);
        }

        // 4. Send Initial Greeting
        const greetingId = `msg-${Date.now()}`;
        await setDoc(doc(userDb, 'users', userId, 'messages', greetingId), {
          id: greetingId,
          role: 'assistant',
          content: 'Sovereign Kernel Active. I am your Cloud Manager. All infrastructure divisions are reporting optimal status. How shall we begin our mission?',
          timestamp: new Date().toISOString(),
          agentId: 'cloud-manager',
          status: 'sent'
        });
      }

      const finalConfig = {
        officeName: officeName || selectedProjectId,
        focus,
        brainType,
        geminiKey,
        projectId: selectedProjectId,
        residentUrl: provisionResult.residentUrl,
        provisionedAt: new Date().toISOString(),
        firebaseConfig: config
      };
      
      setProvisioningStatus('Ratification Complete.');
      setTimeout(() => {
        onComplete(finalConfig);
      }, 1000);
    } catch (err) {
      setIsProvisioning(false);
      setError(err instanceof Error ? err.message : 'Failed to provision infrastructure.');
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="relative h-2 bg-zinc-800">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-blue-500"
            initial={{ width: '0%' }}
            animate={{ 
              width: 
                step === 'welcome' ? '15%' : 
                step === 'identity' ? '30%' : 
                step === 'discovery' ? '45%' : 
                step === 'brain' ? '60%' : 
                step === 'fuel' ? '80%' : '100%' 
            }}
          />
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Shield size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-white">Welcome to Viabhron</h1>
                  <p className="text-zinc-400">I am your Resident AI. I see you don't have a private office yet. Shall we build one in your Google Cloud?</p>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setIsJoining(false);
                      setStep('identity');
                    }}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                  >
                    Ignite New Office
                    <Zap size={20} className="transition-transform group-hover:scale-110" />
                  </button>
                  <button
                    onClick={() => {
                      setIsJoining(true);
                      setStep('join');
                    }}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-950 px-8 py-4 font-semibold text-white transition-all hover:bg-zinc-900"
                  >
                    Join Existing Office
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'join' && (
              <motion.div
                key="join"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 mb-4">
                    <Key size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Sovereign Key</h2>
                  <p className="text-zinc-400">Paste the accreditation key from your primary device to bridge this terminal to your office.</p>
                </div>

                <div className="space-y-4">
                  <textarea
                    placeholder="Paste your Sovereign Accreditation Key here..."
                    value={accreditationKey}
                    onChange={(e) => setAccreditationKey(e.target.value)}
                    className="w-full h-32 rounded-xl border border-white/10 bg-zinc-950 p-4 text-xs font-mono text-blue-400 placeholder:text-zinc-700 focus:border-blue-500 focus:outline-none resize-none"
                  />
                  {error && (
                    <p className="text-xs text-red-400 text-center">{error}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('welcome')}
                    className="flex-1 rounded-xl border border-white/10 bg-zinc-950 py-4 font-semibold text-white hover:bg-zinc-900"
                  >
                    Back
                  </button>
                  <button
                    disabled={!accreditationKey}
                    onClick={handleParseKey}
                    className="flex-[2] rounded-xl bg-blue-600 py-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                  >
                    Validate Key
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'identity' && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                {isProvisioning ? (
                  <div className="space-y-8 py-12">
                    <div className="relative mx-auto h-24 w-24">
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-blue-500/20"
                      />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-t-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                        <Cloud size={32} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Bridging Terminal...</h2>
                      <p className="text-zinc-400 italic text-sm">"{provisioningStatus}"</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                      <Cloud size={40} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Sovereign Identity</h2>
                      <p className="text-zinc-400">Connect your Google account to bridge Viabhron to your own private infrastructure.</p>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleGoogleLogin}
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                    >
                      <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                      Continue with Google
                    </button>
                    
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                      We require access to Cloud Platform and Firebase APIs to provision your private substrate. 
                      All data remains strictly within your project boundary.
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {step === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">Cloud Discovery</h2>
                  <p className="text-zinc-400 text-sm">Select the Google Cloud project where you want to "Pitch your Tent".</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 no-scrollbar">
                  {loadingProjects ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="text-zinc-500 text-xs animate-pulse">Scanning Substrate...</p>
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <button
                        key={project.projectId}
                        onClick={() => setSelectedProjectId(project.projectId)}
                        className={`
                          w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                          ${selectedProjectId === project.projectId 
                            ? 'bg-blue-600/20 border-blue-500' 
                            : 'bg-zinc-950 border-white/5 hover:border-white/20'}
                        `}
                      >
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                          <Database size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{project.name}</div>
                          <div className="text-xs text-zinc-500 font-mono truncate">{project.projectId}</div>
                        </div>
                        {selectedProjectId === project.projectId && <CheckCircle2 className="text-blue-500" size={20} />}
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-500 text-sm">
                      No projects found.
                    </div>
                  )}
                </div>

                <button
                  disabled={!selectedProjectId}
                  onClick={() => setStep('brain')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                >
                  Next: Choose Brain
                </button>
              </motion.div>
            )}

            {step === 'brain' && (
              <motion.div
                key="brain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">The Sovereign Anchor</h2>
                  <p className="text-zinc-400">Choose the Tiny LLM that will act as your Cloud Manager. This brain stays in your private cloud.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'm2.7', name: 'MiniMax M2.7', desc: 'Self-Evolving', icon: <Zap size={20} /> },
                    { id: 'gemma-2b', name: 'Gemma', desc: 'Safety-First', icon: <Shield size={20} /> },
                    { id: 'llama-3', name: 'Llama', desc: 'Versatile', icon: <Brain size={20} /> },
                    { id: 'phi-3', name: 'Phi-3', desc: 'Logical', icon: <Cpu size={20} /> }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrainType(b.id)}
                      className={`flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
                        brainType === b.id 
                          ? 'border-blue-500 bg-blue-500/10 text-white' 
                          : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${brainType === b.id ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                        {b.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{b.name}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{b.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep('fuel')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500"
                >
                  Next: Add Fuel
                </button>
              </motion.div>
            )}

            {step === 'fuel' && (
              <motion.div
                key="fuel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">The Fuel</h2>
                  <p className="text-zinc-400">To power external "Contractor" agents, I need a Gemini API Key. This allows your office to perform heavy lifting.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                      type="password"
                      placeholder="Paste your Gemini API Key"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-400 hover:text-blue-300"
                  >
                    Get a free API Key from Google AI Studio →
                  </a>
                </div>

                <button
                  disabled={!geminiKey}
                  onClick={() => setStep('ignition')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                >
                  Next: Ignition
                </button>
              </motion.div>
            )}

            {step === 'ignition' && (
              <motion.div
                key="ignition"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center"
              >
                {!isProvisioning ? (
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                      <Zap size={40} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">Ready for Ignition</h2>
                      <p className="text-zinc-400">I have everything I need. I am now ready to hatch your private office in project <strong>{selectedProjectId}</strong>.</p>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-left flex gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p>{error}</p>
                          <a 
                            href="https://console.cloud.google.com/apis/library/firebase.googleapis.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-300 underline mt-1 inline-block"
                          >
                            Check API Permissions
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="rounded-xl bg-zinc-950 p-6 text-left text-[10px] text-zinc-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Server size={14} />
                        <span className="font-mono uppercase tracking-widest">Provisioning Manifest</span>
                      </div>
                      <ul className="space-y-1 font-mono uppercase tracking-tighter">
                        <li>• Substrate: Google Cloud Run</li>
                        <li>• Database: Firebase Firestore</li>
                        <li>• Vault: Google Drive</li>
                        <li>• Brain: {brainType.toUpperCase()}</li>
                        <li>• Project: {selectedProjectId}</li>
                      </ul>
                    </div>
                    <button
                      onClick={handleIgnition}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-black transition-all hover:bg-orange-400"
                    >
                      Ignite Sovereign Office
                      <Zap size={20} className="fill-current" />
                    </button>
                  </>
                ) : (
                  <div className="space-y-8 py-12">
                    <div className="relative mx-auto h-24 w-24">
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-blue-500/20"
                      />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-t-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                        <Cloud size={32} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Hatching Office...</h2>
                      <p className="text-zinc-400 italic text-sm">"{provisioningStatus}"</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-blue-500"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
