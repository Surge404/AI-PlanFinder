// import { useState } from 'react';
// import { useRecoilState, useSetRecoilState } from 'recoil';
// import { motion } from 'framer-motion';
// import { Search, Zap, Target, Brain } from 'lucide-react';
// import {
//   userInputState,
//   currentScreenState,
//   isClassifyingState,
//   classificationState,
//   classificationErrorState
// } from '../state/atoms';
// import { classifyText } from '../services/aiService';

// export default function BenefitInput() {
//   const [input, setInput] = useRecoilState(userInputState);
//   const [currentScreen, setCurrentScreen] = useRecoilState(currentScreenState);
//   const setIsClassifying = useSetRecoilState(isClassifyingState);
//   const setClassification = useSetRecoilState(classificationState);
//   const setError = useSetRecoilState(classificationErrorState);
//   const [localInput, setLocalInput] = useState('');
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!localInput.trim()) return;

//     setInput(localInput);
//     setCurrentScreen('processing');
//     setIsClassifying(true);
//     setError(null);

//     try {
//       const category = await classifyText(localInput);
//       setClassification(category);

//       setTimeout(() => {
//         setIsClassifying(false);
//         setCurrentScreen('benefits');
//       }, 1500);
//     } catch (error) {
//       console.error('Classification error:', error);
//       setError('Failed to classify your request. Please try again.');
//       setIsClassifying(false);
//       setCurrentScreen('input');
//     }
//   };

//   const exampleQueries = [
//     "I have tooth pain, what can I do?",
//     "Need help with anxiety and stress",
//     "My vision is getting blurry",
//     "I need a general health checkup"
//   ];

//   const handleExampleClick = (example) => {
//     setLocalInput(example);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-[0.02]">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
//             backgroundSize: '40px 40px',
//           }}
//         />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="relative z-10 w-full max-w-3xl"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="inline-block mb-6 relative"
//           >
//             <div className="relative">
//               <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-xl ring-4 ring-blue-100">
//                 <Brain className="w-10 h-10 text-white" />
//               </div>

//               {/* Rotating border ring */}
//               <motion.div
//                 className="absolute -inset-3 border-[3px] border-gray-300 rounded-3xl"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//               />
//             </div>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight"
//           >
//             Benefits Discovery
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-lg text-gray-600 max-w-xl mx-auto"
//           >
//             Describe your needs and discover personalized benefits tailored for you
//           </motion.p>
//         </div>

//         {/* Input Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <form onSubmit={handleSubmit} className="mb-8">
//             <div className="relative">
//               <motion.div
//                 animate={{
//                   borderColor: isFocused ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
//                 }}
//                 className="relative bg-white rounded-2xl border-2 shadow-lg transition-all"
//               >
//                 <div className="flex items-center gap-4 p-2">
//                   <div className="pl-4">
//                     <Search className="w-5 h-5 text-gray-400" />
//                   </div>

//                   <input
//                     type="text"
//                     value={localInput}
//                     onChange={(e) => setLocalInput(e.target.value)}
//                     onFocus={() => setIsFocused(true)}
//                     onBlur={() => setIsFocused(false)}
//                     placeholder="Describe your health concern..."
//                     className="flex-1 px-2 py-4 text-lg bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
//                     aria-label="Describe your health concern"
//                   />

//                   <motion.button
//                     type="submit"
//                     disabled={!localInput.trim()}
//                     whileHover={{ scale: localInput.trim() ? 1.05 : 1 }}
//                     whileTap={{ scale: localInput.trim() ? 0.95 : 1 }}
//                     className="mr-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-xl"
//                   >
//                     Search
//                   </motion.button>
//                 </div>

//                 <motion.div
//                   className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: isFocused ? 1 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.div>
//             </div>
//           </form>

//           {/* Example Queries */}
//           <div className="mb-12">
//             <p className="text-sm text-gray-500 mb-4 font-medium">Quick examples:</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {exampleQueries.map((example, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => handleExampleClick(example)}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 + index * 0.1 }}
//                   whileHover={{ y: -2, borderColor: 'rgb(209 213 219)' }}
//                   className="group text-left p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
//                       <span className="text-sm">💬</span>
//                     </div>
//                     <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
//                       {example}
//                     </span>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           {/* Features Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="grid grid-cols-3 gap-6"
//           >
//             {[
//               { icon: Brain, text: "AI-Powered", color: "from-purple-500 to-pink-500" },
//               { icon: Zap, text: "Instant Results", color: "from-yellow-500 to-orange-500" },
//               { icon: Target, text: "Personalized", color: "from-green-500 to-emerald-500" }
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.9 + index * 0.1 }}
//                 whileHover={{ y: -3 }}
//                 className="text-center p-6 bg-white rounded-xl border border-gray-200"
//               >
//                 <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} mb-3`}>
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <p className="text-sm font-medium text-gray-700">
//                   {feature.text}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Brand mark */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-12 text-center"
//         >
//           <p className="text-xs text-gray-400 uppercase tracking-wider">
//             Developed and Maintained by Tanmay Jha
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { Search, Zap, Target, Brain } from 'lucide-react';
import {
  userInputState,
  currentScreenState,
  isClassifyingState,
  classificationState,
  classificationErrorState
} from '../state/atoms';
import { classifyText } from '../services/aiService';

export default function BenefitInput() {
  const [input, setInput] = useRecoilState(userInputState);
  const [currentScreen, setCurrentScreen] = useRecoilState(currentScreenState);
  const setIsClassifying = useSetRecoilState(isClassifyingState);
  const setClassification = useSetRecoilState(classificationState);
  const setError = useSetRecoilState(classificationErrorState);
  const [localInput, setLocalInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localInput.trim()) return;

    setInput(localInput);
    setCurrentScreen('processing');
    setIsClassifying(true);
    setError(null);

    try {
      const category = await classifyText(localInput);
      setClassification(category);

      setTimeout(() => {
        setIsClassifying(false);
        setCurrentScreen('benefits');
      }, 1500);
    } catch (error) {
      console.error('Classification error:', error);
      setError('Failed to classify your request. Please try again.');
      setIsClassifying(false);
      setCurrentScreen('input');
    }
  };

  const exampleQueries = [
    "I have tooth pain, what can I do?",
    "Need help with anxiety and stress",
    "My vision is getting blurry",
    "I need a general health checkup"
  ];

  const handleExampleClick = (example) => {
    setLocalInput(example);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-200">
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Soft gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-300/30 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              {/* Enlarged rotating brain */}
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <motion.div
                className="absolute -inset-4 border-4 border-gray-300 rounded-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Benefits Discovery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 max-w-xl mx-auto"
          >
            Describe your needs and discover personalized benefits tailored for you
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <motion.div
                animate={{
                  borderColor: isFocused 
                    ? 'rgb(59 130 246)' 
                    : 'rgb(229 231 235)'
                }}
                className="relative bg-white rounded-2xl border-2 shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 p-2">
                  <div className="pl-4">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <input
                    type="text"
                    value={localInput}
                    onChange={(e) => setLocalInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Describe your health concern..."
                    className="flex-1 px-2 py-4 text-lg bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  />

                  <motion.button
                    type="submit"
                    disabled={!localInput.trim()}
                    whileHover={{ scale: localInput.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: localInput.trim() ? 0.95 : 1 }}
                    className="mr-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-xl"
                  >
                    Search
                  </motion.button>
                </div>

                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isFocused ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </form>

          {/* Example Queries */}
          <div className="mb-12">
            <p className="text-sm text-gray-500 mb-4 font-medium">
              Quick examples:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleQueries.map((example, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -2, borderColor: 'rgb(209 213 219)' }}
                  className="group text-left p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <span className="text-sm">💬</span>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {example}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { icon: Brain, text: "AI-Powered", color: "from-purple-500 to-pink-500" },
              { icon: Zap, text: "Instant Results", color: "from-yellow-500 to-orange-500" },
              { icon: Target, text: "Personalized", color: "from-green-500 to-emerald-500" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -3 }}
                className="text-center p-6 bg-white rounded-xl border border-gray-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} mb-3`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Developed and Maintained by Tanmay Jha
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
