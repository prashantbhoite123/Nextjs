import React from "react"
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"

const View = async ({ id }: { id: string }) => {
  const responce = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  const { views } = responce || {}
  return (
    <div className="view-container">
      1
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views {views}</span>
      </p>
    </div>
  )
}

export default View
