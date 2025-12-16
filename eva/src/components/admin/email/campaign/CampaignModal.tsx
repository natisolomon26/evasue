// components/admin/email/campaign/CampaignModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Save,
  Send,
  ChevronRight,
  Settings,
  Eye,
  Users
} from "lucide-react";
import BasicInfoStep from "./CampaignModal/BasicInfoStep";
import ContentStep from "./CampaignModal/ContentStep";
import RecipientsStep from "./CampaignModal/RecipientsStep";
import ReviewStep from "./CampaignModal/ReviewStep";
import { CampaignData } from "./CampaignModal/types";

interface CampaignModalProps {
  open: boolean;
  onClose: () => void;
  onSaveDraft: (data: CampaignData) => Promise<void>;
  onSend: (data: CampaignData) => Promise<void>;
}

export default function CampaignModal({
  open,
  onClose,
  onSaveDraft,
  onSend,
}: CampaignModalProps) {
  const [step, setStep] = useState<'basic' | 'content' | 'recipients' | 'review'>('basic');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    subject: "",
    category: "newsletter",
    htmlBody: "",
    previewText: "",
    fromName: "Campus Ministry",
    fromEmail: "noreply@campusministry.org",
    recipients: [],
    scheduledFor: "",
    tags: ["newsletter", "ministry"],
    attachments: []
  });

  // Initialize with template when modal opens
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Set default template content
      setCampaignData(prev => ({
        ...prev,
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 32px;">Campus Ministry Update</h1>
              <p style="margin: 20px 0 0; opacity: 0.9;">Bringing the Gospel to campuses worldwide</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #333; margin-bottom: 20px;">Dear Ministry Partner,</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                We're excited to share what God is doing on campuses around the world...
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Learn More
                </a>
              </div>
            </div>
            <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px;">
                © ${new Date().getFullYear()} Campus Ministry. All rights reserved.
              </p>
            </div>
          </div>
        `
      }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Update campaign data
  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  // Validate specific field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (field: string, value: any) => {
    setErrors(prev => {
      if (!value) {
        return { ...prev, [field]: '' };
      }
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 'basic') {
      if (!campaignData.subject.trim()) newErrors.subject = "Subject is required";
      if (campaignData.subject.length > 150) newErrors.subject = "Subject must be less than 150 characters";
      if (!campaignData.previewText?.trim()) newErrors.previewText = "Preview text is required";
    }

    if (step === 'content') {
      if (!campaignData.htmlBody.trim()) newErrors.htmlBody = "Email content is required";
      if (campaignData.htmlBody.length < 100) newErrors.htmlBody = "Content seems too short";
    }

    if (step === 'recipients') {
      if (!campaignData.recipients || campaignData.recipients.length === 0) {
        newErrors.recipients = "At least one recipient is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      const steps: ('basic' | 'content' | 'recipients' | 'review')[] = ['basic', 'content', 'recipients', 'review'];
      const currentIndex = steps.indexOf(step);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1]);
      }
    }
  };

  const handlePrevious = () => {
    const steps: ('basic' | 'content' | 'recipients' | 'review')[] = ['basic', 'content', 'recipients', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSaveDraft = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      await onSaveDraft(campaignData);
      onClose();
    } catch (error) {
      console.error("Error saving draft:", error);
      setErrors({ submit: "Failed to save draft. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      await onSend(campaignData);
      onClose();
    } catch (error) {
      console.error("Error sending campaign:", error);
      setErrors({ submit: "Failed to send campaign. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const steps = [
    { id: 'basic', label: 'Basic Info', icon: Settings },
    { id: 'content', label: 'Content', icon: Mail },
    { id: 'recipients', label: 'Recipients', icon: Users },
    { id: 'review', label: 'Review', icon: Eye }
  ];

  // Step components mapping
  const stepComponents = {
    basic: (
      <BasicInfoStep
        data={campaignData}
        errors={errors}
        onUpdate={updateCampaignData}
        onValidate={validateField}
      />
    ),
    content: (
      <ContentStep
        data={campaignData}
        errors={errors}
        onUpdate={updateCampaignData}
        onValidate={validateField}
      />
    ),
    recipients: (
      <RecipientsStep
        data={campaignData}
        errors={errors}
        onUpdate={updateCampaignData}
        onValidate={validateField}
      />
    ),
    review: (
      <ReviewStep
        data={campaignData}
        errors={errors}
        onUpdate={updateCampaignData}
        onValidate={validateField}
      />
    )
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-6xl my-8 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
                      <p className="text-gray-600">Design and schedule your email campaign</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mt-8">
                  {steps.map((s, index) => (
                    <div key={s.id} className="flex items-center">
                      <button
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={() => setStep(s.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          step === s.id
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        <s.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{s.label}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-gray-300 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-auto max-h-[70vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {stepComponents[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    {step !== 'basic' && (
                      <button
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {step !== 'review' ? (
                      <>
                        <button
                          onClick={handleSaveDraft}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          Save Draft
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSaveDraft}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                          <Save className="w-4 h-4" />
                          Save as Draft
                        </button>
                        <button
                          onClick={handleSend}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              {campaignData.scheduledFor ? 'Schedule Campaign' : 'Send Campaign Now'}
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: step === 'basic' ? '25%' : 
                               step === 'content' ? '50%' : 
                               step === 'recipients' ? '75%' : '100%'
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    {steps.map((s, index) => (
                      <motion.span
                        key={s.id}
                        animate={{ 
                          color: index <= steps.indexOf(steps.find(st => st.id === step)!) ? '#3b82f6' : '#6b7280',
                          fontWeight: index <= steps.indexOf(steps.find(st => st.id === step)!) ? '600' : '400'
                        }}
                      >
                        {s.label}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}