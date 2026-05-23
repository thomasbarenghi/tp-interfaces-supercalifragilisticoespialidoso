const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-10 py-10 lg:py-15">{children}</div>
    </main>
  )
}

export default Main
