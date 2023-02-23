import { Seo } from '@/cas-types'
import NavComponent, { NavLinkEnum } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { getPageSeoBySlug } from '@/utils/content-api'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

interface Props {
  seo: Seo
}

const AdminPage: NextPage<Props> = () => {
  const [formData, setFormData] = useState({
    seoTitle: '',
    seoDescription: '',
    title: '',
    slug: '',
    description: '',
    imgLink: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error' | 'idle'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/works/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
        },
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        coverImage: formData.imgLink,
      }),
    })

    if (response.ok) {
      // Handle success
      setSubmitStatus('success')
      setFormData({
        seoTitle: '',
        seoDescription: '',
        title: '',
        slug: '',
        description: '',
        imgLink: '',
      })
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    } else {
      // Handle error
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  const alertComponent = () => {
    switch (submitStatus) {
      case 'submitting':
        return <div className="alert alert-info">Submitting form...</div>
      case 'success':
        return <div className="alert alert-success">Form submitted successfully!</div>
      case 'error':
        return <div className="alert alert-danger">Form submission failed. Please try again later.</div>
      default:
        return null
    }
  }
  return (
    <>
      <SeoComponent seo={{ title: 'Admin Dashboard', description: 'Admin dashboard' }} />
      <header className="top-header lateral-space">
        <h1 className="main-title">AdminPage</h1>
        <form className="mt-10" onSubmit={handleSubmit}>
          <h2>Ajouter un projet</h2>
          <div className="grid">
            <label htmlFor="title">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </div>
          <div className="grid">
            <label htmlFor="slug">Slug</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} />
          </div>
          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleInputChange} />
          </div>
          <div className="grid">
            <label htmlFor="imgLink">Lien image</label>
            <input required name="imgLink" value={formData.imgLink} onChange={handleInputChange} />
          </div>
          <div className="my-10">
            <h3>Seo settings:</h3>
            <div className="grid">
              <label htmlFor="seoTitle">Titre seo</label>
              <input required name="seoTitle" value={formData.seoTitle} onChange={handleInputChange} />
            </div>
            <div className="grid">
              <label htmlFor="seoDescription">Description seo</label>
              <input required name="seoDescription" value={formData.seoDescription} onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit">Enregistrer projet</button>
        </form>
        {alertComponent()}
      </header>
    </>
  )
}

export default AdminPage