import { Seo } from '@/cas-types'
import AdminNavComponent, { AdminNavLinkEnum } from '@/components/nav/admin'
import SeoComponent from '@/components/shared/seo-component'
import { useAdminNavSettingsContext } from '@/context/admin-nav-settings-context'
import AdminLayoutComponent from '@/layout/admin'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  seo: Seo
}
interface WorkInterface {
  seoTitle: string
  seoDescription: string
  title: string
  secondaryTitle: string
  slug: string
  description: string
  coverImage: string
  secondaryImage: string
  category: {
    dev: boolean
    uxui: boolean
    graphic: boolean
  }
  published: boolean
  order: number
  pointText: string
  pointList: string[]
  links: {
    website: { published: boolean; link: string }
    otherResource: { published: boolean; link: string; title: string }
  }
}

const HomepageCMS: NextPage<Props> = () => {
  const { setActiveNavLink } = useAdminNavSettingsContext()
  useEffect(() => {
    setActiveNavLink(AdminNavLinkEnum.Homepage)
  }, [setActiveNavLink])
  const [loading, setLoading] = useState(true)
  // const [actualWorksList, setActualWorksList] = useState<string[]>([])
  const [actualWorksList, setActualWorksList] = useState<{ slug: string }[]>([])

  const [worksList, setWorksList] = useState<WorkInterface[]>([])
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')
  const [messageText, setMessageText] = useState(String)
  // const [homepageWorks, setHomepageWorks] = useState<string[]>([])
  const [homepageWorks, setHomepageWorks] = useState<WorkInterface[]>([])

  const getWorksList = useCallback(async () => {
    // console.log('test du transfer')
    try {
      setSubmitStatus('submitting')
      const response = await fetch('/api/works/', {
        method: 'GET',
      })
      const responseHp = await fetch('/api/homepage/', {
        method: 'GET',
      })
      const dataHp = await responseHp.json()
      const data = await response.json()
      console.log(data)
      console.log(dataHp)
      if (response.ok && responseHp.ok) {
        // Handle success
        setSubmitStatus('success')
        setWorksList(data.works.reverse())
        setActualWorksList(dataHp.homepage[0]?.selectedWorks || [])
        console.log(dataHp.homepage)
        setLoading(false)
        // console.log(Array.isArray(worksList) + 'ies it is')

        setMessageText(data.message)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 4000)
      }
    } catch (error: any) {
      // Handle error
      // console.log(data.message)
      setSubmitStatus('error')
      setMessageText(`${error}`)

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }, [setSubmitStatus, setMessageText, setWorksList])
  useEffect(() => {
    getWorksList()
  }, [getWorksList])

  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info text-cas-white-100">Loading works ...</div>
      case 'success':
        return <div className="alert alert-success text-cas-white-100">Work list successfully imported!</div>
      case 'error':
        return <div className="alert alert-danger text-cas-white-100">{messageText}</div>
      case 'idle':
        return <div className="alert alert-danger text-cas-white-100"></div>
      default:
        return null
    }
  }
  // const handleSelectWork = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedWorkSlug = e.target.value
  //   if (homepageWorks.length >= 6 && !homepageWorks.includes(selectedWorkSlug)) {
  //     alert('You can only select up to 6 works')
  //     return
  //   }
  //   const newHomepageWorks = [...homepageWorks]
  //   if (homepageWorks.includes(selectedWorkSlug)) {
  //     const index = newHomepageWorks.indexOf(selectedWorkSlug)
  //     newHomepageWorks.splice(index, 1)
  //   } else {
  //     newHomepageWorks.push(selectedWorkSlug)
  //   }
  //   setHomepageWorks(newHomepageWorks)
  // }
  // const handleRemoveWork = (workSlug: string) => {
  //   const newHomepageWorks = [...homepageWorks]
  //   const index = newHomepageWorks.indexOf(workSlug)
  //   newHomepageWorks.splice(index, 1)
  //   setHomepageWorks(newHomepageWorks)
  // }

  const handleSelectWork = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(homepageWorks)
    console.log(worksList)
    const selectedWorkSlug = e.target.value
    const selectedWork = worksList.find((work) => work.slug === selectedWorkSlug)

    if (homepageWorks.length >= 6 && !homepageWorks.some((work) => work.slug === selectedWorkSlug)) {
      alert('You can only select up to 6 works')
      return
    }

    setHomepageWorks((prevState) => {
      const isSelected = prevState.some((work) => work.slug === selectedWorkSlug)

      if (isSelected) {
        return prevState.filter((work) => work.slug !== selectedWorkSlug)
      } else {
        if (selectedWork) {
          return [...prevState, selectedWork]
        }
        return prevState
      }
    })
  }

  const handleRemoveWork = (workToRemove: WorkInterface) => {
    setHomepageWorks((prevState) => prevState.filter((work) => work.slug !== workToRemove.slug))
  }

  const updateList = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitStatus('submitting')
    const response = await fetch('/api/homepage/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedWorks: homepageWorks,
      }),
    })
    const data = await response.json()
    console.log(response)

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setMessageText(data.message)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    } else {
      // Handle error
      // console.log(data.message)

      setSubmitStatus('error')
      setMessageText(data.message)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  return (
    <AdminLayoutComponent>
      <>
        <SeoComponent seo={{ title: 'Homepage CMS', description: 'Homepage: Slider and other settings' }} />
        <header className="top-header-admin lateral-space">
          <h1 className="main-title">Homepage</h1>
        </header>
        <section className="admin-content lateral-space ">
          {loading ? ( // Conditional rendering based on the loading state
            <div>Loading works ...</div>
          ) : (
            <form onSubmit={updateList}>
              <section className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="col-span-1">
                  <div>
                    <h2>Liste projets</h2>

                    {/* <select className="min-w-[120px]" multiple={true} value={homepageWorks} onChange={handleSelectWork}> */}
                    <select
                      className="min-w-[120px]"
                      multiple={true}
                      value={homepageWorks.map((work) => work.slug)}
                      onChange={handleSelectWork}
                    >
                      {worksList
                        ?.filter((work) => !homepageWorks.some((homepageWork) => homepageWork.slug === work.slug))
                        .map((work) => (
                          <option className="text-cas-black-600 " key={work.slug} value={work.slug}>
                            {work.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  {worksList.some(
                    (work) => !homepageWorks.some((homepageWork) => homepageWork.slug === work.slug)
                  ) ? null : (
                    <div>La liste est vide, ajoutez plus de projets</div>
                  )}
                </div>
                <div className="col-span-1">
                  <h2>Selected Works</h2>
                  <ul>
                    {[...homepageWorks].map((work) => {
                      return (
                        <li className="list-decimal" key={work.slug}>
                          {work.title}
                          <button className="text-red-500" onClick={() => handleRemoveWork(work)}>
                            Remove
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  {homepageWorks.length == 0 ? '* Selectionnez des projets' : ''}
                </div>
                <div className="col-span-1">
                  <h2>Actual Works</h2>

                  <ol type="1">
                    {[...actualWorksList].map((workSaved) => {
                      return (
                        <li className="list-decimal	py-2" key={workSaved.slug}>
                          {workSaved.slug}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </section>
              <button type="submit">Click to update</button>
            </form>
          )}
          {alertComponent()}
        </section>
      </>
    </AdminLayoutComponent>
  )
}

export default HomepageCMS
