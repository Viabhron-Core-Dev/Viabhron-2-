import Dexie, { type Table } from "dexie";
import { 
  CelestialNode, 
  CelestialChat, 
  Skill, 
  MCPServer, 
  RelayProfile, 
  GitProfile,
  Workflow,
  Debate
} from "../types";

export class VhatsAppeningDb extends Dexie {
  nodes!: Table<CelestialNode, string>;
  chats!: Table<CelestialChat, string>;
  followedChannels!: Table<{ id: string }, string>;
  skills!: Table<Skill, string>;
  mcpServers!: Table<MCPServer, string>;
  relayProfiles!: Table<RelayProfile, string>;
  gitProfiles!: Table<GitProfile, string>;
  workflows!: Table<Workflow, string>;
  debates!: Table<Debate, string>;

  constructor() {
    super("VhatsAppeningAi");
    this.version(6).stores({
      nodes: "id, provider, name",
      chats: "id, nodeId, type",
      followedChannels: "id",
      skills: "id, name, type",
      mcpServers: "id, name, url",
      relayProfiles: "id, name, type",
      gitProfiles: "id, name, forge",
      workflows: "id, name",
      debates: "id, name, status"
    });
  }
}

export const localDb = new VhatsAppeningDb();
