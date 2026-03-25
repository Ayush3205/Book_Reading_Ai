'use client'

import { voiceOptions, voiceCategories } from '@/lib/constants'
import { VoiceSelectorProps } from '@/types'

const VoiceSelector = ({ value, onChange, disabled }: VoiceSelectorProps) => {
    const renderGroup = (label: string, keys: string[]) => (
        <div className="mb-5 last:mb-0">
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">{label}</p>
            <div className="voice-selector-options flex-wrap">
                {keys.map((key) => {
                    const voice = voiceOptions[key as keyof typeof voiceOptions]
                    const selected = value === voice.id
                    return (
                        <label
                            key={voice.id}
                            htmlFor={`voice-${voice.id}`}
                            className={`voice-selector-option flex-col items-start gap-1 cursor-pointer ${
                                selected
                                    ? 'voice-selector-option-selected'
                                    : 'voice-selector-option-default'
                            } ${disabled ? 'voice-selector-option-disabled' : ''}`}
                        >
                            <input
                                type="radio"
                                id={`voice-${voice.id}`}
                                name="persona"
                                value={voice.id}
                                checked={selected}
                                onChange={() => !disabled && onChange(voice.id)}
                                disabled={disabled}
                                className="sr-only"
                            />
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        selected ? 'border-[#663820]' : 'border-[#999]'
                                    }`}
                                >
                                    {selected && (
                                        <span className="w-2 h-2 rounded-full bg-[#663820]" />
                                    )}
                                </span>
                                <span className="font-semibold text-[#212a3b]">{voice.name}</span>
                            </div>
                            <p className="text-xs text-[#3d485e] leading-4 pl-6">
                                {voice.description}
                            </p>
                        </label>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div>
            {renderGroup('Male Voices', voiceCategories.male)}
            {renderGroup('Female Voices', voiceCategories.female)}
        </div>
    )
}

export default VoiceSelector
