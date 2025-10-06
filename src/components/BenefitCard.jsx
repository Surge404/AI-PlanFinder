import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BenefitCard({ benefit, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="group relative h-full"
    >
      {/* Sophisticated border gradient */}
      <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-purple-500 transition-all duration-700">
        <div className="h-full w-full rounded-[calc(2rem-2px)] bg-white dark:bg-gray-900" />
      </div>

      {/* Main card content */}
      <div className="relative h-full rounded-[2rem] p-8 backdrop-blur-sm overflow-hidden">
        
        {/* Floating orbs background effect */}
        <div className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <motion.div
            className={`w-full h-full rounded-full bg-gradient-to-br ${benefit.color} blur-3xl`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Icon container with modern styling */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="relative"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} p-0.5 shadow-xl`}>
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                <span className="text-3xl">{benefit.icon}</span>
              </div>
            </div>
          </motion.div>

          {/* Coverage indicator - minimal style */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {benefit.coverage}%
            </span>
          </motion.div>
        </div>

        {/* Title with refined typography */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight leading-tight">
          {benefit.title}
        </h3>

        {/* Description with better readability */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
          {benefit.description}
        </p>

        {/* Bottom section - category and action */}
        <div className="flex items-end justify-between mt-auto pt-4">
          
          {/* Category pill with subtle design */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {benefit.category}
            </span>
          </div>

          {/* Elegant CTA button */}
          <motion.button
            onClick={() => onClick(benefit)}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Button gradient overlay on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
            />
            
            <span className="relative z-10">Explore</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Sleek progress indicator at bottom */}
        <div className="mt-6 relative">
          <div className="h-[3px] bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${benefit.color} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${benefit.coverage}%` }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.15 + 0.4,
                ease: "easeOut"
              }}
            >
              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
