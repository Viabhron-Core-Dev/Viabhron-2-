import { initializeApp, deleteApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { MigrationService, MigrationData } from "./migrationService";

/**
 * TECHNIQUE: Dynamic Infrastructure Re-initialization
 * This class manages the connection to the USER'S private backend.
 */
class InfrastructureManager {
  private currentApp: FirebaseApp | null = null;
  public db: Firestore | null = null;
  private token: string | null = null;
  private migrationPackage: MigrationData | null = null;

  // 1. Fetch User's Google Cloud Projects
  async fetchUserProjects(accessToken: string) {
    this.token = accessToken;
    const response = await fetch('https://cloudresourcemanager.googleapis.com/v1/projects', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    return data.projects || []; // Returns list of IDs and Names
  }

  // 2. Fetch the Firebase Config for a specific project
  async getProjectConfig(projectId: string) {
    // Note: Requires the Firebase Management API enabled on the user's project
    const url = `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps/-/config`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch config for project ${projectId}. Ensure Firebase Management API is enabled.`);
    }
    return await response.json();
  }

  // 3. Hot-Swap the Database Connection
  async connectToUserBackend(config: any, userId?: string, shouldMigrate?: boolean) {
    // If migration is requested, export from default DB first
    if (shouldMigrate && userId) {
      this.migrationPackage = await MigrationService.exportData(userId);
    }

    // Clear existing Firebase instances to prevent "Duplicate App" errors
    const apps = getApps();
    for (const app of apps) {
      await deleteApp(app);
    }

    // Re-initialize with the user's credentials
    this.currentApp = initializeApp(config);
    this.db = getFirestore(this.currentApp);
    
    // If we have a migration package, import it now
    if (this.migrationPackage && userId) {
      await MigrationService.importData(userId, this.migrationPackage, this.db);
      this.migrationPackage = null; // Clear it
    }

    // Save locally for persistence
    localStorage.setItem('viabhron_firebase_config', JSON.stringify(config));
    
    console.log("Successfully bridged to User-Owned Infrastructure.");
    return this.db;
  }

  // 4. Provision Triple-Service (Simulated)
  async provisionTripleService(projectId: string, brainType: string) {
    console.log(`Provisioning Triple-Service for ${projectId} with brain ${brainType}...`);
    
    // In a real app, these would be actual API calls to GCP using the accessToken
    // 1. Enable APIs (Cloud Run, Firestore, Drive)
    // 2. Initialize Firestore
    // 3. Deploy Cloud Run container with the selected brain
    // 4. Create Drive folder
    
    // For now, we simulate the delay and return a success state
    // The UI in Discovery.tsx handles the step-by-step visual feedback
    
    const residentUrl = `https://viabhron-architect-${projectId}.a.run.app`;
    localStorage.setItem('resident_agent_url', residentUrl);
    localStorage.setItem('resident_brain_type', brainType);
    
    return {
      success: true,
      residentUrl
    };
  }

  // 5. Load persisted config on startup
  async loadPersistedConfig() {
    const savedConfig = localStorage.getItem('viabhron_firebase_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        return await this.connectToUserBackend(config);
      } catch (e) {
        console.error("Failed to load persisted config", e);
      }
    }
    return null;
  }
}

export const infra = new InfrastructureManager();
