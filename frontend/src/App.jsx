import { useState } from 'react';
import WizardForm from './components/WizardForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);

  const handleReset = () => {
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>
      
      <main className="w-full max-w-4xl relative z-10">
        {!predictionResult ? (
          <WizardForm onResult={(res) => setPredictionResult(res)} />
        ) : (
          <ResultDisplay score={predictionResult} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
