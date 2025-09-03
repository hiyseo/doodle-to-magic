'use client'

import { useState, useEffect } from 'react'
import { ToggleTheme } from '@/components/scribble/ToggleTheme'
import { ModeTabs } from '@/components/scribble/ModeTab'
import { CanvasPanel } from '@/components/scribble/CanvasPanel'
import { UploadPanel } from '@/components/scribble/UploadPanel'
import { PromptInput } from '@/components/scribble/PromptInput'
import { ResultViewer } from '@/components/scribble/ResultViewer'


export default function Home() {
  const [mode, setMode] = useState<'canvas' | 'upload'>('upload');
  const [theme, setTheme] = useState<'pokemon' | 'amateur'>('pokemon');
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImage(null);
    setPrompt('');
    setResult(null);
  }, [mode, theme]);

  // 예시 이미지를 base64로 변환하는 함수
  const handleExampleClick = async (src: string, promptText: string) => {
    setPrompt(promptText);
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      alert('이미지 로딩에 실패했습니다.');
    }
  };

  return (
<main className={`min-h-screen px-4 py-6 transition-colors ${theme === 'pokemon' ? 'bg-yellow-50' : 'bg-gray-900 text-white'}`}>
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">🎨 Doodle to Magic</h1>
    <ToggleTheme theme={theme} onChange={setTheme} />
  </div>

  <div className={`mb-4 text-left text-base ${theme === 'amateur' ? 'text-white' : 'text-gray-700'}`}>
    {theme === 'pokemon'
      ? (
      <>
        직접 그리거나 이미지를 업로드하면 AI가 포켓몬 스타일로 변환해줍니다.<br />
        아래 예시를 클릭해서 시도해보세요!
      </>
      )
      : (
      <>
        직접 그리거나 이미지를 업로드하면 AI가 크레용 느낌의 아이들 그림으로 변환해줍니다.<br />
        아래 예시를 클릭해서 시도해보세요!
      </>
      )
    }
  </div>

  <ModeTabs mode={mode} setMode={setMode} />

  {mode === 'canvas' ? (
    <CanvasPanel image={image} setImage={setImage} theme={theme} mode={mode} />
  ) : (
    <UploadPanel image={image} setImage={setImage} theme={theme} />
  )}


{/* 예시 이미지 영역 */}
<div className="flex flex-row justify-center gap-4 mb-2">
  <img src="/tiger.png" alt="예시1" className="w-20 h-20 object-cover rounded shadow cursor-pointer" onClick={() => handleExampleClick('/tiger.png', 'tiger')} />
  <img src="/owl.png" alt="예시2" className="w-20 h-20 object-cover rounded shadow cursor-pointer" onClick={() => handleExampleClick('/owl.png', 'owl')} />
  <img src="/monster.png" alt="예시3" className="w-20 h-20 object-cover rounded shadow cursor-pointer" onClick={() => handleExampleClick('/monster.png', 'monster')} />
  <img src="/bird.png" alt="예시4" className="w-20 h-20 object-cover rounded shadow cursor-pointer" onClick={() => handleExampleClick('/bird.png', 'bird')} />
</div>
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
    const { resultImage } = await res.json();
    setResult(resultImage);
  } catch (err) {
    alert('서버 연결에 실패했습니다.');
  }
  setLoading(false);
}}
>
Generate
</button>
</div>


<ResultViewer loading={loading} result={result} mode={theme}/>
</main>
)
}