/**
 * 🔊 AMBIENT SOUNDER: Natural Text-to-Speech Engine
 * 
 * This tool provides vocalization capabilities to the Viabhron OS,
 * supporting browser-native synthesis and high-quality external providers.
 */

export interface SpeechOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class AmbientSounder {
  private provider: string;
  private synth: SpeechSynthesis | null = null;

  constructor(provider: string = 'browser') {
    this.provider = provider;
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  /**
   * Converts text to speech and plays it.
   */
  async speak(text: string, options: SpeechOptions = {}): Promise<void> {
    if (this.provider === 'browser') {
      return this.speakBrowser(text, options);
    }
    
    console.log(`[AmbientSounder] Generating speech via ${this.provider}: "${text.substring(0, 30)}..."`);
    // External provider logic (ElevenLabs, etc.) would go here
  }

  private speakBrowser(text: string, options: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('SpeechSynthesis not supported in this environment.'));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure utterance
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      if (options.volume) utterance.volume = options.volume;

      // Find voice if specified
      if (options.voice) {
        const voices = this.synth.getVoices();
        const selectedVoice = voices.find(v => v.name === options.voice || v.lang === options.voice);
        if (selectedVoice) utterance.voice = selectedVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      this.synth.speak(utterance);
    });
  }

  /**
   * Returns available voices for the current provider.
   */
  getAvailableVoices(): string[] {
    if (this.provider === 'browser' && this.synth) {
      return this.synth.getVoices().map(v => v.name);
    }
    return ['Default Natural'];
  }

  /**
   * Stops all current speech.
   */
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export default AmbientSounder;
