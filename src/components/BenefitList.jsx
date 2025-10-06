import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ArrowLeft, RefreshCw, CheckCircle, Filter } from 'lucide-react';
import {
  filteredBenefitsSelector,
  selectedBenefitState,
  currentScreenState,
  classificationState,
  userInputState
} from '../state/atoms';
import BenefitCard from './BenefitCard';

export default function BenefitList() {
  const benefits = useRecoilValue(filteredBenefitsSelector);
  const classification = useRecoilValue(classificationState);
  const userInput = useRecoilValue(userInputState);
  const setSelectedBenefit = useSetRecoilState(selectedBenefitState);
  const setCurrentScreen = useSetRecoilState(currentScreenState);

  const handleBenefitClick = (benefit) => {
    setSelectedBenefit(benefit);
    setCurrentScreen('details');
  };

  const handleBack = () => {
    setCurrentScreen('input');
  };

  const handleRegenerate = () => {
    setCurrentScreen('processing');
    setTimeout(() => {
      setCurrentScreen('benefits');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">New Search</span>
          </motion.button>

          <motion.button
            onClick={handleRegenerate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium text-sm hover:shadow-lg transition-all group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Results
          </motion.button>
        </motion.div>

        {/* Query Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between gap-6">
                {/* Left side - Query */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 font-semibold">
                      Active Search
                    </span>
                  </div>
                  <p className="text-2xl text-gray-900 dark:text-white font-medium leading-relaxed mb-4">
                    "{userInput}"
                  </p>

                  {/* Classification badge */}
                  {classification && classification !== 'UNRECOGNIZED' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {classification}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Right side - Results count */}
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex flex-col items-end p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">
                      {benefits.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {benefits.length === 1 ? 'Match' : 'Matches'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Your Benefits
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select a benefit to view detailed action steps
              </p>
            </div>

            {/* Optional: Filter indicator */}
            {benefits.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <Filter className="w-4 h-4" />
                <span>Sorted by relevance</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Benefits Grid or Empty State */}
        {benefits.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onClick={handleBenefitClick}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-24 px-4"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Benefits Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
              We couldn't find any benefits matching your query. Try refining your search or use different keywords.
            </p>

            <div className="flex gap-3">
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                New Search
              </motion.button>

              <motion.button
                onClick={handleRegenerate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Retry Search
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Bottom Helper Text */}
        {benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">
                Click any card to generate a personalized action plan
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
