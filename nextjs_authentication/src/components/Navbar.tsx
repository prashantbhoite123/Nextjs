import Image from "next/image"
import Link from "next/link"

function Navbar() {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/public/logo (1).png"
            alt="logo"
            width={144}
            height={30}
          />
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
