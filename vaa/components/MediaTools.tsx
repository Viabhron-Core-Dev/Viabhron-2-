import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  Camera, 
  RefreshCw, 
  Check, 
  User, 
  QrCode, 
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Agent } from "../../src/types";

interface CameraCaptureProps {
  onClose: () => void;
  agents: Agent[];
  onSend: (agentId: string, image: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onClose, agents, onSend }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setError(null);
    try {
      // Try environment camera first (back camera)
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" }, 
          audio: false 
        });
      } catch (e) {
        // Fallback to any camera
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false 
        });
      }
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError("Camera access denied. Please grant permission in your browser settings and ensure you are using a secure connection.");
        } else if (err.name === 'NotFoundError') {
          setError("No camera found on this device.");
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError("An unknown error occurred while accessing the camera.");
      }
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(dataUrl);
        
        // Stop stream after capture to save resources
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const retake = async () => {
    setCapturedImage(null);
    setSelectedAgentId(null);
    await startCamera();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[200] flex flex-col"
    >
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[210]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-white font-bold uppercase tracking-widest text-xs">Sovereign Lens</h2>
        <div className="w-12" />
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="p-8 text-center space-y-6 max-w-sm">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold">Permission Required</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                {error}
              </p>
            </div>
            <button 
              onClick={startCamera}
              className="px-6 py-3 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-[10px]"
            >
              Try Again
            </button>
          </div>
        ) : !capturedImage ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={capturedImage} alt="Captured" className="h-full w-full object-cover" />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-8 bg-black/40 backdrop-blur-xl border-t border-white/10">
        {!capturedImage ? (
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Align subject for AI synthesis</p>
            <button 
              onClick={capturePhoto}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group"
            >
              <div className="w-16 h-16 bg-white rounded-full group-active:scale-90 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm">Select Recipient Agent</h3>
              <button onClick={retake} className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                <RefreshCw className="w-3 h-3" />
                Retake
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {agents.map(agent => (
                <button 
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                    selectedAgentId === agent.id ? "bg-wa-header text-white scale-105 shadow-lg" : "bg-white/5 text-white/70"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    selectedAgentId === agent.id ? "border-white" : "border-white/10"
                  }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold truncate w-16 text-center">{agent.name}</span>
                </button>
              ))}
            </div>

            <button 
              disabled={!selectedAgentId}
              onClick={() => selectedAgentId && onSend(selectedAgentId, capturedImage)}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                selectedAgentId ? "bg-wa-header text-white shadow-lg shadow-wa-header/20" : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <Check className="w-5 h-5" />
              Send to Agent
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface QRScannerProps {
  onClose: () => void;
  onScan: (data: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onClose, onScan }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setError(null);
    try {
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" }, 
          audio: false 
        });
      } catch (e) {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false 
        });
      }
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError("Camera access denied. Please grant permission in your browser settings.");
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[200] flex flex-col"
    >
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[210]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} 
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-white font-bold uppercase tracking-widest text-xs">Secure QR Scanner</h2>
        <div className="w-12" />
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="p-8 text-center space-y-6 max-w-sm z-20">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold">Scanner Offline</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                {error}
              </p>
            </div>
            <button 
              onClick={startCamera}
              className="px-6 py-3 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-[10px]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover opacity-60"
            />
            
            {/* Scanner Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-64 h-64 border-2 border-wa-header rounded-[2.5rem] relative flex items-center justify-center">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
                
                <motion.div 
                  animate={{ y: [0, 200, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 left-4 right-4 h-0.5 bg-wa-header shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                />
                
                <QrCode className="w-12 h-12 text-white/20" />
              </div>
              <p className="mt-8 text-white font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Scanning Substrate...</p>
            </div>
          </>
        )}
      </div>

      <div className="p-10 bg-black/40 backdrop-blur-xl border-t border-white/10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Sovereign Encryption Active</span>
        </div>
        <p className="text-white/40 text-[10px] text-center leading-relaxed max-w-xs">
          Scanning is performed locally on your device. No biometric or payment data ever leaves the kernel.
        </p>
        <button 
          onClick={() => onScan("MOCK_QR_DATA_12345")}
          className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 fill-black" />
          Simulate Scan
        </button>
      </div>
    </motion.div>
  );
};
