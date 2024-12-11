import Navbar from "@/components/Navbar"
import React from "react"

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans font-semibold">
      <Navbar />
      {children}
    </main>
  )
}

export default layout
