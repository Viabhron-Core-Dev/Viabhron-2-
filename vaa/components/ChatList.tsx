import React from "react";
import { Terminal } from "lucide-react";
import { CelestialChat } from "../../src/types";

interface ChatListProps {
  chats: CelestialChat[];
  onSelectChat: (chat: CelestialChat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-2">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onSelectChat(chat)}
          className="flex items-center gap-4 p-3 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors mb-1"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-sm border-2 ${
            chat.type === 'gmail' ? 'bg-blue-50 text-blue-500 border-blue-100' : 
            chat.type === 'sentinel' ? 'bg-orange-50 text-orange-500 border-orange-100' :
            'bg-purple-50 text-purple-500 border-purple-100'
          }`}>
            {chat.type === 'gmail' ? "?" : chat.type === 'sentinel' ? <Terminal className="w-7 h-7" /> : "Ω"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 truncate">{chat.name}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ${
                chat.type === 'gmail' ? 'bg-red-100 text-red-600' : 
                chat.type === 'sentinel' ? 'bg-orange-100 text-orange-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                {chat.type?.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
