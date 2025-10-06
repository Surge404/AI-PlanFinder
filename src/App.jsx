import { useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Circle, Hexagon, Triangle, Star, Zap, Activity } from 'lucide-react';
import { currentScreenState } from './state/atoms';
import BenefitInput from './components/BenefitInput';
import ProcessingScreen from './components/ProcessingScreen';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useRecoilState(currentScreenState);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ultra-animated gradient background - never stops */}
      <motion.div
        className="fixed inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 15%, #f093fb 30%, #4facfe 45%, #00f2fe 60%, #43e97b 75%, #667eea 90%, #764ba2 100%)',
          backgroundSize: '600% 600%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary moving gradient layer */}
      <motion.div
        className="fixed inset-0 -z-19 opacity-50"
        style={{
          background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #FF6B6B 100%)',
          backgroundSize: '400% 400%'
        }}
        animate={{
          backgroundPosition: ['100% 100%', '0% 0%', '100% 100%']
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Massive rotating gradient orbs - perpetual motion */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
          top: '-10%',
          left: '-10%'
        }}
        animate={{
          x: [0, 150, -100, 200, 0],
          y: [0, 100, 200, -50, 0],
          scale: [1, 1.3, 0.9, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, #4facfe 0%, #00f2fe 100%)',
          bottom: '-10%',
          right: '-10%'
        }}
        animate={{
          x: [0, -120, 180, -150, 0],
          y: [0, -150, 100, -200, 0],
          scale: [1, 1.4, 0.8, 1.3, 1],
          rotate: [0, -360]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="fixed w-[450px] h-[450px] rounded-full blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, #f093fb 0%, #f5576c 100%)',
          top: '30%',
          right: '10%'
        }}
        animate={{
          x: [0, 100, -150, 120, 0],
          y: [0, -120, 150, -100, 0],
          scale: [1, 1.25, 0.85, 1.35, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="fixed w-[550px] h-[550px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, #43e97b 0%, #38f9d7 100%)',
          bottom: '20%',
          left: '15%'
        }}
        animate={{
          x: [0, -180, 130, -90, 0],
          y: [0, 140, -180, 120, 0],
          scale: [1, 0.9, 1.4, 0.95, 1],
          rotate: [0, -360]
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Infinite neural network-style connecting lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="fixed h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          style={{
            width: '200%',
            top: `${i * 12}%`,
            left: '-50%',
            transformOrigin: 'center'
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.3, 0],
            scaleX: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3
          }}
        />
      ))}

      {/* Perpetually moving particles - like neurons */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`neuron-${i}`}
          className="fixed"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [
              0, 
              Math.random() * 200 - 100, 
              Math.random() * 300 - 150,
              Math.random() * 200 - 100,
              0
            ],
            y: [
              0, 
              Math.random() * 200 - 100,
              Math.random() * 300 - 150, 
              Math.random() * 200 - 100,
              0
            ],
            rotate: [0, 360, 720, 1080],
            opacity: [0.2, 0.8, 0.4, 0.9, 0.2],
            scale: [0.5, 1.2, 0.7, 1.5, 0.5]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          {i % 6 === 0 ? (
            <Circle className="w-3 h-3 text-white/60" fill="currentColor" />
          ) : i % 6 === 1 ? (
            <Hexagon className="w-4 h-4 text-purple-300/50" fill="currentColor" />
          ) : i % 6 === 2 ? (
            <Triangle className="w-3 h-3 text-blue-300/50" fill="currentColor" />
          ) : i % 6 === 3 ? (
            <Star className="w-4 h-4 text-pink-300/50" fill="currentColor" />
          ) : i % 6 === 4 ? (
            <Zap className="w-3 h-3 text-cyan-300/50" />
          ) : (
            <div className="w-2 h-2 bg-white/40 rounded-full" />
          )}
        </motion.div>
      ))}

      {/* Continuously rotating sparkle constellations */}
      <motion.div
        className="fixed inset-0 opacity-40"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`constellation-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${10 + (i * 11) % 80}%`,
            }}
            animate={{
              scale: [1, 1.5, 0.8, 1.3, 1],
              opacity: [0.3, 0.8, 0.4, 0.9, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          >
            <Sparkles className="w-8 h-8 text-white/60" />
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite pulsing circles - never stop */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="fixed rounded-full border-2 border-white/20"
          style={{
            width: `${200 + i * 80}px`,
            height: `${200 + i * 80}px`,
            top: `${20 + i * 10}%`,
            left: `${15 + i * 12}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}

      {/* Continuously scanning waves */}
      <motion.div
        className="fixed inset-0 opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 52px)'
        }}
        animate={{
          y: ['-100px', '0px']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="fixed inset-0 opacity-15"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 52px)'
        }}
        animate={{
          x: ['0px', '100px']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Energy wave sweeps - perpetual motion */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="fixed h-32 opacity-20"
          style={{
            width: '300%',
            left: '-100%',
            top: `${i * 33}%`,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.3 + i * 0.1}), transparent)`
          }}
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
        />
      ))}

      {/* Infinite rotating activity indicators */}
      <motion.div
        className="fixed top-1/4 right-1/4"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Activity className="w-24 h-24 text-white/40" />
      </motion.div>

      <motion.div
        className="fixed bottom-1/3 left-1/3"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Activity className="w-20 h-20 text-purple-300/40" />
      </motion.div>

      {/* Morphing blob shapes - continuous transformation */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="fixed rounded-full blur-2xl"
          style={{
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${
              i % 4 === 0 ? '#ff6b6b' : 
              i % 4 === 1 ? '#4ecdc4' : 
              i % 4 === 2 ? '#45b7d1' : 
              '#ffa07a'
            } 0%, transparent 70%)`,
            left: `${i * 25}%`,
            top: `${(i * 20) % 80}%`,
            opacity: 0.2
          }}
          animate={{
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '70% 30% 30% 70% / 70% 70% 30% 30%',
              '50% 50% 50% 50% / 50% 50% 50% 50%',
              '30% 70% 70% 30% / 30% 30% 70% 70%'
            ],
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Infinite diagonal streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="fixed w-1 h-40 bg-gradient-to-b from-transparent via-white to-transparent opacity-20"
          style={{
            left: `${i * 16}%`,
            top: '-20%',
            transformOrigin: 'center'
          }}
          animate={{
            y: ['-100vh', '120vh'],
            opacity: [0, 0.4, 0],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.7
          }}
        />
      ))}

      {/* Screen routing with smooth transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <BenefitInput />
          </motion.div>
        )}

        {currentScreen === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProcessingScreen />
          </motion.div>
        )}

        {currentScreen === 'benefits' && (
          <motion.div
            key="benefits"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <BenefitList />
          </motion.div>
        )}

        {currentScreen === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <BenefitDetails />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;
