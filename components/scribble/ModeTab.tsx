// --- components/scribble/ModeTabs.tsx ---
'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
  mode: 'canvas' | 'upload'
  setMode: (m: 'canvas' | 'upload') => void
  onSwitchMode?: () => void
}

export function ModeTabs({ mode, setMode, onSwitchMode }: Props) {
  const handleChange = (val: string) => {
    setMode(val as 'canvas' | 'upload')
    onSwitchMode?.()
  }

  return (
    <div className="mb-4">
      <Tabs value={mode} onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
