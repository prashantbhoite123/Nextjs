


import Ping from "@/components/Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"

const View = async ({ id }: { id: string }) => {
  // Fetch the current views from Sanity
  const response = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  const { views: totalViews = 0 } = response || {}

  // Increment the views asynchronously
  setTimeout(async () => {
    try {
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 }) // Increment views by 1
        .commit()
    } catch (error) {
      console.error("Error updating views:", error)
    }
  }, 0) // Run the update in a non-blocking way

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  )
}

export default View
