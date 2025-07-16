import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Globe, 
  Users, 
  Sparkles, 
  ChevronRight,
  Mic,
  Trophy,
  Heart
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
        <div className="absolute inset-0 hawaiian-pattern opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
              Aloha Learn
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-ocean-light">
              E aʻo i ka ʻōlelo Hawaiʻi - Learn the Hawaiian Language
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Preserve and celebrate Hawaiian culture through interactive language learning, 
              AI-powered translations, and cultural stories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/translate" className="btn-primary inline-flex items-center">
                Quick Translation
                <Globe className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/learn" className="bg-white text-ocean px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100 hover:scale-105 inline-flex items-center">
                Start Learning
                <BookOpen className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 lg:h-32">
            <path 
              fill="#ffffff" 
              d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-gradient">
              Learn Hawaiian Your Way
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a complete beginner or looking to deepen your knowledge, 
              we have the tools to help you succeed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Translation Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card group hover:bg-ocean hover:text-white"
            >
              <Globe className="w-12 h-12 text-ocean group-hover:text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Translation</h3>
              <p className="text-gray-600 group-hover:text-ocean-light">
                AI-powered Hawaiian-English translation with cultural context and explanations.
              </p>
            </motion.div>

            {/* Lessons Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card group hover:bg-tropical hover:text-white"
            >
              <BookOpen className="w-12 h-12 text-tropical group-hover:text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Structured Lessons</h3>
              <p className="text-gray-600 group-hover:text-tropical-light">
                Progressive curriculum from basic greetings to advanced conversation skills.
              </p>
            </motion.div>

            {/* Pronunciation Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card group hover:bg-sunset hover:text-white"
            >
              <Mic className="w-12 h-12 text-sunset group-hover:text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Pronunciation Practice</h3>
              <p className="text-gray-600 group-hover:text-sunset-light">
                Interactive audio lessons with speech recognition for perfect pronunciation.
              </p>
            </motion.div>

            {/* Cultural Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card group hover:bg-hawaiian-purple hover:text-white"
            >
              <Heart className="w-12 h-12 text-hawaiian-purple group-hover:text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Cultural Stories</h3>
              <p className="text-gray-600 group-hover:text-purple-200">
                Learn through moʻolelo (stories) that connect language to Hawaiian culture.
              </p>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card group hover:bg-sand-warm hover:text-gray-900"
            >
              <Trophy className="w-12 h-12 text-sand-warm group-hover:text-gray-900 mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600 group-hover:text-gray-700">
                Earn achievements, maintain streaks, and visualize your learning journey.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card group hover:bg-hawaiian-pink hover:text-white"
            >
              <Users className="w-12 h-12 text-hawaiian-pink group-hover:text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600 group-hover:text-pink-100">
                Connect with fellow learners and native speakers in our supportive community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our structured path from beginner to fluent speaker
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Beginner Level */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center mb-8"
            >
              <div className="bg-ocean text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold mb-1">Beginner - Hoʻomaka</h3>
                <p className="text-gray-600">Master the basics: alphabet, greetings, numbers, and essential phrases</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            {/* Intermediate Level */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center mb-8"
            >
              <div className="bg-tropical text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold mb-1">Intermediate - Waena</h3>
                <p className="text-gray-600">Build conversations: grammar, daily vocabulary, and cultural expressions</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            {/* Advanced Level */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <div className="bg-sunset text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold mb-1">Advanced - Kiʻekiʻe</h3>
                <p className="text-gray-600">Achieve fluency: complex grammar, cultural concepts, and authentic communication</p>
              </div>
              <Sparkles className="w-6 h-6 text-sunset" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-hawaiian-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Start Your Hawaiian Language Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners preserving and celebrating Hawaiian culture
            </p>
            <Link to="/register" className="bg-white text-ocean px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 inline-flex items-center">
              Sign Up Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="text-white/80 mt-4">
              No credit card required • Free forever plan available
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;