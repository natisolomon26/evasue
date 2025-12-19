'use client';

import { useState } from 'react';
import { AlertTriangle, X, Trash2, Shield, CheckCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  seminarId: string;
  seminarTitle: string;
  registrationCount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteSeminarModal({ 
  seminarId, 
  seminarTitle, 
  registrationCount, 
  onClose, 
  onSuccess 
}: Props) {
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [step, setStep] = useState<'warning' | 'confirmation'>('warning');

  const handleDelete = async () => {
    if (step === 'warning') {
      setStep('confirmation');
      return;
    }

    if (confirmationText !== seminarTitle) {
      toast.error(`Please type "${seminarTitle}" to confirm deletion`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/seminars/${seminarId}`, { 
        method: 'DELETE' 
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete seminar');

      toast.success('Seminar deleted successfully', {
        icon: '🗑️',
        duration: 4000,
        style: {
          background: '#10b981',
          color: 'white',
        },
      });
      
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete seminar', {
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (step === 'confirmation') {
      setStep('warning');
      setConfirmationText('');
    } else {
      onClose();
    }
  };

  const isConfirmDisabled = step === 'confirmation' && confirmationText !== seminarTitle;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
        loading ? 'scale-95 opacity-90' : 'scale-100 opacity-100'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                step === 'warning' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {step === 'warning' ? (
                  <AlertTriangle size={24} />
                ) : (
                  <Shield size={24} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {step === 'warning' ? 'Delete Seminar' : 'Confirm Deletion'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {step === 'warning' 
                    ? 'This action requires confirmation' 
                    : 'Final confirmation required'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading}
              aria-label="Close"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'warning' ? (
            <div className="space-y-4">
              {/* Seminar Info */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">{seminarTitle}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Info size={14} />
                    <span>{registrationCount} registration{registrationCount !== 1 ? 's' : ''}</span>
                  </div>
                  {registrationCount > 0 && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertTriangle size={14} />
                      <span>Has active registrations</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Warning Message */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-medium text-red-800">Irreversible Action</h4>
                    <ul className="mt-2 space-y-1 text-sm text-red-700">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 mt-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span>All seminar data will be permanently deleted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 mt-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span>All associated registrations will be removed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 mt-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span>This action cannot be undone or recovered</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              {registrationCount > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <AlertTriangle size={14} />
                    <span>
                      <strong>Note:</strong> {registrationCount} participant{registrationCount !== 1 ? 's are' : ' is'} registered. 
                      Consider notifying them before deletion.
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Confirmation Prompt */}
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="text-red-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Type to confirm deletion</h3>
                <p className="text-sm text-gray-600 mb-4">
                  To confirm, please type the seminar title exactly as shown:
                </p>
                <div className="mb-3 p-3 bg-white border border-gray-300 rounded-lg">
                  <code className="text-sm font-mono text-gray-800 select-all">{seminarTitle}</code>
                </div>
              </div>

              {/* Confirmation Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type "{seminarTitle}" to continue
                </label>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder={`Type "${seminarTitle}" here`}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                    confirmationText === seminarTitle 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                  autoFocus
                  disabled={loading}
                />
                {confirmationText === seminarTitle && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle size={16} />
                    <span>Title matches. You may proceed with deletion.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              {step === 'warning' ? 'Cancel' : 'Go Back'}
            </button>
            
            <button
              onClick={handleDelete}
              disabled={loading || (step === 'confirmation' && isConfirmDisabled)}
              className={`px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                step === 'warning'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>
                  {step === 'warning' ? (
                    <>
                      <Trash2 size={18} />
                      Continue to Delete
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={18} />
                      Confirm Delete Seminar
                    </>
                  )}
                </>
              )}
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Step {step === 'warning' ? '1' : '2'} of 2
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-8 h-1 rounded-full ${step === 'warning' ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-1 rounded-full ${step === 'confirmation' ? 'bg-red-600' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}