"use client"

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { Check, Copy, Download, FileImage, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActionState = "idle" | "busy" | "done" | "error"

async function svgElementToCanvas(svgEl: SVGSVGElement): Promise<HTMLCanvasElement> {
  const bbox = svgEl.getBoundingClientRect()
  const scale = window.devicePixelRatio || 2
  const width = Math.max(Math.round(bbox.width), 1)
  const height = Math.max(Math.round(bbox.height), 1)

  const clone = svgEl.cloneNode(true) as SVGSVGElement
  if (!clone.getAttribute("width")) clone.setAttribute("width", String(width))
  if (!clone.getAttribute("height")) clone.setAttribute("height", String(height))
  const serialized = new XMLSerializer().serializeToString(clone)
  const dataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(serialized)

  const canvas = document.createElement("canvas")
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D context unavailable")
  ctx.scale(scale, scale)

  // Solid white background so PNGs aren't transparent (site is fixed light theme).
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)

  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      resolve()
    }
    img.onerror = reject
    img.src = dataUrl
  })

  return canvas
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

type MermaidProps = {
  code: string
  className?: string
}

const MIN_SCALE = 0.2
const MAX_SCALE = 8
const SCALE_STEP = 1.25

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function Mermaid({ code, className }: MermaidProps) {
  const reactId = useId()
  const renderId = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [pngState, setPngState] = useState<ActionState>("idle")
  const [copyState, setCopyState] = useState<ActionState>("idle")
  const [svgState, setSvgState] = useState<ActionState>("idle")

  const getSvgEl = useCallback((): SVGSVGElement | null => {
    return containerRef.current?.querySelector("svg") ?? null
  }, [])

  const flash = useCallback(
    (setter: (s: ActionState) => void, success: boolean) => {
      setter(success ? "done" : "error")
      setTimeout(() => setter("idle"), 1500)
    },
    []
  )

  const downloadPng = useCallback(async () => {
    const svgEl = getSvgEl()
    if (!svgEl) return
    setPngState("busy")
    try {
      const canvas = await svgElementToCanvas(svgEl)
      canvas.toBlob((blob) => {
        if (!blob) return flash(setPngState, false)
        triggerDownload(blob, `diagram-${Date.now()}.png`)
        flash(setPngState, true)
      }, "image/png")
    } catch (err) {
      console.error("Mermaid PNG export failed:", err)
      flash(setPngState, false)
    }
  }, [getSvgEl, flash])

  const copyPng = useCallback(async () => {
    const svgEl = getSvgEl()
    if (!svgEl) return
    setCopyState("busy")
    try {
      const canvas = await svgElementToCanvas(svgEl)
      canvas.toBlob(async (blob) => {
        if (!blob) return flash(setCopyState, false)
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
          flash(setCopyState, true)
        } catch (err) {
          console.error("Clipboard write failed:", err)
          flash(setCopyState, false)
        }
      }, "image/png")
    } catch (err) {
      console.error("Mermaid copy failed:", err)
      flash(setCopyState, false)
    }
  }, [getSvgEl, flash])

  const downloadSvg = useCallback(() => {
    const svgEl = getSvgEl()
    if (!svgEl) return
    setSvgState("busy")
    try {
      const serialized = new XMLSerializer().serializeToString(svgEl)
      const blob = new Blob([serialized], { type: "image/svg+xml" })
      triggerDownload(blob, `diagram-${Date.now()}.svg`)
      flash(setSvgState, true)
    } catch (err) {
      console.error("Mermaid SVG export failed:", err)
      flash(setSvgState, false)
    }
  }, [getSvgEl, flash])

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          securityLevel: "strict",
        })

        const { svg: rendered } = await mermaid.render(renderId, code)
        if (cancelled) return
        setSvg(rendered)
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Failed to render diagram")
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [code, renderId])

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
        <p className="font-medium">Mermaid render error</p>
        <pre className="mt-2 overflow-x-auto text-xs">{error}</pre>
      </div>
    )
  }

  const toolbarBtn =
    "h-7 px-2 text-xs gap-1 [&_svg]:size-3"

  return (
    <>
      <div
        className={cn(
          "group relative my-6 overflow-x-auto rounded-lg border bg-muted/30 p-4",
          className
        )}
      >
        <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            aria-label="Expand diagram"
            title="Expand"
            className={toolbarBtn}
          >
            <Maximize2 />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyPng}
            disabled={copyState === "busy" || !svg}
            aria-label="Copy as PNG"
            title="Copy as PNG"
            className={toolbarBtn}
          >
            {copyState === "done" ? <Check /> : <Copy />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={downloadPng}
            disabled={pngState === "busy" || !svg}
            aria-label="Download PNG"
            title="Download PNG"
            className={toolbarBtn}
          >
            {pngState === "done" ? <Check /> : <FileImage />} PNG
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={downloadSvg}
            disabled={svgState === "busy" || !svg}
            aria-label="Download SVG"
            title="Download SVG"
            className={toolbarBtn}
          >
            {svgState === "done" ? <Check /> : <Download />} SVG
          </Button>
        </div>

        {svg ? (
          <div
            ref={containerRef}
            role="img"
            aria-label="Diagram"
            className="flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : null}
      </div>

      {isOpen && svg ? <MermaidLightbox svg={svg} onClose={() => setIsOpen(false)} /> : null}
    </>
  )
}

type LightboxProps = {
  svg: string
  onClose: () => void
}

function MermaidLightbox({ svg, onClose }: LightboxProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [initialScale, setInitialScale] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)
  const [transitionsEnabled, setTransitionsEnabled] = useState(false)

  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const pointerId = useRef<number | null>(null)

  // Fit-to-viewport on open: measure synchronously (before paint), apply the
  // final transform DIRECTLY to the DOM, then flip `ready` so the panel becomes
  // visible. This avoids the user ever seeing an intermediate frame and bypasses
  // any CSS transition that could animate from the placeholder scale.
  useLayoutEffect(() => {
    const panel = panelRef.current
    const viewport = viewportRef.current
    if (!panel || !viewport) return

    const svgEl = panel.querySelector("svg")
    if (!svgEl) return

    svgEl.removeAttribute("style")

    const panelRect = panel.getBoundingClientRect()
    const vw = viewport.clientWidth
    const vh = viewport.clientHeight
    if (panelRect.width === 0 || panelRect.height === 0) return

    const fit = Math.min((vw * 0.9) / panelRect.width, (vh * 0.9) / panelRect.height)
    const next = clamp(fit, 1, 4)

    // Apply final transform synchronously to the DOM so the first painted
    // frame already shows the fitted size — no animation, no "jump".
    panel.style.transform = `translate(-50%, -50%) translate(0px, 0px) scale(${next})`

    setInitialScale(next)
    setScale(next)
    setTranslate({ x: 0, y: 0 })
    setReady(true)

    // Enable CSS transitions only after two paints, so subsequent user-driven
    // zooms animate but the initial placement does not.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setTransitionsEnabled(true))
      return () => cancelAnimationFrame(r2)
    })
    return () => cancelAnimationFrame(r1)
  }, [svg])

  const reset = useCallback(() => {
    setScale(initialScale ?? 1)
    setTranslate({ x: 0, y: 0 })
  }, [initialScale])

  // Lock body scroll + ESC to close
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "0") reset()
      else if (e.key === "+" || e.key === "=") setScale((s) => clamp(s * SCALE_STEP, MIN_SCALE, MAX_SCALE))
      else if (e.key === "-") setScale((s) => clamp(s / SCALE_STEP, MIN_SCALE, MAX_SCALE))
    }

    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose, reset])

  // Wheel: zoom toward pointer
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return
    e.preventDefault()
    const rect = viewportRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2

    const factor = Math.exp(-e.deltaY * 0.0015)
    const next = clamp(scale * factor, MIN_SCALE, MAX_SCALE)
    const ratio = next / scale

    setTranslate((t) => ({
      x: cx - (cx - t.x) * ratio,
      y: cy - (cy - t.y) * ratio,
    }))
    setScale(next)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    dragging.current = true
    pointerId.current = e.pointerId
    lastPointer.current = { x: e.clientX, y: e.clientY }
    try {
      viewportRef.current?.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }))
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (pointerId.current !== null) {
      try {
        viewportRef.current?.releasePointerCapture(pointerId.current)
      } catch {
        // ignore
      }
    }
    pointerId.current = null
    void e
  }

  const zoomIn = () => setScale((s) => clamp(s * SCALE_STEP, MIN_SCALE, MAX_SCALE))
  const zoomOut = () => setScale((s) => clamp(s / SCALE_STEP, MIN_SCALE, MAX_SCALE))

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Diagram lightbox"
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-md border border-white/15 bg-white/5 p-1 text-white backdrop-blur">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="size-8 text-white hover:bg-white/10 hover:text-white"
          >
            <Minus className="size-4" />
          </Button>
          <span className="min-w-[3.5rem] select-none text-center font-mono text-xs tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="size-8 text-white hover:bg-white/10 hover:text-white"
          >
            <Plus className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={reset}
            aria-label="Reset view"
            className="size-8 text-white hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close diagram"
          className="size-9 rounded-md border border-white/15 bg-white/5 text-white backdrop-blur hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" />
        </Button>
      </div>

      <div
        ref={viewportRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClick={(e) => {
          const panel = panelRef.current
          if (!panel) return
          const rect = panel.getBoundingClientRect()
          const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          if (!inside) onClose()
        }}
        className={cn(
          "relative size-full select-none touch-none",
          dragging.current ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ overscrollBehavior: "contain" }}
      >
        <div
          ref={panelRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-lg bg-background p-6 shadow-2xl [&>svg]:max-w-none [&>svg]:h-auto"
          style={{
            // Until measurement completes the panel is invisible; the inline
            // transform applied imperatively in useLayoutEffect supplies the
            // first painted frame at the correct scale.
            visibility: ready ? "visible" : "hidden",
            transform: ready
              ? `translate(-50%, -50%) translate(${translate.x}px, ${translate.y}px) scale(${scale})`
              : undefined,
            transformOrigin: "center center",
            transition:
              transitionsEnabled && !dragging.current
                ? "transform 80ms ease-out"
                : "none",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 select-none rounded-md border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/70 backdrop-blur">
        drag to pan · scroll to zoom · <kbd className="font-sans">esc</kbd> to close
      </div>
    </div>
  )
}
