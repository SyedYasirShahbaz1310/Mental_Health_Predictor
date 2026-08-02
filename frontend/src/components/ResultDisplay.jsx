import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';

const ResultDisplay = ({ score, onReset }) => {
  useEffect(() => {
    if (score >= 7) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#14b8a6', '#8b5cf6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#14b8a6', '#8b5cf6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [score]);

  // Insights logic - High score = Good, Low score = Bad (Scale 1-10)
  let insightText = "";
  let pathColor = "";
  if (score >= 7) {
    insightText = "Excellent digital balance and wellness! Keep maintaining your healthy habits.";
    pathColor = "#14b8a6"; // teal
  } else if (score >= 5) {
    insightText = "You are doing okay, but there is room for improvement. Consider adjusting your screen time or increasing physical activity.";
    pathColor = "#f59e0b"; // amber
  } else {
    insightText = "Your habits show significant stress on your mental wellness. It might be time to take a digital detox and focus on sleep and outdoor activities.";
    pathColor = "#ef4444"; // red
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center max-w-lg mx-auto"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent mb-8">
        Your Wellness Score
      </h2>

      <div className="w-48 h-48 mb-8">
        <CircularProgressbar
          value={score}
          maxValue={10}
          text={`${score.toFixed(1)}`}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: pathColor,
            trailColor: 'rgba(51, 65, 85, 0.5)',
            textSize: '1.5rem',
            pathTransitionDuration: 1.5,
          })}
        />
      </div>

      <p className="text-slate-300 text-lg leading-relaxed mb-10">
        {insightText}
      </p>

      <button
        onClick={onReset}
        className="flex items-center px-8 py-3 rounded-xl bg-slate-700 text-white font-medium hover:bg-slate-600 transition-all"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Recalculate
      </button>
    </motion.div>
  );
};

export default ResultDisplay;
