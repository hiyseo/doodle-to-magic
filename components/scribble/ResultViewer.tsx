'use client'

interface Props {
    result: string | null
    loading: boolean
}

export function ResultViewer({ result, loading }: Props) {
return (
    <div className="mt-8 text-center min-h-[300px]">
        {loading && <p>Generating...</p>}
        {!loading && result && <img src={result} alt="Result" className="mx-auto max-h-[300px] rounded" />}
    </div>
    )
}