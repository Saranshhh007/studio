export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-brand-saffron via-brand-white to-brand-green p-0.5 shadow-md">
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-navy-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-brand-deep-blue leading-tight">CivicSamadhaan</span>
        <span className="text-sm text-brand-deep-blue/80 leading-tight font-medium">सिविक समाधान</span>
      </div>
    </div>
  );
}
