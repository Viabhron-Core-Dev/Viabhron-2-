import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Target, 
  Brain, 
  ChevronRight, 
  Clock, 
  Award, 
  Zap,
  Search,
  Book,
  PenTool,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Dna,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Session {
  id: string;
  subject: string;
  topic: string;
  mode: string;
  score?: number;
  totalQuestions: number;
  weakSpots: string[];
  time: string;
}

export const AcademyBridgeControl: React.FC = () => {
  const [sessions] = useState<Session[]>([
    {
      id: 's-01',
      subject: 'Biology',
      topic: 'Cell Structure',
      mode: 'Mock Test',
      score: 8,
      totalQuestions: 10,
      weakSpots: ['Mitochondria DNA', 'Ribosome Synthesis'],
      time: '2h ago'
    },
    {
      id: 's-02',
      subject: 'Physics',
      topic: 'Thermodynamics',
      mode: 'Flashcards',
      totalQuestions: 20,
      weakSpots: ['Entropy Laws'],
      time: '1d ago'
    }
  ]);

  const [isGenerating] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#090a0c] text-slate-300 font-sans selection:bg-indigo-500/30">
      {/* Academy Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Sovereign Academy</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Agent-Led Learning Substrate</span>
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
            </div>
          </div>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-all"
        >
          <Zap className={`w-3.5 h-3.5 ${isGenerating ? 'animate-pulse' : ''}`} />
          Generate Learning Pulse
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Progress Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Target Exam</h3>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-white">NEET UG</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">24 Days Left</span>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Mastery Level</h3>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-white">72%</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Sessions Completed</h3>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-white">142</span>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Rank: 04</span>
            </div>
          </div>
        </section>

        {/* Recent Sessions */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Learning History</h3>
            <span className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">Neural Archive Synced</span>
          </div>
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                      {session.mode === 'Mock Test' ? <PenTool className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{session.topic}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{session.subject}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{session.mode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {session.score !== undefined ? (
                      <span className="text-lg font-bold text-white">{session.score}/{session.totalQuestions}</span>
                    ) : (
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">In Progress</span>
                    )}
                    <span className="text-[9px] text-slate-600 font-medium uppercase tracking-widest">{session.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      Weak Spot Analysis
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {session.weakSpots.map(spot => (
                        <span key={spot} className="px-2 py-1 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[9px] font-bold text-amber-500/80 uppercase tracking-widest">
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                      Review Session
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Ingestion */}
        <section className="p-6 rounded-[2.5rem] bg-white/[0.01] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Vetted Ingestion</h3>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Add textbooks or PDFs to your private library</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Book className="w-5 h-5 text-slate-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Physics Wallah', icon: <Zap className="w-4 h-4" /> },
              { name: 'Careers360', icon: <Search className="w-4 h-4" /> },
              { name: 'NCERT PDF', icon: <FileText className="w-4 h-4" /> },
              { name: 'Custom Notes', icon: <PenTool className="w-4 h-4" /> }
            ].map(source => (
              <button key={source.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-all flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  {source.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{source.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[8px] font-bold text-indigo-500/80 uppercase tracking-[0.2em]">Sovereign Tutor: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Dna className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Neural Sync: 100%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-slate-600" />
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Educational Sovereignty Ratified</span>
        </div>
      </div>
    </div>
  );
};
