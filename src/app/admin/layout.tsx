import { Navbar } from "./_components/Navbar"



export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="container my-6">{children}</div>
    </>
  )
}