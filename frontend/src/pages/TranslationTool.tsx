import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ArrowLeftRight, 
  Volume2, 
  Copy, 
  Star,
  Info,
  Loader2,
  CheckCircle,
  X
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface TranslationRequest {
  text: string;
  source_language: 'en' | 'haw';
  target_language: 'en' | 'haw';
  include_cultural_context?: boolean;
}

interface WordBreakdown {
  hawaiian: string;
  english: string;
  part_of_speech?: string;
}

interface TranslationResponse {
  translation: string;
  word_breakdown?: WordBreakdown[];
  cultural_context?: string;
  alternatives?: string[];
  pronunciation_guide?: string;
  literal_meaning?: string;
  contextual_meaning?: string;
  dictionary_matches?: any[];
}

const TranslationTool: React.FC = () => {
  const { user } = useAuth();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<'en' | 'haw'>('en');
  const [targetLang, setTargetLang] = useState<'en' | 'haw'>('haw');
  const [isLoading, setIsLoading] = useState(false);
  const [translationData, setTranslationData] = useState<TranslationResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Auto-translate after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceText.trim()) {
        handleTranslate();
      } else {
        setTranslatedText('');
        setTranslationData(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [sourceText, sourceLang, targetLang]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const request: TranslationRequest = {
        text: sourceText,
        source_language: sourceLang,
        target_language: targetLang,
        include_cultural_context: true
      };

      const response = await api.post('/translation/translate', request);
      setTranslationData(response.data);
      setTranslatedText(response.data.translation);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Translation failed. Please try again.');
      setTranslatedText('');
      setTranslationData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (text: string, lang: 'en' | 'haw') => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (lang === 'haw') {
      // Try to find a Hawaiian voice
      const voices = speechSynthesis.getVoices();
      const hawaiianVoice = voices.find(voice => 
        voice.lang.includes('haw') || 
        voice.lang.includes('HAW') ||
        voice.name.toLowerCase().includes('hawaiian')
      );
      
      if (hawaiianVoice) {
        utterance.voice = hawaiianVoice;
      } else {
        // Adjust speech parameters for better Hawaiian approximation
        utterance.rate = 0.7; // Slower for clearer vowel sounds
        utterance.pitch = 1.1; // Slightly higher pitch for melodic quality
      }
      utterance.lang = 'haw';
    } else {
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
    }
    
    speechSynthesis.speak(utterance);
  };

  const clearText = () => {
    setSourceText('');
    setTranslatedText('');
    setTranslationData(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2 text-gradient">
            Hawaiian Translation Tool
          </h1>
          <p className="text-gray-600">
            Translate between Hawaiian and English with cultural context
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Source Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-ocean" />
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value as 'en' | 'haw')}
                  className="font-semibold bg-transparent focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="haw">Hawaiian</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearText}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={!sourceText}
                  title="Clear text"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => speakText(sourceText, sourceLang)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={!sourceText}
                  title="Speak text"
                >
                  <Volume2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={sourceLang === 'en' ? "Enter English text..." : "E komo i ka ʻōlelo Hawaiʻi..."}
              className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
            />
          </motion.div>

          {/* Swap Button */}
          <div className="hidden lg:flex items-center justify-center -mx-12 z-10">
            <button
              onClick={swapLanguages}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ArrowLeftRight className="w-6 h-6 text-ocean" />
            </button>
          </div>

          {/* Translated Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-sunset" />
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value as 'en' | 'haw')}
                  className="font-semibold bg-transparent focus:outline-none"
                >
                  <option value="haw">Hawaiian</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(translatedText, targetLang)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={!translatedText}
                >
                  <Volume2 className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={!translatedText}
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="w-full h-40 p-4 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-ocean animate-spin" />
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <div className="text-gray-900">{translatedText || "Translation will appear here..."}</div>
              )}
            </div>
          </motion.div>

          {/* Mobile Swap Button */}
          <div className="lg:hidden flex justify-center -my-3">
            <button
              onClick={swapLanguages}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowLeftRight className="w-6 h-6 text-ocean" />
            </button>
          </div>
        </div>

        {/* Cultural Context and Details */}
        {translationData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Word Breakdown */}
            {translationData.word_breakdown && translationData.word_breakdown.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-ocean" />
                  Word Breakdown
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {translationData.word_breakdown.map((word, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-semibold text-ocean">{word.hawaiian}</div>
                      <div className="text-sm text-gray-600">{word.english}</div>
                      {word.part_of_speech && (
                        <div className="text-xs text-gray-500 mt-1">{word.part_of_speech}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural Context */}
            {translationData.cultural_context && (
              <div className="card bg-ocean-light/10 border-ocean/20">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-ocean" />
                  Cultural Context
                </h3>
                <p className="text-gray-700">{translationData.cultural_context}</p>
              </div>
            )}

            {/* Alternative Translations */}
            {translationData.alternatives && translationData.alternatives.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-lg mb-3">Alternative Translations</h3>
                <div className="flex flex-wrap gap-2">
                  {translationData.alternatives.map((alt, index) => (
                    <button
                      key={index}
                      onClick={() => setTranslatedText(alt)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pronunciation Guide */}
            {translationData.pronunciation_guide && (
              <div className="card">
                <h3 className="font-bold text-lg mb-2">Pronunciation Guide</h3>
                <p className="text-gray-700">{translationData.pronunciation_guide}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Sign up prompt for non-users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              <a href="/register" className="text-ocean hover:underline font-semibold">
                Sign up
              </a>
              {" to save your translations and track your learning progress"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TranslationTool;