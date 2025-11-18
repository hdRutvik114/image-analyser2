import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background/image.jpg)' }}>
      <motion.h1
        className="text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-lg text-white text-center max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Welcome to our Image Analyzer website! Our platform allows users to upload images for analysis, extracting valuable information and insights. Whether you're looking to decode QR codes or analyze text from images, we've got you covered. Our user-friendly interface and powerful backend make it easy to get the results you need.
      </motion.p>
      <motion.button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default About;
