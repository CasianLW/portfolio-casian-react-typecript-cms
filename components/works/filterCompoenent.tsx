import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'

interface filterProps {
  defaultActive?: boolean
  projects: never[] | Dispatch<SetStateAction<never[]>> | SetStateAction<never[]> | string | any
  setFiltred: Dispatch<SetStateAction<never[]>>
  activeCategory: Dispatch<SetStateAction<string>> | string | string[]
  setActiveCategory: Dispatch<SetStateAction<string>>
}
export const FilterComponent: FC<filterProps> = ({ projects, setFiltred, activeCategory, setActiveCategory }) => {
  useEffect(() => {
    if (activeCategory === 'all') {
      setFiltred(projects)
      return
    }
    // const filtred = projects.filter((project: any) => project.category_ids.includes(activeCategory))
    const filtred = projects.filter((project: any) => {
      const { dev, uxui, graphic, all } = project.category
      switch (activeCategory) {
        case 'dev':
          return dev
        case 'uxui':
          return uxui
        case 'graphic':
          return graphic
        case 'all':
          return all
        default:
          return false
      }
    })
    setFiltred(filtred)
  }, [activeCategory, projects, setFiltred])
  return (
    // <displayProject.Provider value={{ displayProject, setDisplayProject }}>
    <div className="filter-selector mt-10 w-4/5 m-auto flex justify-between flex-wrap">
      {/* <p>{{ displayProject }}</p> */}
      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'all'}
        title={'Tout'}
      />

      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'dev'}
        title={'Development'}
      />
      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'uxui'}
        title={'UX/UI Design'}
      />
      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'graphic'}
        title={'Graphic Design'}
      />
    </div>
    // <displayProject.Provider/>
  )
}

export default FilterComponent

interface btnProps {
  id: string
  title: string
  activeCategory: Dispatch<SetStateAction<string>> | string | string[]
  setActiveCategory: Dispatch<SetStateAction<string>>
}
const FilterBtnComponent: FC<btnProps> = ({ id, title, activeCategory, setActiveCategory }) => {
  return (
    <button
      onClick={() => setActiveCategory(id)}
      id={id}
      className={'px-5 py-2 hover:bg-cas-black-500 font-medium' + `${activeCategory === id ? ' btn-filter-on ' : ''}`}
    >
      {title}
    </button>
  )
}
