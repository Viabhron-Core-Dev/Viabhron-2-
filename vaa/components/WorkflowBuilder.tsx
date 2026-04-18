import React from "react";
import { 
  MessageSquare, 
  Cpu, 
  Globe, 
  X, 
  Settings, 
  Plus 
} from "lucide-react";
import { motion } from "motion/react";

interface WorkflowBuilderProps {
  onClose: () => void;
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ onClose }) => {
  const steps = [
    { id: "1", type: "trigger", label: "Trigger", description: "When a new email arrives", icon: <MessageSquare className="w-5 h-5" />, color: "bg-blue-500" },
    { id: "2", type: "process", label: "Process", description: "Summarize with Research Agent", icon: <Cpu className="w-5 h-5" />, color: "bg-purple-500" },
    { id: "3", type: "action", label: "Action", description: "Post to #updates channel", icon: <Globe className="w-5 h-5" />, color: "bg-green-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 bg-white z-[120] flex flex-col p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Workflow Builder</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Design your AI automation pipeline</p>
        </div>
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        <div className="relative pl-8 space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[2.45rem] top-4 bottom-4 w-0.5 bg-slate-100" />

          {steps.map((step, i) => (
            <div key={step.id} className="relative flex items-center gap-6 group">
              <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{step.label}</h3>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="relative flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 z-10 bg-white">
              <Plus className="w-6 h-6" />
            </div>
            <button className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
              Add Step
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex gap-3">
        <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold uppercase tracking-widest text-xs">
          Save Draft
        </button>
        <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/20">
          Deploy Workflow
        </button>
      </div>
    </motion.div>
  );
};
