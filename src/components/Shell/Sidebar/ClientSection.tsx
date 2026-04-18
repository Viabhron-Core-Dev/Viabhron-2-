import React from 'react';
import { Monitor, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client } from '../../../types';
import * as Icons from 'lucide-react';

interface ClientSectionProps {
  clients: Client[];
  onToggleClient: (id: string) => void;
  onOpenStore: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ClientSection: React.FC<ClientSectionProps> = ({
  clients,
  onToggleClient,
  onOpenStore,
  isOpen,
  onToggle
}) => {
  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <Monitor className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Viabhronic Application</span>
        </div>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
          >
            {clients.map((client) => {
              const Icon = (Icons as any)[client.icon] || Monitor;
              return (
                <div
                  key={client.id}
                  className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all"
                >
                  <div className={`p-1.5 rounded bg-gray-800/50 ${client.enabled ? 'text-purple-400' : 'text-gray-500'} transition-colors`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${client.enabled ? 'text-gray-200' : 'text-gray-500'}`}>
                      {client.name}
                    </div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                      {client.type} • {client.accreditationId}
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleClient(client.id)}
                    className={`
                      w-7 h-4 rounded-full relative transition-all duration-200
                      ${client.enabled ? 'bg-purple-600' : 'bg-gray-700'}
                    `}
                  >
                    <div className={`
                      absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200
                      ${client.enabled ? 'left-3.5' : 'left-0.5'}
                    `} />
                  </button>
                </div>
              );
            })}
            <button 
              onClick={onOpenStore}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Accredit New Client
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
