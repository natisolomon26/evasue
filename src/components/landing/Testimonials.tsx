'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Samuel',
      university: 'Addis Ababa University',
      text: 'Evasue changed my life — I found purpose in Christ and genuine community with fellow believers.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200'
    },
    {
      name: 'Hirut',
      university: 'Hawassa University',
      text: 'The discipleship program helped me grow deeper in my faith and learn how to share Christ with my friends.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200'
    },
    {
      name: 'Abel',
      university: 'Bahir Dar University',
      text: 'Through Evasue, I discovered my calling to reach other students with the Gospel. It\'s been amazing!',
      image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200'
    }
  ];

  return (
    <Container className="py-20 bg-blue-900 text-white">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Student <span className="text-yellow-400">Stories</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-blue-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Real testimonies from Ethiopian students
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-white text-gray-800 p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.university}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">{testimonial.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};