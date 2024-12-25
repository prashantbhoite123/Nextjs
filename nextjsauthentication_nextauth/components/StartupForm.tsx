"use client"

import { useState, useActionState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { z } from "zod"
import { formSchema } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/router"

const StartupForm = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [pitch, setPitch] = useState<string>()

  const { toast } = useToast()
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues)

      console.log(formValues)

      // const result = await createIdea(prevState, formData, pitch)

      // if (result.status === "SUCCESS") {
      //   toast({
      //     title: "Success",
      //     description: "Your startup pitch has been created Successfully",
      //   })
      // router.push(`/startup/${result.id}`)
      // }
      // return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firldErorrs = error.flatten().fieldErrors

        setErrors(firldErorrs as unknown as Record<string, string>)
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        })
        return { ...prevState, error: "Validation failed", status: "ERROR" }
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      })

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  })

  return (
    <form action={formAction} className="startup-form">
      <div className="">
        <label htmlFor="title" className="startup-form_lable">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div className="">
        <label htmlFor="description" className="startup-form_lable">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="title" className="startup-form_lable">
          Categeory
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category ( Tech, Health, Education )"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="title" className="startup-form_lable">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="title" className="startup-form_lable">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button type="submit" className="startup-form_btn " disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm
