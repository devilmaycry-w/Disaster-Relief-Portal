import React from 'react';

const steps = [
  {
    title: 'Welcome to ReliefMap!',
    description: 'This platform helps you find and report disaster relief needs in real time. Let’s take a quick tour!'
  },
  {
    title: 'Map & Navigation',
    description: 'Use the map to see reports and safe zones. The bottom navigation lets you switch between Map, Alerts, and Profile.'
  },
  {
    title: 'Submit a Report',
    description: 'Tap the + button to submit a new report about help needed, resources, or safe zones. Your location is used for accuracy.'
  },
  {
    title: 'Alerts',
    description: 'Get real-time alerts about emergencies and updates. Tap the bell icon to view all alerts.'
  },
  {
    title: 'Profile',
    description: 'View your activity and manage your account from the Profile tab.'
  },
  {
    title: 'Ready to get started?',
    description: 'You can revisit this tour anytime from your profile. Stay safe and help others!'
  }
];

const OnboardingModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!open) setStep(0);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="card-floating max-w-md w-full p-8 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100 transition"
          aria-label="Close tour"
          onClick={onClose}
        >
          <span aria-hidden>×</span>
        </button>
        <h2 className="text-2xl font-bold mb-2 text-title">{steps[step].title}</h2>
        <p className="text-gray-700 mb-6 text-body">{steps[step].description}</p>
        <div className="flex justify-between items-center">
          <button
            className="px-6 py-2 rounded-full font-semibold text-pink-600 bg-pink-100 hover:bg-pink-200 transition-all duration-200 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 flex items-center gap-2"
            onClick={onClose}
            aria-label="Skip tour"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 7l10 5-10 5V7z" fill="currentColor"/></svg>
            Skip
          </button>
          <div className="flex-1"></div>
          {step < steps.length - 1 ? (
            <button
              className="btn-primary px-6 py-2"
              onClick={() => setStep(s => s + 1)}
              aria-label="Next step"
            >
              Next
            </button>
          ) : (
            <button
              className="btn-primary px-6 py-2"
              onClick={onClose}
              aria-label="Finish tour"
            >
              Finish
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full ${i === step ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
