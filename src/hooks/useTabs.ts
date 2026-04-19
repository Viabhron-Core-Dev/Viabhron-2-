import { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../lib/firebase';
import { Tab, TabType, Extension } from '../types';

const MAX_ACTIVE_TABS = 3;

export function useTabs(user: User | null, extensions: Extension[]) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !db) {
      // Only initialize if we have no tabs and no user/db
      if (!user) {
        setTabs(prev => {
          if (prev.length > 0) return prev;
          const defaultExtensionIds = extensions.filter(e => e.status === 'active').map(e => e.id);
          const initialTab: Tab = { 
            id: 'default-vaa-tab', 
            title: 'VhatsAppeningAi', 
            type: 'vhatsappening', 
            active: true,
            status: 'active',
            activeExtensionIds: defaultExtensionIds,
            canvasData: { nodes: [], edges: [] },
            metadata: { lastAccessed: new Date() }
          };
          setActiveTabId('default-vaa-tab');
          return [initialTab];
        });
      }
      return;
    }

    const tabsRef = collection(db, 'users', user.uid, 'tabs');
    const q = query(tabsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTabs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Tab));

      if (fetchedTabs.length === 0) {
        const newTabId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const defaultExtensionIds = extensions.filter(e => e.status === 'active').map(e => e.id);
        setDoc(doc(tabsRef, newTabId), {
          id: newTabId,
          title: 'VhatsAppeningAi',
          type: 'vhatsappening',
          active: true,
          status: 'active',
          activeExtensionIds: defaultExtensionIds,
          canvasData: { nodes: [], edges: [] },
          metadata: { lastAccessed: serverTimestamp() },
          createdAt: serverTimestamp()
        });
      } else {
        setTabs(fetchedTabs);
        // Set active tab if none set or if current active tab was deleted
        setActiveTabId(prev => {
          if (!prev || !fetchedTabs.find(t => t.id === prev)) {
            return fetchedTabs[0].id;
          }
          return prev;
        });
      }
    });

    return () => unsubscribe();
  }, [user, extensions]);

  const tabsWithActive = useMemo(() => {
    return tabs.map(t => ({
      ...t,
      active: t.id === activeTabId
    }));
  }, [tabs, activeTabId]);

  const handleShelveTab = async (id: string) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'tabs', id), { status: 'shelved', active: false }, { merge: true });
    } else {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, status: 'shelved', active: false } : t));
    }
  };

  const handleWakeTab = async (id: string) => {
    const activeTabs = tabs.filter(t => t.status === 'active');
    if (activeTabs.length >= MAX_ACTIVE_TABS) {
      const oldestActive = activeTabs[0];
      await handleShelveTab(oldestActive.id);
    }

    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'tabs', id), { 
        status: 'active', 
        active: true,
        metadata: { lastAccessed: serverTimestamp() }
      }, { merge: true });
    } else {
      setTabs(prev => prev.map(t => t.id === id ? { 
        ...t, 
        status: 'active', 
        active: true,
        metadata: { ...t.metadata, lastAccessed: new Date() }
      } : { ...t, active: false }));
    }
    setActiveTabId(id);
  };

  const handleAddTab = async (type: TabType = 'chat', title: string = 'New Session', agentId?: string) => {
    const effectiveAgentId = agentId || (type === 'chat' ? 'head-architect' : undefined);
    
    if (type === 'settings' || type === 'agents') {
      const existing = tabs.find(t => t.type === type);
      if (existing) {
        if (existing.status === 'shelved') {
          await handleWakeTab(existing.id);
        } else {
          setActiveTabId(existing.id);
        }
        return;
      }
    }

    const defaultExtensionIds = extensions.filter(e => e.status === 'active').map(e => e.id);
    const activeTabs = tabs.filter(t => t.status === 'active');
    
    if (activeTabs.length >= MAX_ACTIVE_TABS && !['settings', 'agents'].includes(type)) {
      const oldestActive = activeTabs[0];
      await handleShelveTab(oldestActive.id);
    }

    if (!user) {
      const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newTab: Tab = { 
        id: newId, 
        title, 
        type, 
        active: true,
        status: 'active',
        agentId: effectiveAgentId,
        activeExtensionIds: defaultExtensionIds,
        canvasData: type === 'canvas' ? { nodes: [], edges: [] } : undefined,
        metadata: { lastAccessed: new Date() }
      };
      setTabs(prev => prev.map(t => ({ ...t, active: false })).concat(newTab));
      setActiveTabId(newId);
      return;
    }

    const newTabId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tabsRef = collection(db, 'users', user.uid, 'tabs');
    await setDoc(doc(tabsRef, newTabId), {
      id: newTabId,
      title,
      type,
      active: true,
      status: 'active',
      agentId: effectiveAgentId,
      activeExtensionIds: defaultExtensionIds,
      canvasData: type === 'canvas' ? { nodes: [], edges: [] } : undefined,
      metadata: { lastAccessed: serverTimestamp() },
      createdAt: serverTimestamp()
    });
    setActiveTabId(newTabId);
  };

  const handleCloseTab = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'tabs', id));
      if (activeTabId === id) {
        const remainingTabs = tabs.filter(t => t.id !== id);
        setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
      }
    } else {
      const newTabs = tabs.filter(t => t.id !== id);
      if (activeTabId === id) {
        const lastTabId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
        setActiveTabId(lastTabId);
      }
      setTabs(newTabs);
    }
  };

  return { 
    tabs: tabsWithActive, 
    activeTabId, 
    setActiveTabId, 
    handleAddTab, 
    handleCloseTab, 
    handleWakeTab, 
    handleShelveTab 
  };
}
