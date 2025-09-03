'use client'

import { useState, useEffect } from 'react'
import { ToggleTheme } from '@/components/scribble/ToggleTheme'
import { ModeTabs } from '@/components/scribble/ModeTab'
import { CanvasPanel } from '@/components/scribble/CanvasPanel'
import { UploadPanel } from '@/components/scribble/UploadPanel'
import { PromptInput } from '@/components/scribble/PromptInput'
import { ResultViewer } from '@/components/scribble/ResultViewer'


export default function Home() {
const [mode, setMode] = useState<'canvas' | 'upload'>('upload')
const [theme, setTheme] = useState<'pokemon' | 'amateur'>('pokemon')
const [image, setImage] = useState<string | null>(null)
const [prompt, setPrompt] = useState('')
const [result, setResult] = useState<string | null>(null)
const [loading, setLoading] = useState(false)

useEffect(() => {
  setImage(null)
}, [mode, theme])


return (
<main className={`min-h-screen px-4 py-6 transition-colors ${theme === 'pokemon' ? 'bg-yellow-50' : 'bg-gray-900 text-white'}`}>
<div className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold">🎨 Doodle to Magic</h1>
<ToggleTheme theme={theme} onChange={setTheme} />
</div>


<ModeTabs mode={mode} setMode={setMode} />


{mode === 'canvas' ? (
<CanvasPanel image={image} setImage={setImage} theme={theme} mode={mode} />
) : (
<UploadPanel image={image} setImage={setImage} theme={theme} />
)}


<PromptInput prompt={prompt} setPrompt={setPrompt} theme={theme} />


<div className="mt-4 text-center">
<button
className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
disabled={!image || !prompt || loading}
onClick={async () => {
  setLoading(true);
  setResult(null);
  try {
    const res = await fetch('https://hiyseo--doodle-to-magic-generate.modal.run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, prompt, theme }),
    });
    const { resultImage } = await res.json(); // 서버에서 resultImage(base64) 반환
    setResult(resultImage); // resultImage를 바로 <img src={result} />로 사용
  } catch (err) {
    alert('서버 연결에 실패했습니다.');
  }
  setLoading(false);
}}
>
Generate
</button>
</div>


<ResultViewer loading={loading} result={result} />
</main>
)
}