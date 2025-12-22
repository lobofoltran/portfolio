export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Gustavo Foltran
          </p>

          <p>
            Built with Next.js · shadcn/ui · TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
