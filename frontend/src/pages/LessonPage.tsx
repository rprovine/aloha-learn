import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { getLessonContent } from '../data/lessonContent';
import { curriculum } from '../data/curriculum';
import { HawaiianPronunciation, HawaiianPronunciationGuide } from '../components/HawaiianPronunciation';
import { getPhoneticPronunciation, getPronunciationTips } from '../services/pronunciation';

const LessonPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonScore, setLessonScore] = useState(0);

  const lessonId = parseInt(id || '1');
  const lessonContent = getLessonContent(lessonId);
  const lessonInfo = curriculum.find(lesson => lesson.id === lessonId);

  useEffect(() => {
    // Reset state when lesson changes
    setCurrentSlide(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setLessonScore(0);
    
    // Scroll to top when lesson changes
    window.scrollTo(0, 0);
  }, [id]); // Use id directly from params

  if (!lessonContent || !lessonInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="card text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
            <p className="text-gray-600 mb-6">This lesson content is coming soon!</p>
            <button
              onClick={() => navigate('/learn')}
              className="btn-primary"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const slide = lessonContent.slides[currentSlide];
    // Auto-advance after 2 seconds if correct
    if (slide.type === 'practice' && index === slide.correctAnswer) {
      setLessonScore(lessonScore + 25); // Add points for correct answer
      setTimeout(() => {
        nextSlide();
      }, 2000);
    }
  };

  const nextSlide = () => {
    if (currentSlide < lessonContent.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };


  const slide = lessonContent.slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/learn')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Lessons
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">{lessonInfo.title}</h1>
              {lessonInfo.titleHawaiian && (
                <p className="text-sm text-gray-600">{lessonInfo.titleHawaiian}</p>
              )}
            </div>
            <span className="text-sm text-gray-600">
              {currentSlide + 1} / {lessonContent.slides.length}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-ocean h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / lessonContent.slides.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Slide Content */}
        <motion.div
          key={`${lessonId}-${currentSlide}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card min-h-[400px] flex flex-col"
        >
          {slide.type === 'intro' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">{slide.image}</div>
              <h1 className="text-3xl font-display font-bold mb-4">{slide.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{slide.content}</p>
              {lessonId === 1 && currentSlide === 0 && (
                <HawaiianPronunciationGuide />
              )}
            </div>
          )}

          {slide.type === 'vocabulary' && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-bold text-ocean mb-2">
                  {slide.word}
                </h2>
                {slide.translation && (
                  <p className="text-xl text-gray-600 mb-4">{slide.translation}</p>
                )}
                <HawaiianPronunciation 
                  text={slide.word || ''} 
                  phonetic={slide.pronunciation}
                  showInfo={true}
                />
              </div>

              <div className="space-y-4">
                {slide.pronunciation && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Pronunciation Guide:</p>
                    <p className="text-gray-700 mb-2">{slide.pronunciation}</p>
                    {slide.word && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Phonetic: {getPhoneticPronunciation(slide.word)}
                        </p>
                        {getPronunciationTips(slide.word).map((tip, idx) => (
                          <p key={idx} className="text-xs text-ocean flex items-start gap-1">
                            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {slide.example && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-1">Example:</p>
                    <p className="text-gray-700">{slide.example}</p>
                    {slide.exampleTranslation && (
                      <p className="text-sm text-gray-600 mt-1">{slide.exampleTranslation}</p>
                    )}
                  </div>
                )}

                {slide.culturalNote && (
                  <div className="bg-ocean-light/20 p-4 rounded-lg border border-ocean/20">
                    <p className="font-semibold mb-1 text-ocean">Cultural Note:</p>
                    <p className="text-gray-700">{slide.culturalNote}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {slide.type === 'grammar' && (
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-ocean">
                {slide.grammarPoint}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700">{slide.explanation}</p>
              </div>
              {slide.examples && slide.examples.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold mb-2">Examples:</h3>
                  {slide.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                      <span className="font-medium text-ocean">{example.hawaiian}</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-gray-700">{example.english}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {slide.type === 'culture' && (
            <div className="py-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-ocean">{slide.title}</h2>
              <div className="bg-gradient-to-r from-ocean-light/20 to-tropical-light/20 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">{slide.content}</p>
                {slide.culturalNote && (
                  <p className="text-sm text-ocean font-medium italic">
                    💡 {slide.culturalNote}
                  </p>
                )}
              </div>
            </div>
          )}

          {slide.type === 'practice' && slide.options && (
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-6 text-center">{slide.question}</h2>
              <div className="grid grid-cols-2 gap-4">
                {slide.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      showFeedback && index === slide.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && index === selectedAnswer && index !== slide.correctAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-ocean hover:bg-ocean-light/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{option}</span>
                      {showFeedback && index === slide.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showFeedback && index === selectedAnswer && index !== slide.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'complete' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-display font-bold mb-4">{slide.message}</h2>
              <div className="mb-8">
                <p className="text-lg text-gray-600 mb-2">
                  Lesson Score: {lessonScore + (slide.points || 0)} points
                </p>
                <p className="text-sm text-gray-500">
                  Total available: {lessonInfo.points} points
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/learn')}
                  className="btn-secondary"
                >
                  Back to Lessons
                </button>
                {lessonId < 30 && (
                  <button
                    onClick={() => navigate(`/lesson/${lessonId + 1}`)}
                    className="btn-primary"
                  >
                    Next Lesson →
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        {slide.type !== 'complete' && (
          <div className="flex justify-between mt-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentSlide === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={nextSlide}
              disabled={slide.type === 'practice' && !showFeedback}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                slide.type === 'practice' && !showFeedback
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-ocean text-white hover:bg-ocean-dark'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;