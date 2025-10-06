import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ArrowLeft,
  RefreshCw,
  Circle,
  Clock,
  FileText,
  Loader2,
  TrendingUp,
  ChevronDown,
  Info
} from 'lucide-react';
import {
  selectedBenefitState,
  actionPlanState,
  currentScreenState,
  userInputState,
  isGeneratingPlanState,
  actionPlanErrorState
} from '../state/atoms';
import { generateActionPlan } from '../services/aiService';

export default function BenefitDetails() {
  const [selectedBenefit, setSelectedBenefit] = useRecoilState(selectedBenefitState);
  const [actionPlan, setActionPlan] = useRecoilState(actionPlanState);
  const [isGenerating, setIsGenerating] = useRecoilState(isGeneratingPlanState);
  const [error, setError] = useRecoilState(actionPlanErrorState);
  const userInput = useRecoilValue(userInputState);
  const setCurrentScreen = useSetRecoilState(currentScreenState);
  const [expandedStep, setExpandedStep] = useState(null);

  useEffect(() => {
    if (selectedBenefit && !actionPlan) {
      generatePlan();
    }
  }, [selectedBenefit]);

  const generatePlan = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const plan = await generateActionPlan(selectedBenefit, userInput);
      setActionPlan(plan);
    } catch (err) {
      console.error('Failed to generate action plan:', err);
      setError('Failed to generate action plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setCurrentScreen('benefits');
    setActionPlan(null);
  };

  const handleRegenerate = () => {
    setActionPlan(null);
    generatePlan();
  };

  if (!selectedBenefit) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-12"
        >
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </motion.button>

          {actionPlan && (
            <motion.button
              onClick={handleRegenerate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50 group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Regenerate
            </motion.button>
          )}
        </motion.div>

        {/* Hero Section - Magazine Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl">{selectedBenefit.icon}</span>
                <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-semibold">
                  {selectedBenefit.category}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                {selectedBenefit.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {selectedBenefit.description}
              </p>

              {/* User Query Section */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
                <div className="pl-6">
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2 uppercase tracking-wide font-medium">
                    Your Query
                  </p>
                  <p className="text-lg text-gray-800 dark:text-gray-200 italic">
                    "{userInput}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="sticky top-8"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800">
                  <div className="text-center mb-6">
                    <motion.div
                      className={`inline-block w-32 h-32 rounded-full bg-gradient-to-br ${selectedBenefit.color} p-1 mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 dark:text-white">
                            {selectedBenefit.coverage}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            percent
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                      Coverage Rate
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-gray-800 my-6" />

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Personalized action plan generated</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Action Plan Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Action Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Follow these steps to maximize your benefits
            </p>
          </div>

          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </motion.div>
              <p className="text-gray-500 dark:text-gray-500 mt-6">
                Crafting your personalized plan...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-900 border-2 border-red-300 dark:border-red-800 rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Info className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-600 dark:text-red-400 text-lg mb-6">{error}</p>
              <motion.button
                onClick={handleRegenerate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Retry
              </motion.button>
            </motion.div>
          ) : actionPlan ? (
            <div className="space-y-4">
              {/* Steps - Clean List Design */}
              {actionPlan.steps?.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                >
                  <button
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start gap-5">
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedBenefit.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">
                            {step.step}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{step.estimatedTime}</span>
                          </div>

                          {step.requiredDocs && step.requiredDocs.length > 0 && (
                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500">
                              <FileText className="w-4 h-4" />
                              <span>{step.requiredDocs.length} document{step.requiredDocs.length > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <motion.div
                        animate={{ rotate: expandedStep === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable Documents Section */}
                  <AnimatePresence>
                    {expandedStep === index && step.requiredDocs && step.requiredDocs.length > 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 font-semibold mb-3">
                            Required Documents
                          </p>
                          <div className="grid gap-2">
                            {step.requiredDocs.map((doc, docIndex) => (
                              <motion.div
                                key={docIndex}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: docIndex * 0.03 }}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                              >
                                <Circle className="w-1.5 h-1.5 fill-current text-gray-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {doc}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Additional Notes */}
              {actionPlan.notes && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 text-2xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Important Note
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {actionPlan.notes}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
