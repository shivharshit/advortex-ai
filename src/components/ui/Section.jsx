import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, id, className = '', ...props }) => {
  return (
    <motion.section 
      id={id} 
      className={`section ${className}`} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
