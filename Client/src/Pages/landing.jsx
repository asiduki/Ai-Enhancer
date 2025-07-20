import React, { useState } from 'react'   
import { NavLink ,useNavigate} from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion';

const landing = () => {
    const navigate = useNavigate();
    const GrammarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m18 16-4-4 4-4"/><path d="m6 8-4 4 4 4"/><path d="m14 4-4 16"/></svg>
    );
    const StyleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M2 12h20"/><path d="M12 2v20"/></svg>
    );
    const SpellingIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 20V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8"/></svg>
    );
    const ClarityIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    );
    const featureCards = [
        { icon: <GrammarIcon />, title: "Grammar Correction", description: "Catch and correct all types of grammatical errors with precision." },
        { icon: <StyleIcon />, title: "Style Enhancement", description: "Improve readability, conciseness, and overall flow of your text." },
        { icon: <SpellingIcon />, title: "Spelling Accuracy", description: "Eliminate typos and ensure flawless spelling in every document." },
        { icon: <ClarityIcon />, title: "Clarity Suggestions", description: "Get suggestions to make your sentences clearer and more impactful." },
      ];
    
  return (
    <div>
     <div className="bg-white text-gray-800 font-sans">
      <header className="py-4 px-8 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold">Text Enhancer</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Elevate Your Writing with AI</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly correct grammar, refine style, and enhance clarity for impactful communication. Your personal writing assistant.
          </p>
          <motion.button
          onClick={() => {
            navigate("/home");
          }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-blue-500 cursor-pointer text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all"
          >
            Try It Free
          </motion.button>
          <div className="mt-10 text-left p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-2xl mx-auto text-gray-600">
            This is an example text that has some <span className="text-red-500 line-through">grammer</span><span className="text-green-600 font-semibold"> grammar</span> errors and also could be improved for better flow. It is a <span className="text-red-500 line-through">long sentence with many words</span>. We want to make sure that the text is clear, concise, and impactful. This tool will help you <span className="text-green-600 font-semibold">achieve that goal</span>.
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <h3 className="text-3xl font-bold mb-12">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-left"
              >
                <div className="mb-4">{card.icon}</div>
                <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

       
        <section>
          <h3 className="text-3xl font-bold">Ready to Transform Your Writing?</h3>
          <motion.button
          onClick={() => {
            navigate("/home");
          }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 cursor-pointer bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all"
          >
            Start Improving Now
          </motion.button>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200 text-gray-500">
        © 2025 Text Enhancer. All rights reserved.
      </footer>
    </div>
    </div>
  )
}

export default landing
