import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const Logo: React.FC<{ className?: string, apiKey?: string }> = ({ className = "w-10 h-10", apiKey }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const cachedLogo = localStorage.getItem('viabhron_logo');
    if (cachedLogo) {
      setLogoUrl(cachedLogo);
      return;
    }

    if (!apiKey) return;

    const generateLogo = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A professional app icon featuring a modern office building made of glass and metal with a slight golden tinge. The building is entwined with glowing "space blue" vines that contain an internal electricity grid with nodes appearing as tiny stars. The design is sleek and high-tech. Very subtly integrated into the textures or architectural details are a small anvil, a lion\'s head, and the letters "S", "V", and "L". The overall aesthetic is "Modular AI Operating System", sophisticated and cosmic.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const url = `data:image/png;base64,${part.inlineData.data}`;
            setLogoUrl(url);
            localStorage.setItem('viabhron_logo', url);
            break;
          }
        }
      } catch (error) {
        console.error('Error generating logo:', error);
      }
    };

    generateLogo();
  }, []);

  if (!logoUrl) {
    return (
      <div className={`${className} bg-gray-900 rounded-xl animate-pulse flex items-center justify-center border border-white/5`}>
        <div className="w-1/2 h-1/2 bg-blue-500/20 rounded-full" />
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="Viabhron Logo" 
      className={`${className} rounded-xl object-cover shadow-lg shadow-blue-500/20 border border-white/10`}
      referrerPolicy="no-referrer"
    />
  );
};
