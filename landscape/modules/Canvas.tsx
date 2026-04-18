import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Undo2,
  Redo2,
  Box, 
  Zap, 
  Cpu, 
  Layout, 
  Plus, 
  Play, 
  Settings, 
  Eye, 
  EyeOff,
  Database,
  Github,
  Search,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X,
  Trash2,
  Terminal,
  Type,
  ArrowRight
} from 'lucide-react';
import { CanvasNode, CanvasEdge, UIMode } from '../../src/types';

interface CanvasProps {
  tabId: string;
  userId?: string;
  initialData?: { nodes: CanvasNode[]; edges: CanvasEdge[] };
  onUpdate: (data: { nodes: CanvasNode[]; edges: CanvasEdge[] }) => void;
  viewMode?: 'design' | 'logic';
  onViewModeChange?: (mode: 'design' | 'logic') => void;
  uiMode?: UIMode;
}

export const Canvas: React.FC<CanvasProps> = ({ 
  tabId, 
  userId, 
  initialData, 
  onUpdate,
  viewMode: externalViewMode,
  onViewModeChange,
  uiMode
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialData?.nodes || [
    { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'User Input' }, status: 'idle' },
    { id: '2', type: 'ai_text', position: { x: 400, y: 100 }, data: { label: 'Gemini Flash' }, status: 'idle' },
  ]);
  const [edges, setEdges] = useState<CanvasEdge[]>(initialData?.edges || [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'out', targetHandle: 'in' }
  ]);
  const [internalViewMode, setInternalViewMode] = useState<'design' | 'logic'>('logic');
  const [showNodeSettings, setShowNodeSettings] = useState<string | null>(null);
  
  const viewMode = externalViewMode || internalViewMode;
  const setViewMode = onViewModeChange || setInternalViewMode;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [longPressNodeId, setLongPressNodeId] = useState<string | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // History for Undo/Redo
  const [history, setHistory] = useState<{ nodes: CanvasNode[]; edges: CanvasEdge[] }[]>([]);
  const [future, setFuture] = useState<{ nodes: CanvasNode[]; edges: CanvasEdge[] }[]>([]);

  const saveToHistory = () => {
    setHistory(prev => [...prev, { nodes, edges }].slice(-50)); // Keep last 50 steps
    setFuture([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture(prev => [{ nodes, edges }, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setNodes(previous.nodes);
    setEdges(previous.edges);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory(prev => [...prev, { nodes, edges }]);
    setFuture(prev => prev.slice(1));
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  // Touch pinch zoom state
  const touchStartDist = useRef<number | null>(null);
  const touchStartZoom = useRef<number>(1);
  const touchStartPan = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef<number>(0);

  useEffect(() => {
    onUpdate({ nodes, edges });
  }, [nodes, edges]);

  const handleAddNode = (type: CanvasNode['type']) => {
    saveToHistory();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    const centerX = rect ? (rect.width / 2 - pan.x) / zoom : (200 - pan.x) / zoom;
    const centerY = rect ? (rect.height / 2 - pan.y) / zoom : (200 - pan.y) / zoom;

    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: centerX - 110, y: centerY - 40 },
      data: { label: type.split('_').join(' ').toUpperCase() },
      status: 'idle'
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeDrag = (id: string, pos: { x: number; y: number }) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, position: pos } : n));
  };

  const handleNodeDragStart = (id: string) => {
    saveToHistory();
    setIsDraggingNode(true);
    setLongPressNodeId(id);
  };

  const handleNodeDragEnd = () => {
    saveToHistory();
    setIsDraggingNode(false);
    setLongPressNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSpeed = 0.01;
      const delta = -e.deltaY;
      const scaleFactor = Math.pow(1.1, delta / 100);
      
      const newZoom = Math.min(Math.max(zoom * scaleFactor, 0.1), 5);
      
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Zoom towards cursor
        const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
        const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);
        
        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
      }
    } else {
      // Regular pan with wheel
      setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (isDraggingNode) return;

    if (e.touches.length === 1) {
      // Double tap detection
      if (now - lastTap.current < DOUBLE_TAP_DELAY) {
        const newZoom = zoom > 1.5 ? 1 : 2;
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const centerX = e.touches[0].pageX - rect.left;
          const centerY = e.touches[0].pageY - rect.top;
          
          const newPanX = centerX - (centerX - pan.x) * (newZoom / zoom);
          const newPanY = centerY - (centerY - pan.y) * (newZoom / zoom);
          
          setZoom(newZoom);
          setPan({ x: newPanX, y: newPanY });
        }
        lastTap.current = 0; // Reset
        return;
      }
      lastTap.current = now;

      // Single touch pan start
      touchStartPan.current = {
        x: e.touches[0].pageX - pan.x,
        y: e.touches[0].pageY - pan.y
      };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      touchStartDist.current = dist;
      touchStartZoom.current = zoom;
      touchStartPan.current = null; // Disable pan when pinching
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingNode) return;
    if (e.touches.length === 1 && touchStartPan.current) {
      // Single touch panning
      setPan({
        x: e.touches[0].pageX - touchStartPan.current.x,
        y: e.touches[0].pageY - touchStartPan.current.y
      });
    } else if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const scale = dist / touchStartDist.current;
      const newZoom = Math.min(Math.max(touchStartZoom.current * scale, 0.1), 5);
      
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const centerX = (e.touches[0].pageX + e.touches[1].pageX) / 2 - rect.left;
        const centerY = (e.touches[0].pageY + e.touches[1].pageY) / 2 - rect.top;
        
        const newPanX = centerX - (centerX - pan.x) * (newZoom / zoom);
        const newPanY = centerY - (centerY - pan.y) * (newZoom / zoom);
        
        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartDist.current = null;
    touchStartPan.current = null;
  };

  // Minimap calculations
  const getBounds = () => {
    // Default bounds
    let minX = -1000;
    let minY = -1000;
    let maxX = 1000;
    let maxY = 1000;

    if (nodes.length > 0) {
      minX = Math.min(...nodes.map(n => n.position.x));
      minY = Math.min(...nodes.map(n => n.position.y));
      maxX = Math.max(...nodes.map(n => n.position.x)) + 220;
      maxY = Math.max(...nodes.map(n => n.position.y)) + 80;
    }

    // Include viewport
    const viewportMinX = -pan.x / zoom;
    const viewportMinY = -pan.y / zoom;
    const viewportMaxX = viewportMinX + (canvasRef.current?.offsetWidth || 0) / zoom;
    const viewportMaxY = viewportMinY + (canvasRef.current?.offsetHeight || 0) / zoom;

    minX = Math.min(minX, viewportMinX);
    minY = Math.min(minY, viewportMinY);
    maxX = Math.max(maxX, viewportMaxX);
    maxY = Math.max(maxY, viewportMaxY);

    // Add padding
    const padding = 400;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    // Ensure minimum size
    const width = maxX - minX;
    const height = maxY - minY;
    const minSize = 3000;
    
    if (width < minSize) {
      const diff = (minSize - width) / 2;
      minX -= diff;
      maxX += diff;
    }
    if (height < minSize) {
      const diff = (minSize - height) / 2;
      minY -= diff;
      maxY += diff;
    }

    return { minX, minY, maxX, maxY };
  };

  const bounds = getBounds();
  const worldWidth = bounds.maxX - bounds.minX;
  const worldHeight = bounds.maxY - bounds.minY;
  const minimapScale = Math.min(160 / worldWidth, 100 / worldHeight);

  const handleMinimapClick = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = (clientX - rect.left) / minimapScale + bounds.minX;
    const y = (clientY - rect.top) / minimapScale + bounds.minY;

    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      setPan({
        x: canvasRect.width / 2 - x * zoom,
        y: canvasRect.height / 2 - y * zoom
      });
    }
  };

  const getNodeIcon = (type: CanvasNode['type']) => {
    switch (type) {
      case 'ai_text': return <Cpu className="w-5 h-5 text-white" />;
      case 'ai_image': return <Zap className="w-5 h-5 text-white" />;
      case 'github': return <Github className="w-5 h-5 text-white" />;
      case 'ui_header': return <Layout className="w-5 h-5 text-white" />;
      case 'input': return <MessageSquare className="w-5 h-5 text-white" />;
      default: return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  const getNodeColor = (type: CanvasNode['type']) => {
    if (type.startsWith('ui')) return 'bg-cyan-500';
    if (type.startsWith('ai')) return 'bg-indigo-500';
    return 'bg-purple-500';
  };

  return (
    <div 
      className="flex h-full bg-white overflow-hidden relative font-sans"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Infinite Grid Background */}
      <div 
        className="absolute inset-0 light-dotted-grid"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      />

      {/* Undo/Redo Controls */}
      <div className="absolute top-8 right-8 z-50 flex flex-col gap-1.5 bg-white/80 backdrop-blur-md p-1 rounded-lg shadow-lg border border-slate-100">
        <button 
          onClick={undo}
          disabled={history.length === 0}
          className={`p-1.5 rounded-md transition-colors ${history.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-slate-100 mx-1" />
        <button 
          onClick={redo}
          disabled={future.length === 0}
          className={`p-1.5 rounded-md transition-colors ${future.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Minimap */}
      <div 
        className="absolute top-8 left-8 z-50 w-[120px] h-[80px] sm:w-[160px] sm:h-[100px] bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 overflow-hidden cursor-crosshair group"
        onClick={handleMinimapClick}
      >
        <div className="relative w-full h-full">
          {/* Minimap Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 text-slate-400">
            {edges.map(edge => {
              const s = nodes.find(n => n.id === edge.source);
              const t = nodes.find(n => n.id === edge.target);
              if (!s || !t) return null;
              return (
                <line 
                  key={edge.id}
                  x1={(s.position.x + 220 - bounds.minX) * minimapScale}
                  y1={(s.position.y + 40 - bounds.minY) * minimapScale}
                  x2={(t.position.x - bounds.minX) * minimapScale}
                  y2={(t.position.y + 40 - bounds.minY) * minimapScale}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {nodes.map(node => (
            <div 
              key={node.id}
              className={`absolute rounded-sm opacity-60 ${getNodeColor(node.type)}`}
              style={{
                left: (node.position.x - bounds.minX) * minimapScale,
                top: (node.position.y - bounds.minY) * minimapScale,
                width: 220 * minimapScale,
                height: 80 * minimapScale
              }}
            />
          ))}
          {/* Viewport Indicator */}
          {canvasRef.current && (
            <div 
              className="absolute border-2 border-indigo-500 bg-indigo-500/5 pointer-events-none transition-all duration-75"
              style={{
                left: (-pan.x / zoom - bounds.minX) * minimapScale,
                top: (-pan.y / zoom - bounds.minY) * minimapScale,
                width: (canvasRef.current.offsetWidth / zoom) * minimapScale,
                height: (canvasRef.current.offsetHeight / zoom) * minimapScale
              }}
            />
          )}
        </div>
        <div className="absolute bottom-1 right-2 text-[8px] font-bold text-slate-400 uppercase tracking-tighter pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Minimap
        </div>
      </div>

      {/* Bottom Docked Toolbar */}
      <div className={`absolute ${uiMode === 'browser' ? 'bottom-32 md:bottom-8' : 'bottom-8'} left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-indigo-600 p-3 rounded-2xl shadow-2xl transition-all duration-300`}>
        <ToolbarItem icon={Cpu} color="bg-blue-500" onClick={() => handleAddNode('ai_text')} />
        <ToolbarItem icon={Database} color="bg-green-500" onClick={() => handleAddNode('ui_content')} />
        <ToolbarItem icon={Zap} color="bg-purple-500" onClick={() => handleAddNode('ai_image')} />
        <ToolbarItem icon={ArrowRight} color="bg-indigo-400" onClick={() => {}} />
        <ToolbarItem icon={Github} color="bg-cyan-500" onClick={() => handleAddNode('github')} />
        <ToolbarItem icon={Type} color="bg-pink-500" onClick={() => {}} />
        <ToolbarItem icon={MessageSquare} color="bg-blue-400" onClick={() => handleAddNode('input')} />
        <ToolbarItem icon={ArrowRight} color="bg-slate-400" onClick={() => {}} />
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          if (isDraggingNode) return;
          if (e.target === canvasRef.current) {
            const startX = e.clientX - pan.x;
            const startY = e.clientY - pan.y;
            const onMouseMove = (moveEvent: MouseEvent) => {
              setPan({ x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
        >
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const x1 = sourceNode.position.x + 220;
              const y1 = sourceNode.position.y + 40;
              const x2 = targetNode.position.x;
              const y2 = targetNode.position.y + 40;
              const dx = Math.abs(x2 - x1) * 0.5;

              return (
                <g key={edge.id}>
                  <path 
                    d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                    stroke="url(#edge-gradient)"
                    strokeWidth="3"
                    fill="none"
                    className="opacity-40"
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDragStart={() => handleNodeDragStart(node.id)}
              onDrag={(e, info) => handleNodeDrag(node.id, { x: node.position.x + info.delta.x / zoom, y: node.position.y + info.delta.y / zoom })}
              onDragEnd={handleNodeDragEnd}
              initial={false}
              animate={{ 
                x: node.position.x, 
                y: node.position.y,
                scale: longPressNodeId === node.id ? 1.05 : (selectedNodeId === node.id ? 1.02 : 1),
                boxShadow: longPressNodeId === node.id 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(99, 102, 241, 0.4)' 
                  : (selectedNodeId === node.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none')
              }}
              onPointerDown={(e) => {
                // Long press detection
                longPressTimer.current = setTimeout(() => {
                  setLongPressNodeId(node.id);
                  if (window.navigator.vibrate) window.navigator.vibrate(50);
                }, 400);
              }}
              onPointerUp={() => {
                if (longPressTimer.current) clearTimeout(longPressTimer.current);
              }}
              onClick={() => {
                setSelectedNodeId(node.id);
                setShowNodeSettings(node.id);
              }}
              className={`
                absolute w-[220px] rounded-3xl p-5 cursor-pointer pointer-events-auto node-shadow transition-shadow
                ${getNodeColor(node.type)}
                ${selectedNodeId === node.id ? 'ring-4 ring-indigo-500/20' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    {getNodeIcon(node.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{node.data.label}</h4>
                    <p className="text-[9px] text-white/70 uppercase tracking-widest font-bold">{node.type.split('_').pop()}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToHistory();
                    setNodes(prev => prev.filter(n => n.id !== node.id));
                    setEdges(prev => prev.filter(edge => edge.source !== node.id && edge.target !== node.id));
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Ports */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-4 border-indigo-500 shadow-sm" />
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-4 border-indigo-500 shadow-sm" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Node Settings Modal */}
      <AnimatePresence>
        {showNodeSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6"
            onClick={() => setShowNodeSettings(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowNodeSettings(null)}
                className="absolute right-8 top-8 p-2 hover:bg-slate-50 rounded-full text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Node Settings</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Name</label>
                      <input 
                        type="text" 
                        placeholder="Specific Skill"
                        value={nodes.find(n => n.id === showNodeSettings)?.data.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNodes(prev => prev.map(n => n.id === showNodeSettings ? { ...n, data: { ...n.data, label: val } } : n));
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                        {nodes.find(n => n.id === showNodeSettings)?.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    saveToHistory();
                    setNodes(prev => prev.filter(n => n.id !== showNodeSettings));
                    setEdges(prev => prev.filter(edge => edge.source !== showNodeSettings && edge.target !== showNodeSettings));
                    setShowNodeSettings(null);
                  }}
                  className="w-full py-5 bg-red-50 text-red-500 rounded-3xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Node
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ToolbarItem = ({ icon: Icon, color, onClick }: { icon: any, color: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform active:scale-95`}
  >
    <Icon className="w-6 h-6" />
  </button>
);
