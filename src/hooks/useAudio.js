import { useCallback } from 'react';

/**
 * Hook to play a ding sound using Web Audio API
 * Creates a simple sine wave ding sound dynamically
 */
export const useAudio = () => {
  const playDing = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for the main tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set the frequency for a pleasant ding (around musical note E5)
      oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
      
      // Create an envelope for the sound
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      // Start and stop the oscillator
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play ding sound:', error);
    }
  }, []);

  return { playDing };
};
