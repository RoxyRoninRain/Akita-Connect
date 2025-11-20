import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User } from '../types';

const Onboarding: React.FC = () => {
  const { updateUser } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<User>>({ role: 'enthusiast', bio: '', location: '' });

  const handleNext = () => {
    if (step === 3) {
      updateUser(formData);
      setStep(4); // Complete
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Onboarding</h2>
      {step === 1 && <div><p>Select your role</p> {/* Radio buttons */} <button onClick={handleNext}>Next</button></div>}
      {step === 2 && <div><input placeholder="Bio" onChange={(e) => setFormData({...formData, bio: e.target.value})} /> <button onClick={handleNext}>Next</button></div>}
      {step === 3 && <div><input placeholder="Location" onChange={(e) => setFormData({...formData, location: e.target.value})} /> <button onClick={handleNext}>Complete</button></div>}
      {step === 4 && <div>Welcome! <Link to="/">Go to Home</Link></div>}
    </div>
  );
};

export default Onboarding;