'use client'

import { useEffect } from 'react'

interface Props {
  image: string | null;
  setImage: (data: string | null) => void;
  theme: 'pokemon' | 'amateur';
}
export function UploadPanel({ image, setImage, theme }: Props) {
  const defaultImage = theme === 'amateur'
    ? '/childlike_image.png'
    : '/pokemon_image.png'

  useEffect(() => {
    setImage(null)
  }, [theme]) // theme 바뀔 때 image 초기화

  const showImage = image ?? defaultImage

  return (
    <div className="flex flex-col items-center mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImage(reader.result as string)
            reader.readAsDataURL(file)
          }
        }}
      />
      {showImage && (
        <img
          src={showImage}
          alt="Selected"
          className="w-[512px] h-[512px] mt-4 object-contain rounded border"
        />
      )}
    </div>
  )
}
