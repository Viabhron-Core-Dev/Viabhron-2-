import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getFirestore, 
  Firestore,
  query,
  orderBy
} from 'firebase/firestore';
import { db as defaultDb } from './firebase';

export interface MigrationData {
  agents: any[];
  tabs: any[];
  messages: Record<string, any[]>;
  settings: any[];
}

export class MigrationService {
  static async exportData(userId: string): Promise<MigrationData> {
    console.log("Exporting data from default Firestore...");
    const data: MigrationData = {
      agents: [],
      tabs: [],
      messages: {},
      settings: []
    };

    // 1. Export Agents
    const agentsSnap = await getDocs(collection(defaultDb, 'users', userId, 'agents'));
    data.agents = agentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // 2. Export Tabs & Messages
    const tabsSnap = await getDocs(collection(defaultDb, 'users', userId, 'tabs'));
    for (const tabDoc of tabsSnap.docs) {
      data.tabs.push({ id: tabDoc.id, ...tabDoc.data() });
      
      const messagesSnap = await getDocs(query(
        collection(defaultDb, 'users', userId, 'tabs', tabDoc.id, 'messages'),
        orderBy('timestamp', 'asc')
      ));
      data.messages[tabDoc.id] = messagesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    // 3. Export Settings (excluding cloud_config)
    const settingsSnap = await getDocs(collection(defaultDb, 'users', userId, 'settings'));
    data.settings = settingsSnap.docs
      .filter(d => d.id !== 'cloud_config')
      .map(d => ({ id: d.id, ...d.data() }));

    return data;
  }

  static async importData(userId: string, data: MigrationData, targetDb: Firestore): Promise<void> {
    console.log("Importing data to bridged Firestore...");

    // 1. Import Agents
    for (const agent of data.agents) {
      const { id, ...rest } = agent;
      await setDoc(doc(targetDb, 'users', userId, 'agents', id), rest);
    }

    // 2. Import Tabs & Messages
    for (const tab of data.tabs) {
      const { id, ...rest } = tab;
      await setDoc(doc(targetDb, 'users', userId, 'tabs', id), rest);
      
      const messages = data.messages[id] || [];
      for (const msg of messages) {
        const { id: msgId, ...msgRest } = msg;
        await setDoc(doc(targetDb, 'users', userId, 'tabs', id, 'messages', msgId), msgRest);
      }
    }

    // 3. Import Settings
    for (const setting of data.settings) {
      const { id, ...rest } = setting;
      await setDoc(doc(targetDb, 'users', userId, 'settings', id), rest);
    }

    console.log("Migration complete.");
  }
}
