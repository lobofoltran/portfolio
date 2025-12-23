export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Loader */}
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />

        {/* Subtitle */}
        <span className="text-xs text-muted-foreground">
          Loading…
        </span>
      </div>
    </div>
  )
}
