'use client'

import { Toggle } from "@/components/ui/toggle"

interface Props {
    theme: 'pokemon' | 'amateur'
    onChange: (t: 'pokemon' | 'amateur') => void
}

export function ToggleTheme({ theme, onChange }: Props) {
return (
    <Toggle
        pressed={theme === 'amateur'}
        onPressedChange={() => onChange(theme === 'pokemon' ? 'amateur' : 'pokemon')}>
        {theme === 'pokemon' ? 'Change Mode' : 'Change Mode'}
    </Toggle>
    )
}