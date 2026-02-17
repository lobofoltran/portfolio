"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type ZoomImageSrc =
  | string
  | StaticImageData
  | Blob

type ZoomImageProps = {
  src: ZoomImageSrc
  alt: string
  caption?: string
  className?: string
  wide?: boolean
}

export function shouldCloseOnKey(key: string) {
  return key === "Escape"
}

export function ZoomImage({
  src,
  alt,
  caption,
  className,
  wide = false,
}: ZoomImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  /**
   * Resolve Blob → objectURL safely
   */
  useEffect(() => {
    if (typeof src === "string") return
    if (!(src instanceof Blob)) return

    const url = URL.createObjectURL(src)
    setObjectUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [src])

  const resolvedSrc: string | StaticImageData =
    typeof src === "string"
      ? src
      : src instanceof Blob
        ? objectUrl ?? ""
        : src

  /**
   * ESC handler
   */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ""
      return;
    }

    document.body.style.overflow = "hidden"

    function onKeyDown(event: KeyboardEvent) {
      if (shouldCloseOnKey(event.key)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  /**
   * Avoid rendering before Blob URL resolves
   */
  if (src instanceof Blob && !objectUrl) {
    return null
  }

  return (
    <>
      {/* Wrapper (no figure) */}
      <div
        role="figure"
        className={cn(
          "my-8 space-y-2",
          wide &&
          "relative left-1/2 w-screen max-w-5xl -translate-x-1/2 px-4"
        )}
      >
        <button
          type="button"
          className="group relative block w-full overflow-hidden rounded-lg border bg-muted/40"
          onClick={() => setIsOpen(true)}
          aria-label={`Expand image: ${alt}`}
        >
          <div className="relative aspect-video cursor-pointer">
            <Image
              src={resolvedSrc}
              alt={alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </button>

        {caption && (
          <div className="text-center text-sm text-muted-foreground">
            {caption}
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close image"
            className="absolute right-4 top-4 rounded-md bg-background/10 p-2 text-white hover:bg-background/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-5" />
          </button>

          <div
            className="relative h-[85vh] w-[min(1400px,95vw)]"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={resolvedSrc}
              alt={alt}
              fill
              sizes="95vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
