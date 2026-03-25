'use client'

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
                <div className="loading-shadow">
                    <svg
                        className="loading-animation w-14 h-14 text-[#663820]"
                        viewBox="0 0 50 50"
                        fill="none"
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="90 60"
                        />
                    </svg>
                    <p className="loading-title">Synthesising your book…</p>
                    <div className="loading-progress">
                        {['Uploading PDF', 'Extracting content', 'Preparing voice'].map((step) => (
                            <div key={step} className="loading-progress-item gap-2">
                                <span className="loading-progress-status" />
                                <span className="text-[var(--text-secondary)]">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingOverlay
