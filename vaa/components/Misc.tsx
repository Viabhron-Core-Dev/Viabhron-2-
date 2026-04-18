import React from "react";
import { 
  AlertCircle, 
  Search, 
  RefreshCw, 
  Workflow as WorkflowIcon, 
  Play 
} from "lucide-react";

export const SearchAndFilters = ({ 
  filters, 
  activeFilter, 
  onFilterChange,
  searchQuery,
  onSearchChange
}: { 
  filters: string[], 
  activeFilter: string, 
  onFilterChange: (filter: string) => void,
  searchQuery: string,
  onSearchChange: (query: string) => void
}) => (
  <div className="px-4 space-y-4 mb-4">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input 
        type="text" 
        placeholder="Search chats..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-wa-header/20 outline-none transition-all shadow-sm"
      />
    </div>
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {filters.map((filter) => (
        <button 
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            activeFilter === filter ? "bg-wa-header text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
);

export const WorkflowTab = ({ onOpenWorkflow }: { onOpenWorkflow: () => void }) => (
  <div className="flex-1 flex flex-col p-4">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xs font-bold text-wa-header uppercase tracking-widest">Workflow Lab</h2>
      <RefreshCw className="w-5 h-5 text-wa-header" />
    </div>
    
    <div className="space-y-4">
      {/* Sentinel-style Default Canvas */}
      <div 
        onClick={onOpenWorkflow}
        className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm cursor-pointer hover:bg-indigo-100 transition-colors group"
      >
        <div className="w-16 h-16 rounded-3xl bg-wa-header text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <WorkflowIcon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-lg">Sentinel Canvas</h3>
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Default Empty Scratchpad</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
          <Play className="w-5 h-5 fill-indigo-600" />
        </div>
      </div>

      <div className="pt-8 text-center space-y-2">
        <p className="text-slate-400 font-medium text-sm">No other councils formed yet.</p>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Tap + to build a new pipeline</p>
      </div>
    </div>
  </div>
);
