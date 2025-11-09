'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const WhatWeDo: React.FC = () => {
  const services = [
    {
      title: 'Bible Study Groups',
      description: 'Weekly small groups on campus where students dive deep into God\'s Word together.',
      icon: '📚'
    },
    {
      title: 'Discipleship',
      description: 'One-on-one spiritual mentoring to help students grow in their faith journey.',
      icon: '🤝'
    },
    {
      title: 'Evangelism',
      description: 'Reaching students with the love of Christ through campus outreach events.',
      icon: '❤️'
    }
  ];

  return (
    <Container className="py-20 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What We <span className="text-yellow-500">Do</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Building Christ-centered communities across Ethiopian universities
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};