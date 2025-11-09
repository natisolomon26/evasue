'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const GetInvolved: React.FC = () => {
  const actions = [
    {
      title: 'Start a Group',
      description: 'Launch a campus group at your university',
      cta: 'Start Today',
      href: '/start-group'
    },
    {
      title: 'Volunteer',
      description: 'Serve as a leader or mentor',
      cta: 'Volunteer',
      href: '/volunteer'
    },
    {
      title: 'Donate',
      description: 'Support our mission to reach more students',
      cta: 'Give Now',
      href: '/donate'
    }
  ];

  return (
    <Container className="py-20">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get <span className="text-yellow-500">Involved</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join us in reaching Ethiopian students for Christ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="secondary" size="lg" href="/join">
            Join Us Today
          </Button>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            className="text-center p-8 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-blue-900 mb-3">{action.title}</h3>
            <p className="text-gray-600 mb-4">{action.description}</p>
            <Button variant="outline" href={action.href}>
              {action.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};