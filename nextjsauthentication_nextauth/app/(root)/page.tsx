import Image from "next/image"
import SearchForm from "../../components/SearchForm"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"

import { STARTUP_QUERY } from "@/sanity/lib/queries"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { auth } from "@/auth"

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await auth()

  console.log(session?.id)

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params })
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Enereoreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          {" "}
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition{" "}
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  )
}

export default Home
