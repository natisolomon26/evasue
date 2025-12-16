"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Calendar, 
  CreditCard, 
  Building, 
  Banknote,
  Shield,
  Lock,
  Globe,
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
  CreditCard as CreditCardIcon,
  Building as BankIcon,
  Smartphone,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Gift,
  TrendingUp,
  Users,
  Award,
  X
} from "lucide-react";

interface DonationFormData {
  // Gift Frequency
  frequency: "one-time" | "monthly" | "quarterly" | "annually";
  
  // Gift Amount
  amount: number;
  customAmount: number;
  isCustomAmount: boolean;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Giving As
  givingAs: "individual" | "organization";
  organizationName: string;
  
  // Billing Address
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Transaction Fee
  coverTransactionFee: boolean;
  
  // Payment Method
  paymentMethod: "credit-card" | "bank-account" | "google-pay";
  
  // Credit Card Details
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  cardName: string;
  
  // Bank Account Details
  routingNumber: string;
  accountNumber: string;
  accountType: "checking" | "savings";
  
  // Terms & Conditions
  acceptTerms: boolean;
  subscribeToUpdates: boolean;
}

export default function DonorPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<DonationFormData>({
    frequency: "one-time",
    amount: 100,
    customAmount: 0,
    isCustomAmount: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    givingAs: "individual",
    organizationName: "",
    country: "United States",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    coverTransactionFee: false,
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",
    acceptTerms: false,
    subscribeToUpdates: true,
  });

  const steps = [
    { id: 1, title: "Gift Details", icon: Gift },
    { id: 2, title: "Your Information", icon: User },
    { id: 3, title: "Billing Address", icon: MapPin },
    { id: 4, title: "Payment", icon: CreditCardIcon },
  ];

  const frequencyOptions = [
    { id: "one-time", label: "One Time", icon: Calendar, description: "Single donation" },
    { id: "monthly", label: "Monthly", icon: Calendar, description: "Recurring monthly" },
    { id: "quarterly", label: "Quarterly", icon: Calendar, description: "Every 3 months" },
    { id: "annually", label: "Annually", icon: Calendar, description: "Once per year" },
  ];

  const amountOptions = [
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
    { value: 250, label: "$250" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1,000" },
    { value: 0, label: "Custom", isCustom: true },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Other"
  ];

  const paymentMethods = [
    { id: "credit-card", label: "Credit Card", icon: CreditCardIcon },
    { id: "bank-account", label: "Bank Account", icon: BankIcon },
    { id: "google-pay", label: "Google Pay", icon: Smartphone },
  ];

  const accountTypes = [
    { id: "checking", label: "Checking" },
    { id: "savings", label: "Savings" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleAmountSelect = (amount: number) => {
    if (amount === 0) {
      setFormData(prev => ({ ...prev, isCustomAmount: true, amount: prev.customAmount || 0 }));
    } else {
      setFormData(prev => ({ ...prev, amount, isCustomAmount: false }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
  };

  const getStepProgress = () => {
    return (activeStep / steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Support Our Mission
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Your generous donation helps us create positive change and make a lasting impact on communities worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-700">
                    Step {activeStep} of {steps.length}
                  </div>
                  <div className="text-sm font-medium text-sky-800">
                    {Math.round(getStepProgress())}% Complete
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getStepProgress()}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-sky-800 to-sky-900 rounded-full"
                  />
                </div>
                
                {/* Step Indicators */}
                <div className="flex justify-between mt-6">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`text-center ${
                        step.id === activeStep ? "text-sky-700" : 
                        step.id < activeStep ? "text-sky-700" : "text-gray-400"
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        step.id === activeStep ? "bg-sky-100" : 
                        step.id < activeStep ? "bg-sky-50" : "bg-gray-100"
                      }`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-medium">{step.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-sky-700" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Your Generosity!</h2>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Your donation has been successfully processed. You'll receive a confirmation email shortly.
                      </p>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-2 rounded-full">
                        <Heart className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">Donation Confirmed</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Donation Form */}
              {!isSubmitted && (
                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Gift Details */}
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Gift Frequency</h2>
                          <p className="text-gray-600 mb-6">Select how often you'd like to make your donation.</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {frequencyOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFormData(prev => ({ ...prev, frequency: option.id as any }))}
                                className={`group relative p-4 rounded-xl border-2 transition-all ${
                                  formData.frequency === option.id
                                    ? "border-sky-700 bg-sky-50"
                                    : "border-gray-200 hover:border-sky-600 hover:bg-gray-50"
                                }`}
                              >
                                <div className="text-center">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                                    formData.frequency === option.id
                                      ? "bg-sky-100 text-sky-700"
                                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-sky-700"
                                  }`}>
                                    <option.icon className="w-5 h-5" />
                                  </div>
                                  <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                                  <div className="text-xs text-gray-500">{option.description}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Gift Amount</h2>
                          <p className="text-gray-600 mb-6">Select or enter your donation amount.</p>
                          
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                            {amountOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleAmountSelect(option.value)}
                                className={`py-3 rounded-xl font-medium transition-all ${
                                  (formData.amount === option.value && !formData.isCustomAmount && option.value !== 0) || 
                                  (formData.isCustomAmount && option.value === 0)
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                          
                          {formData.isCustomAmount && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mb-6"
                            >
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Custom Amount
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500">$</span>
                                </div>
                                <input
                                  type="number"
                                  min="1"
                                  value={formData.customAmount || ""}
                                  onChange={(e) => setFormData(prev => ({ 
                                    ...prev, 
                                    customAmount: parseInt(e.target.value) || 0,
                                    amount: parseInt(e.target.value) || 0
                                  }))}
                                  className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="Enter amount"
                                />
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Selected Amount Display */}
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-600">Your Donation</div>
                                <div className="text-3xl font-bold text-gray-900">
                                  ${formData.amount.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500 capitalize">
                                  {formData.frequency.replace("-", " ")} gift
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">Impact</div>
                                <div className="text-lg font-semibold text-emerald-600">
                                  {formData.amount >= 100 ? "Significant Impact" : 
                                   formData.amount >= 50 ? "Noticeable Impact" : "Valuable Support"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Your Information */}
                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Information</h2>
                          <p className="text-gray-600 mb-6">Tell us about yourself.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name *
                              </label>
                              <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="John"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Doe"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="john@example.com"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">I am giving as:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, givingAs: "individual" }))}
                                className={`group relative p-4 rounded-xl border-2 transition-all ${
                                  formData.givingAs === "individual"
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    formData.givingAs === "individual"
                                      ? "bg-emerald-100 text-emerald-600"
                                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                                  }`}>
                                    <User className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">As an Individual</div>
                                    <div className="text-sm text-gray-500">Personal donation</div>
                                  </div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, givingAs: "organization" }))}
                                className={`group relative p-4 rounded-xl border-2 transition-all ${
                                  formData.givingAs === "organization"
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    formData.givingAs === "organization"
                                      ? "bg-emerald-100 text-emerald-600"
                                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                                  }`}>
                                    <Building2 className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">On Behalf of an Organization</div>
                                    <div className="text-sm text-gray-500">Corporate or group donation</div>
                                  </div>
                                </div>
                              </button>
                            </div>
                            
                            {formData.givingAs === "organization" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-4"
                              >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Organization Name
                                </label>
                                <input
                                  type="text"
                                  value={formData.organizationName}
                                  onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="Company Name"
                                />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Billing Address */}
                    {activeStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Billing Address</h2>
                          <p className="text-gray-600 mb-6">Enter your billing information.</p>
                          
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country *
                              </label>
                              <select
                                value={formData.country}
                                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              >
                                {countries.map((country) => (
                                  <option key={country} value={country}>{country}</option>
                                ))}
                              </select>
                              <p className="mt-2 text-sm text-gray-500">
                                Please sign in for full list of available countries
                              </p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address 1 *
                              </label>
                              <input
                                type="text"
                                value={formData.address1}
                                onChange={(e) => setFormData(prev => ({ ...prev, address1: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="123 Main St"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address 2
                              </label>
                              <input
                                type="text"
                                value={formData.address2}
                                onChange={(e) => setFormData(prev => ({ ...prev, address2: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Apt, suite, unit, etc."
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  value={formData.city}
                                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="New York"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  value={formData.state}
                                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="NY"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  ZIP Code *
                                </label>
                                <input
                                  type="text"
                                  value={formData.zipCode}
                                  onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="10001"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={formData.coverTransactionFee}
                                  onChange={(e) => setFormData(prev => ({ ...prev, coverTransactionFee: e.target.checked }))}
                                  className="sr-only"
                                />
                                <div className={`w-6 h-6 rounded border-2 transition-colors ${
                                  formData.coverTransactionFee ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                                }`}>
                                  {formData.coverTransactionFee && (
                                    <CheckCircle className="w-5 h-5 text-white" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Make Your Gift Go Further</div>
                                <div className="text-sm text-gray-600">
                                  I want to cover the transaction fee for my donation (+2.9%)
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Payment */}
                    {activeStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
                          <p className="text-gray-600 mb-6">Select how you'd like to pay.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {paymentMethods.map((method) => (
                              <button
                                key={method.id}
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id as any }))}
                                className={`group relative p-4 rounded-xl border-2 transition-all ${
                                  formData.paymentMethod === method.id
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    formData.paymentMethod === method.id
                                      ? "bg-emerald-100 text-emerald-600"
                                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                                  }`}>
                                    <method.icon className="w-5 h-5" />
                                  </div>
                                  <div className="font-semibold text-gray-900">{method.label}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          {/* Credit Card Form */}
                          {formData.paymentMethod === "credit-card" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="space-y-6"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Cardholder Name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.cardName}
                                  onChange={(e) => setFormData(prev => ({ ...prev, cardName: e.target.value }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="John Doe"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Card Number *
                                </label>
                                <div className="relative">
                                  <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={(e) => setFormData(prev => ({ 
                                      ...prev, 
                                      cardNumber: formatCardNumber(e.target.value)
                                    }))}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date *
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.cardExpiry}
                                    onChange={(e) => setFormData(prev => ({ 
                                      ...prev, 
                                      cardExpiry: formatExpiryDate(e.target.value)
                                    }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV *
                                  </label>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                      type="text"
                                      value={formData.cardCVV}
                                      onChange={(e) => setFormData(prev => ({ 
                                        ...prev, 
                                        cardCVV: e.target.value.replace(/\D/g, '').substring(0, 4)
                                      }))}
                                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                      placeholder="123"
                                      maxLength={4}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Bank Account Form */}
                          {formData.paymentMethod === "bank-account" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="space-y-6"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Routing Number *
                                </label>
                                <input
                                  type="text"
                                  value={formData.routingNumber}
                                  onChange={(e) => setFormData(prev => ({ 
                                    ...prev, 
                                    routingNumber: e.target.value.replace(/\D/g, '').substring(0, 9)
                                  }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="123456789"
                                  maxLength={9}
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Account Number *
                                </label>
                                <input
                                  type="text"
                                  value={formData.accountNumber}
                                  onChange={(e) => setFormData(prev => ({ 
                                    ...prev, 
                                    accountNumber: e.target.value.replace(/\D/g, '').substring(0, 17)
                                  }))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  placeholder="Account number"
                                  maxLength={17}
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Account Type *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                  {accountTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setFormData(prev => ({ ...prev, accountType: type.id as any }))}
                                      className={`py-3 rounded-xl font-medium transition-all ${
                                        formData.accountType === type.id
                                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      }`}
                                    >
                                      {type.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Google Pay Placeholder */}
                          {formData.paymentMethod === "google-pay" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-center py-12"
                            >
                              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Smartphone className="w-10 h-10 text-blue-600" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Google Pay</h3>
                              <p className="text-gray-600 mb-6">
                                You'll be redirected to Google Pay to complete your secure payment.
                              </p>
                              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all">
                                Continue with Google Pay
                              </button>
                            </motion.div>
                          )}
                          
                          {/* Terms and Conditions */}
                          <div className="space-y-4 mt-8">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <div className="relative mt-1">
                                <input
                                  type="checkbox"
                                  checked={formData.acceptTerms}
                                  onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded border-2 transition-colors ${
                                  formData.acceptTerms ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                                }`}>
                                  {formData.acceptTerms && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">
                                I agree to the Terms of Service and Privacy Policy. Your donation is secure and tax-deductible.
                              </div>
                            </label>
                            
                            <label className="flex items-start gap-3 cursor-pointer">
                              <div className="relative mt-1">
                                <input
                                  type="checkbox"
                                  checked={formData.subscribeToUpdates}
                                  onChange={(e) => setFormData(prev => ({ ...prev, subscribeToUpdates: e.target.checked }))}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded border-2 transition-colors ${
                                  formData.subscribeToUpdates ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                                }`}>
                                  {formData.subscribeToUpdates && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">
                                Yes, I'd like to receive updates about how my donation is making a difference.
                              </div>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
                    <button
                      onClick={prevStep}
                      disabled={activeStep === 1}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        activeStep === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      ← Back
                    </button>
                    
                    <button
                      onClick={nextStep}
                      disabled={isSubmitting}
                      className="group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : activeStep === steps.length ? (
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>Complete Donation</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Continue</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary & Security */}
          <div className="lg:col-span-1 space-y-6">
            {/* Donation Summary */}
            <div className="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Donation Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Amount</span>
                  <span className="font-semibold text-gray-900">${formData.amount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-medium text-gray-900 capitalize">{formData.frequency.replace("-", " ")}</span>
                </div>
                
                {formData.coverTransactionFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction Fee</span>
                    <span className="font-medium text-emerald-600">+${(formData.amount * 0.029).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${(formData.amount + (formData.coverTransactionFee ? formData.amount * 0.029 : 0)).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Your donation is 100% tax-deductible</span>
                </div>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">Secure Donation</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>256-bit SSL encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>PCI DSS compliant payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Your information is never stored</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Immediate email confirmation</span>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Our donation specialists are here to assist you.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="text-gray-500">Call us at</div>
                  <div className="font-medium text-gray-900">(800) 123-4567</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Email us at</div>
                  <div className="font-medium text-gray-900">donations@example.org</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}