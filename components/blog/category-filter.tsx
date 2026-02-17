"use client"

import Link from "next/link"
import { useRef } from "react"

import { categoryToSlug } from "@/lib/blog"
import { cn } from "@/lib/utils"

type CategoryFilterProps = {
  categories: string[]
  selectedCategory?: string
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLElement>(null)

  const isDown = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const dragging = useRef(false)
  const pointerId = useRef<number | null>(null)

  const DRAG_THRESHOLD = 6
  const SPEED = 1.2

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (!scrollRef.current) return

    isDown.current = true
    dragging.current = false
    pointerId.current = e.pointerId

    startX.current = e.pageX
    startScrollLeft.current = scrollRef.current.scrollLeft
  }

  const endDrag = () => {
    isDown.current = false

    if (scrollRef.current && pointerId.current !== null) {
      try {
        scrollRef.current.releasePointerCapture(pointerId.current)
      } catch {
        // ignore
      }
    }

    pointerId.current = null

    // mantém o "dragging" true até depois do click ser disparado
    requestAnimationFrame(() => {
      dragging.current = false
    })
  }

  const onPointerUp = () => endDrag()
  const onPointerCancel = () => endDrag()
  const onPointerLeave = () => {
    // se estiver com capture ativo, continuará recebendo move
    // então não finalize aqui; finalize via up/cancel
  }

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDown.current || !scrollRef.current) return

    const delta = e.pageX - startX.current

    // só vira drag após threshold; aí capturamos o ponteiro
    if (!dragging.current && Math.abs(delta) >= DRAG_THRESHOLD) {
      dragging.current = true
      try {
        scrollRef.current.setPointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }

    if (!dragging.current) return

    e.preventDefault()
    scrollRef.current.scrollLeft = startScrollLeft.current - delta * SPEED
  }

  const items = [
    { label: "All", slug: null as string | null },
    ...categories.map((category) => ({
      label: category,
      slug: categoryToSlug(category),
    })),
  ]

  return (
    <nav
      ref={scrollRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      className="
        overflow-x-auto
        border-b
        
        [scrollbar-width:none]
        cursor-grab
        active:cursor-grabbing
        select-none
      "
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
    >
      <ul className="flex min-w-max items-center text-sm">
        {items.map((item) => {
          const isActive =
            item.slug === null ? !selectedCategory : selectedCategory === item.label

          return (
            <li key={item.slug ?? "all"} className="mx-2 shrink-0">
              <Link
                draggable={false}
                href={
                  item.slug ? { pathname: "/blog", query: { category: item.slug } } : "/blog"
                }
                onClick={(e) => {
                  if (dragging.current) e.preventDefault()
                }}
                className={cn(
                  "inline-block border-b-2 border-transparent pb-1 text-muted-foreground transition-all hover:text-foreground select-none",
                  isActive && "border-foreground font-medium text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
