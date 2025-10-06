import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { userInputState } from '../state/atoms';

export default function ProcessingScreen() {
  const userInput = useRecoilValue(userInputState);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      
      {/* Subtle ambient background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        
        {/* Minimal loader animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="70 200"
                  strokeLinecap="round"
                  className="text-gray-300 dark:text-gray-700"
                />
              </svg>
            </motion.div>

            {/* Inner ring */}
            <motion.div
              className="absolute inset-4"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="50 200"
                  strokeLinecap="round"
                  className="text-gray-900 dark:text-white"
                />
              </svg>
            </motion.div>

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Analyzing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Finding the best benefits for your needs
          </p>
        </motion.div>

        {/* User query card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 text-left">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 font-semibold mb-2">
                Your Query
              </p>
              <p className="text-xl text-gray-900 dark:text-white font-medium leading-relaxed">
                "{userInput}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Processing stages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-8"
        >
          {[
            { label: 'Understanding', delay: 0 },
            { label: 'Matching', delay: 0.5 },
            { label: 'Ranking', delay: 1 }
          ].map((stage, index) => (
            <div key={stage.label} className="flex flex-col items-center gap-3">
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.15 }}
              >
                <motion.div
                  className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: stage.delay
                  }}
                />
                <motion.div
                  className="absolute inset-0 -m-1"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: stage.delay
                  }}
                >
                  <div className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full" />
                </motion.div>
              </motion.div>

              <motion.span
                className="text-sm text-gray-600 dark:text-gray-400 font-medium"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.15 }}
              >
                {stage.label}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-md mx-auto"
        >
          <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-900 dark:bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        {/* Subtle hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-500"
        >
          This usually takes a few seconds
        </motion.p>
      </div>
    </div>
  );
}
