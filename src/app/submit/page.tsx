import prisma from '@/lib/prisma'
import Form from 'next/form'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'
import { FormFields } from '@/components/FormFields'

export default function SubmitLink() {
  const createLink = async (formData: FormData) => {
    'use server'

    const title = formData.get('title')
    const link = formData.get('link')

    const result = await prisma.link.create({
      data: {
        title: formData.get('title') as string,
        link: formData.get('link') as string,
        submittedById: 1
      }
    })

    redirect(`/${result.id}`)
  }

  return (<div className="min-h-screen bg-icterine">
      <div className="page-grid">
        <div className="col-span-12 col-start-1 row-start-1">
          <h1 className="text-[375px] leading-[295px] text-cinder">
            SUBMIT <div className="outline">A Link</div>
          </h1>
        </div>
        <div className="col-span-4 col-start-8 row-start-1">
          <div className="mt-12 bg-icterine">
            <Form action={createLink}>
              <FormFields>
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" name="title" />
                </div>
                <div className="field">
                  <label htmlFor="link">Link</label>
                  <input type="url" id="link" name="link" />
                </div>
                <SubmitButton />
              </FormFields>
            </Form>
          </div>
        </div>
      </div>
    </div>)
}
