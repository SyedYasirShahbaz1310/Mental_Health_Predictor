const Step2DigitalHabits = ({ data, onChange }) => {
  const platforms = ['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter', 'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat'];
  const purposes = ['Networking', 'Education', 'Entertainment', 'News'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1 flex justify-between">
          <span>Avg Daily Usage Hours</span>
          <span className="text-teal-400">{data.Avg_Daily_Usage_Hours}h</span>
        </label>
        <input
          type="range"
          name="Avg_Daily_Usage_Hours"
          value={data.Avg_Daily_Usage_Hours}
          onChange={onChange}
          min="0"
          max="24"
          step="0.5"
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1 flex justify-between">
          <span>Daily Unlocks</span>
          <span className="text-violet-400">{data.Daily_Unlocks}</span>
        </label>
        <input
          type="range"
          name="Daily_Unlocks"
          value={data.Daily_Unlocks}
          onChange={onChange}
          min="0"
          max="1000"
          step="1"
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Most Used Platform</label>
        <select
          name="Most_Used_Platform"
          value={data.Most_Used_Platform}
          onChange={onChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none"
        >
          {platforms.map(p => (
            <option key={p} value={p} className="bg-slate-800">{p}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Purpose of Use</label>
        <select
          name="Purpose_Of_Use"
          value={data.Purpose_Of_Use}
          onChange={onChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none"
        >
          {purposes.map(p => (
            <option key={p} value={p} className="bg-slate-800">{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step2DigitalHabits;
