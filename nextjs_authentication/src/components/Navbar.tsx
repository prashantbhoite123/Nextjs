import Image from "next/image"
import Link from "next/link"
import { auth, signOut, signIn } from "../../auth"
import { redirect } from "next/dist/server/api-utils"

const Navbar = async () => {
  const session = await auth()
  return (
    <div className="px-5 py-10 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            // src="/public/logo (1).png"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRePu3All1x39UPUSTrkf615-S8En6v-PMrCQb_dFAo9YGdRihtAlvAfDPtyNcvXW7m0Fw&usqp=CAU"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <div className="flex items-center justify center mt-52 gap-5 text-black">
          {session && session?.user ? (
            <div className="flex justify-between items-center">
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
