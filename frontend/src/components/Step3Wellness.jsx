const Step3Wellness = ({ data, onChange }) => {
  const stressLevels = ['Low', 'Medium', 'High', 'Very High'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1 flex justify-between">
          <span>Study Hours</span>
          <span className="text-teal-400">{data.Study_Hours}h</span>
        </label>
        <input
          type="range"
          name="Study_Hours"
          value={data.Study_Hours}
          onChange={onChange}
          min="0"
          max="24"
          step="0.5"
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1 flex justify-between">
          <span>Physical Activity Hours</span>
          <span className="text-violet-400">{data.Physical_Activity_Hours}h</span>
        </label>
        <input
          type="range"
          name="Physical_Activity_Hours"
          value={data.Physical_Activity_Hours}
          onChange={onChange}
          min="0"
          max="12"
          step="0.5"
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1 flex justify-between">
          <span>Sleep Hours Per Night</span>
          <span className="text-teal-400">{data.Sleep_Hours_Per_Night}h</span>
        </label>
        <input
          type="range"
          name="Sleep_Hours_Per_Night"
          value={data.Sleep_Hours_Per_Night}
          onChange={onChange}
          min="0"
          max="14"
          step="0.5"
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Stress Level</label>
        <select
          name="Stress_Level"
          value={data.Stress_Level}
          onChange={onChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none"
        >
          {stressLevels.map(level => (
            <option key={level} value={level} className="bg-slate-800">{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step3Wellness;
