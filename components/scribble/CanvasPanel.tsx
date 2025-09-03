'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  image: string | null
  setImage: (data: string | null) => void
  theme: 'pokemon' | 'amateur'
  mode: 'canvas' | 'upload'
}

export function CanvasPanel({ image, setImage, theme, mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // upload 모드로 바뀌면 캔버스 초기화
    if (mode === 'upload') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setImage(null)
      setHistory([])
    }
  }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let drawing = false

    const startDrawing = (e: MouseEvent) => {
      drawing = true
      ctx.beginPath()
      ctx.moveTo(e.offsetX, e.offsetY)
    }

    const draw = (e: MouseEvent) => {
      if (!drawing) return
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.strokeStyle = '#000'  // 모든 모드에서 검정색 고정
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    const endDrawing = () => {
  if (!drawing) return
  drawing = false
  ctx.closePath()
  // 배경을 흰색으로 강제 채우기
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 이미지 저장
  const dataUrl = canvas.toDataURL('image/png');
  setImage(dataUrl);
  setHistory((prev) => [...prev, dataUrl]);
  ctx.globalCompositeOperation = 'source-over'; // 원래대로 복원
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', endDrawing)
    canvas.addEventListener('mouseleave', endDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', endDrawing)
      canvas.removeEventListener('mouseleave', endDrawing)
    }
  }, [theme, setImage])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setImage(null)
    setHistory([])
  }

  const undoLast = () => {
    const canvas = canvasRef.current
    if (!canvas || history.length < 2) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const newHistory = [...history]
    newHistory.pop()
    const last = newHistory[newHistory.length - 1]
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = last
    setImage(last)
    setHistory(newHistory)
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        className="border rounded bg-white dark:bg-black cursor-crosshair"/>
      <div className="mt-2 flex gap-4">
        <button onClick={undoLast} className="text-sm text-blue-500 hover:underline">Undo</button>
        <button onClick={clearCanvas} className="text-sm text-red-500 hover:underline">Clear</button>
      </div>
    </div>
  )
}
