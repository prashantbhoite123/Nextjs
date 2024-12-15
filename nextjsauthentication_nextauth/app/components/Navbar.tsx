import Image from "next/image"
import Link from "next/link"
import { auth, signOut, signIn } from "../../auth"
import { redirect } from "next/dist/server/api-utils"

const Navbar = async () => {
  const session = await auth()
  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={10} />
        </Link>
        <div className="flex items-center  gap-5 text-black">
          {session && session?.user ? (
            <div className="flex justify-between gap-5 items-center">
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server"
                  await signOut({
                    redirectTo: "/",
                    redirect: true,
                  })
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </div>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn()
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
