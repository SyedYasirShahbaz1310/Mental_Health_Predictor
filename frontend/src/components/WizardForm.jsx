import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Step1Profile from './Step1Profile';
import Step2DigitalHabits from './Step2DigitalHabits';
import Step3Wellness from './Step3Wellness';

const API_BASE_URL = "https://mental-health-predictor-qxe2.vercel.app";

const WizardForm = ({ onResult }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    Age: 18,
    Gender: 'Male',
    Academic_Level: 'Undergraduate',
    Grouped_country: 'India',
    Avg_Daily_Usage_Hours: 4,
    Daily_Unlocks: 50,
    Most_Used_Platform: 'Instagram',
    Purpose_Of_Use: 'Entertainment',
    Study_Hours: 4,
    Physical_Activity_Hours: 1,
    Sleep_Hours_Per_Night: 7,
    Stress_Level: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = parseFloat(value);
    }
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (formData.Age < 10 || formData.Age > 100) return "Age must be between 10 and 100.";
    }
    if (currentStep === 2) {
      if (formData.Avg_Daily_Usage_Hours < 0 || formData.Avg_Daily_Usage_Hours > 24) return "Daily Usage Hours must be between 0 and 24.";
      if (formData.Daily_Unlocks < 0 || formData.Daily_Unlocks > 1000) return "Daily Unlocks must be between 0 and 1000.";
    }
    if (currentStep === 3) {
      if (formData.Study_Hours < 0 || formData.Study_Hours > 100) return "Study Hours must be between 0 and 100.";
      if (formData.Physical_Activity_Hours < 0 || formData.Physical_Activity_Hours > 24) return "Physical Activity Hours must be between 0 and 24.";
      if (formData.Sleep_Hours_Per_Night < 0 || formData.Sleep_Hours_Per_Night > 24) return "Sleep Hours must be between 0 and 24.";
    }
    return null;
  };

  const nextStep = () => {
    const errorMsg = validateStep(step);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError('');
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const errorMsg = validateStep(step);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData);
      onResult(response.data.Mental_Health_Score);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while predicting.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Profile', component: <Step1Profile data={formData} onChange={handleChange} /> },
    { title: 'Digital Habits', component: <Step2DigitalHabits data={formData} onChange={handleChange} /> },
    { title: 'Wellness', component: <Step3Wellness data={formData} onChange={handleChange} /> }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Mental Health Predictor
        </h2>
        <p className="text-slate-400">Discover your wellness score based on your lifestyle.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors duration-300 ${
              step >= num ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-slate-700 text-slate-400'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-colors duration-300 ${
                step > num ? 'bg-teal-500' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[300px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-slate-200">{steps[step - 1].title}</h3>
            {steps[step - 1].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={step === 1 || loading}
          className="px-6 py-2.5 rounded-xl text-slate-300 font-medium hover:bg-slate-700/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2.5 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-400 transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 text-white font-medium hover:from-teal-400 hover:to-violet-400 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
            {loading ? 'Analyzing...' : 'Get My Score'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardForm;
