import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { FC, useEffect, useState } from 'react'

import { ParsedUrlQuery } from 'querystring'
import WorkModel from '@/utils/mongodb/work.model'
import { IWork } from '@/@types/work'
import AdminLayoutComponent from '@/layout/admin'
import SeoComponent from '@/components/shared/seo-component'
import handler from '@/pages/api/works'
import { useRouter } from 'next/router'
import { Seo } from '@/cas-types'
import EditWorkComponent from '@/components/admin/works/editWorkComponent'

// interface Props {
//   work: IWork
// }

// type Work = {
//   _id: string
//   title: string
//   slug: string
//   coverImage: string
//   description: string
// }

// type WorkProps = {
//   work: Work
// }
interface Props {
  seo: Seo
}
export interface IWorkInfo {
  seo: {
    title: string
    description: string
  }
  category: {
    dev: boolean
    uxui: boolean
    graphic: boolean
    all: boolean
  }
  _id: string
  title: string
  slug: string
  description: string
  coverImage: string
  secondaryImage: string
  published: boolean
}
const WorkInfoPage: NextPage<Props> = () => {
  const [loading, setLoading] = useState(true)

  const [workInfos, setWorkInfos] = useState<IWorkInfo>()
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')

  const router = useRouter()
  const { id } = router.query

  console.log('Infos: ' + id)
  const getWorkInfos = async () => {
    // console.log('test du transfer')
    try {
      setSubmitStatus('submitting')
      // const res = await fetch(`http://localhost:3000/api/works/${id}`)

      const response = await fetch(`/api/works/${id}`, {
        method: 'GET',
      })
      const data = await response.json()
      // console.log(data.data)
      if (response.ok) {
        // Handle success
        setSubmitStatus('success')
        setWorkInfos(data.data)
        setLoading(false)
        // setMessageText(data.message)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 4000)
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  // function alertComponent() {
  //   throw new Error('Function not implemented.')
  // }
  useEffect(() => {
    if (router.query.id) {
      getWorkInfos()
    }
  }, [router.query.id])

  // console.log(workInfos)

  return (
    <>
      <AdminLayoutComponent>
        <>
          <SeoComponent seo={{ title: 'Works CMS', description: 'Works: Ajouter, modifier et supprimer' }} />
          <header>
            <h1 className="main-title">WorksCMS</h1>
          </header>
          {/* {alertComponent()} */}
          <main className="admin-content">
            {loading ? ( // Conditional rendering based on the loading state
              <div>Loading work page ...</div>
            ) : (
              <section className="grid gap-4 grid-cols-1 md:grid-cols-1">
                <h1>{workInfos.title}</h1>
                <h1>{workInfos.description}</h1>
                <div className="col-span-1">modify form</div>

                <EditWorkComponent dataWork={workInfos} editWorkMethod={() => getWorkInfos()} />
              </section>
            )}
          </main>
        </>
      </AdminLayoutComponent>
    </>
  )
}

export default WorkInfoPage

// interface ModifyWorkFormInterface {
//   title: string
//   children: string
//   picto: string
//   alt: string
//   textSpecial?: string
// }
// const ModifyWorkForm: FC<ModifyWorkFormInterface> = ({ title, children, textSpecial, picto, alt }) => (
//   <article className="card grid h-full content-start gap-6 bg-cwr-blue-800 ">
//     <Image className="h-[40px] md:h-[50px]" src={picto} alt={alt} />
//     <div className="block">
//       <h1 className=" mb-2 w-[60%] font-semibold md:mb-6 md:text-xl lg:w-[70%]">{title}</h1>
//       <p className="w-11/12 md:text-xl ">
//         {children} <br />
//         <span className="text-cwr-turquoise-300">{textSpecial}</span>
//       </p>
//     </div>
//   </article>
// )
