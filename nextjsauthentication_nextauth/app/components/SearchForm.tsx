import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search } from "lucide-react"

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      {query && <SearchFormReset />}
      <button type="submit" className="search-btn text-white">
        <Search  />
      </button>
    </Form>
  )
}

export default SearchForm
