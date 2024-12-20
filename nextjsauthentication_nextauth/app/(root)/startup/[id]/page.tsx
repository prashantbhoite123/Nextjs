const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return (
    <>
      <h1 className="text-3xl font-semibold">this is a startup number {id}</h1>
    </>
  )
}

export default page
