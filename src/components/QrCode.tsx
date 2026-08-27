import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export function QrCode({ value, size = 160 }: { value: string; size?: number }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: '#0f1115', light: '#faf6ee' },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [value, size])

  if (!dataUrl) {
    return (
      <div
        className="flex items-center justify-center rounded-xl bg-white text-ink text-xs font-mono"
        style={{ width: size, height: size }}
      >
        QR CODE
      </div>
    )
  }

  return <img src={dataUrl} alt="QR code" width={size} height={size} className="rounded-xl" />
}
