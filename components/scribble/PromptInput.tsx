'use client'

interface Props {
    prompt: string
    setPrompt: (v: string) => void
    theme: 'pokemon' | 'amateur'
}

export function PromptInput({ prompt, setPrompt, theme }: Props) {
    return (
        <div className="mt-4 flex justify-center">
            <input
            type="text"
            placeholder={theme === 'pokemon' ? '예시: pikachu (단어로 입력)' : '예시: castle (단어로 입력)'}
            className={`w-96 p-2 rounded border ${theme === 'amateur' ? 'text-black' : ''}`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            />
        </div>
    );
}