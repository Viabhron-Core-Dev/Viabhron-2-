import { db, auth } from "@/src/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc,
  setDoc
} from "firebase/firestore";
import { MalwareIndex, SupplyChainAudit } from "@/src/types";

export class SupplyChainService {
  private static instance: SupplyChainService;
  
  private constructor() {}

  static getInstance(): SupplyChainService {
    if (!SupplyChainService.instance) {
      SupplyChainService.instance = new SupplyChainService();
    }
    return SupplyChainService.instance;
  }

  /**
   * Syncs the local malware index with global intelligence (Sonatype, etc.)
   */
  async syncMalwareIndex(): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    // Mocking a fetch from Sonatype Q1 2026 report
    const mockMalware: Partial<MalwareIndex>[] = [
      {
        packageName: "axios-compromised",
        registry: "npm",
        threatType: "Credential Theft / Trojan",
        severity: "critical",
        source: "Sonatype Q1 2026 Index"
      },
      {
        packageName: "react-dev-tools-fake",
        registry: "npm",
        threatType: "Staged Payload Delivery",
        severity: "high",
        source: "Sonatype Q1 2026 Index"
      },
      {
        packageName: "lodash-patch-malicious",
        registry: "npm",
        threatType: "Backdoor Injection",
        severity: "critical",
        source: "Sonatype Q1 2026 Index"
      }
    ];

    const malwareRef = collection(db, `users/${user.uid}/security/malware`);
    
    for (const item of mockMalware) {
      const q = query(malwareRef, where("packageName", "==", item.packageName));
      const existing = await getDocs(q);
      
      if (existing.empty) {
        await addDoc(malwareRef, {
          ...item,
          detectedAt: new Date().toISOString()
        });
      }
    }
  }

  /**
   * Scans a package manifest for malicious dependencies
   */
  async scanManifest(manifest: any, targetName: string): Promise<SupplyChainAudit> {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");

    const dependencies = {
      ...(manifest.dependencies || {}),
      ...(manifest.devDependencies || {})
    };

    const findings: string[] = [];
    const malwareRef = collection(db, `users/${user.uid}/security/malware`);

    for (const pkg of Object.keys(dependencies)) {
      const q = query(malwareRef, where("packageName", "==", pkg));
      const result = await getDocs(q);
      
      if (!result.empty) {
        const data = result.docs[0].data() as MalwareIndex;
        findings.push(`Malicious package detected: ${pkg} (${data.threatType}) - Severity: ${data.severity}`);
      }
    }

    const status = findings.length > 0 ? "blocked" : "clean";
    
    const audit: SupplyChainAudit = {
      id: Math.random().toString(36).substring(2, 15),
      target: targetName,
      timestamp: new Date().toISOString(),
      status,
      findings
    };

    const auditRef = doc(db, `users/${user.uid}/security/audits/supply-chain`, audit.id);
    await setDoc(auditRef, audit);

    return audit;
  }
}

export const supplyChainService = SupplyChainService.getInstance();
