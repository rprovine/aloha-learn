import React, { useEffect, useState } from 'react';
import { Volume2, Info, Loader2 } from 'lucide-react';
import api from '../services/api';

interface HawaiianPronunciationProps {
  text: string;
  phonetic?: string;
  showInfo?: boolean;
}

export const HawaiianPronunciation: React.FC<HawaiianPronunciationProps> = ({ 
  text, 
  phonetic,
  showInfo = false 
}) => {
  const [hasHawaiianVoice, setHasHawaiianVoice] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNativeAudio, setHasNativeAudio] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Check if Hawaiian voice is available
      const hawaiianVoice = availableVoices.find(voice => 
        voice.lang.includes('haw') || 
        voice.lang.includes('HAW') ||
        voice.name.toLowerCase().includes('hawaiian')
      );
      
      setHasHawaiianVoice(!!hawaiianVoice);
    };

    // Load voices when they become available
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Check for native audio when component mounts or text changes
  useEffect(() => {
    const checkForNativeAudio = async () => {
      if (!text) return;
      
      setIsLoading(true);
      try {
        const response = await api.get(`/pronunciation/word/${text.toLowerCase()}`);
        if (response.data.audio_url) {
          setAudioUrl(response.data.audio_url);
          setHasNativeAudio(true);
        } else {
          setAudioUrl(null);
          setHasNativeAudio(false);
        }
      } catch (error) {
        setAudioUrl(null);
        setHasNativeAudio(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkForNativeAudio();
  }, [text]);

  const speakHawaiian = async () => {
    // If we have native audio, play that first
    if (audioUrl && hasNativeAudio) {
      try {
        const audio = new Audio(audioUrl);
        audio.play();
        return;
      } catch (error) {
        console.error('Failed to play native audio:', error);
        // Fall back to speech synthesis
      }
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find best available voice
    const hawaiianVoice = voices.find(voice => 
      voice.lang.includes('haw') || 
      voice.lang.includes('HAW') ||
      voice.name.toLowerCase().includes('hawaiian')
    );
    
    const polynesianVoice = voices.find(voice => 
      voice.lang.includes('mi') || // Māori
      voice.lang.includes('sm') || // Samoan  
      voice.lang.includes('to')    // Tongan
    );
    
    if (hawaiianVoice) {
      utterance.voice = hawaiianVoice;
      utterance.rate = 0.9;
    } else if (polynesianVoice) {
      utterance.voice = polynesianVoice;
      utterance.rate = 0.8;
    } else {
      // Use best approximation with standard voices
      // Female voices often work better for Hawaiian
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Adjust parameters for Hawaiian characteristics
      utterance.rate = 0.65; // Much slower for clear vowels
      utterance.pitch = 1.2; // Higher pitch for melodic quality
      utterance.volume = 1.0;
      
      // Add slight pauses between words for clarity
      const pausedText = text.replace(/\s+/g, ' ... ');
      utterance.text = pausedText;
    }
    
    speechSynthesis.speak(utterance);
  };

  const getButtonTitle = () => {
    if (isLoading) return 'Loading pronunciation...';
    if (hasNativeAudio) return 'Play native speaker pronunciation';
    if (hasHawaiianVoice) return 'Play with Hawaiian voice';
    return 'Play approximated pronunciation';
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={speakHawaiian}
        disabled={isLoading}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative disabled:opacity-50"
        title={getButtonTitle()}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-ocean animate-spin" />
        ) : (
          <Volume2 className={`w-5 h-5 ${hasNativeAudio ? 'text-tropical' : 'text-ocean'} group-hover:text-ocean-dark`} />
        )}
        {showInfo && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {hasNativeAudio ? '🎵 Native speaker audio' : !hasHawaiianVoice ? '🔊 Approximated pronunciation' : '🗣️ Hawaiian voice'}
          </div>
        )}
      </button>
      
      {phonetic && (
        <span className="text-sm text-gray-600 italic">
          {phonetic}
        </span>
      )}
      
      {showInfo && !hasNativeAudio && !hasHawaiianVoice && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Info className="w-3 h-3" />
          <span>Native audio will be added as recordings become available</span>
        </div>
      )}
    </div>
  );
};

// Hawaiian pronunciation rules component
export const HawaiianPronunciationGuide: React.FC = () => {
  return (
    <div className="bg-ocean-light/10 p-4 rounded-lg">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <Info className="w-5 h-5 text-ocean" />
        Hawaiian Pronunciation Tips
      </h3>
      <ul className="text-sm space-y-1 text-gray-700">
        <li>• Each vowel is pronounced separately: a-lo-ha, not "aloha"</li>
        <li>• Stress usually falls on the second-to-last syllable</li>
        <li>• The ʻokina (ʻ) is a glottal stop - a brief pause</li>
        <li>• W sounds like "v" after i and e, like "w" after a, o, u</li>
        <li>• Vowels with kahakō (macron) are held longer: ā, ē, ī, ō, ū</li>
      </ul>
    </div>
  );
};