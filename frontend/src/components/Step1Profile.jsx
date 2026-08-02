const Step1Profile = ({ data, onChange }) => {
  const academicLevels = ['Undergraduate', 'Graduate', 'High School'];
  const countries = ['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Age</label>
        <div className="relative">
          <input
            type="number"
            name="Age"
            value={data.Age}
            onChange={onChange}
            min="10"
            max="100"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Gender</label>
        <div className="grid grid-cols-2 gap-3">
          {['Male', 'Female'].map(gender => (
            <button
              key={gender}
              type="button"
              onClick={() => onChange({ target: { name: 'Gender', value: gender } })}
              className={`py-3 rounded-xl border transition-all ${
                data.Gender === gender 
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300' 
                  : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Academic Level</label>
        <select
          name="Academic_Level"
          value={data.Academic_Level}
          onChange={onChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none"
        >
          {academicLevels.map(level => (
            <option key={level} value={level} className="bg-slate-800">{level}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-400 font-medium ml-1">Country</label>
        <select
          name="Grouped_country"
          value={data.Grouped_country}
          onChange={onChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none"
        >
          {countries.map(c => (
            <option key={c} value={c} className="bg-slate-800">{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step1Profile;
