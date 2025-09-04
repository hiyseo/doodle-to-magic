'use client'

interface Props {
    result: string | null;
    loading: boolean;
    mode: 'pokemon' | 'amateur';
}

export function ResultViewer({ result, loading, mode }: Props) {
    // 이미지 저장 함수
    const handleSaveImage = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result;
        link.download = 'result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mt-8 text-center min-h-[512px]">
            {loading && <p>Generating...</p>}
            {!loading && result && (
                <>
                                        <img
                                            src={result}
                                            alt="Result"
                                            className="mx-auto rounded object-cover"
                                            style={{ width: '100%', maxWidth: '512px', aspectRatio: '1 / 1', height: 'auto' }}
                                        />
                    {mode === 'pokemon' ? (
                        <div className="flex flex-row justify-center gap-4 mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={handleSaveImage}
                            >
                                이미지 저장
                            </button>
                            {/* <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                onClick={() => alert('OBJ 파일 저장 기능은 준비 중입니다.')}
                            >
                                obj 파일로 저장
                            </button> */}
                        </div>
                    ) : (
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={handleSaveImage}
                            >
                                이미지 저장
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}