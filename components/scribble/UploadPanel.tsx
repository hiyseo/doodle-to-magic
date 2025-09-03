'use client'

import { useEffect, useRef } from 'react'

interface Props {
  image: string | null;
  setImage: (data: string | null) => void;
  theme: 'pokemon' | 'amateur';
}
export function UploadPanel({ image, setImage, theme }: Props) {
  const defaultImage = theme === 'amateur'
    ? '/childlike_image.png'
    : '/pokemon_image.png'

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [theme]); // theme 바뀔 때 image 및 파일 입력 초기화

  const showImage = image ?? defaultImage;

  return (
    <div className="flex flex-col items-center mb-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="w-48" // 입력창 가로 크기 줄임
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
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
