"use client"

import { X } from "lucide-react"
import Link from "next/link"

function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement
    if (form) form.reset()
  }
  return (
    <div className="flex gap-2">
      <button type="reset" onClick={reset}>
        <Link href="/" className="search-btn text-white">
          <X />   
        </Link>
      </button>
    </div>
  )
}

export default SearchFormReset
