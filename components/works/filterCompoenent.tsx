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
    if (activeCategory === 'PC-10') {
      setFiltred(projects)
      return
    }
    const filtred = projects.filter((project: any) => project.category_ids.includes(activeCategory))
    setFiltred(filtred)
  }, [activeCategory])
  return (
    // <displayProject.Provider value={{ displayProject, setDisplayProject }}>
    <div className="filter-selector mt-10 w-4/5 m-auto flex justify-between flex-wrap">
      {/* <p>{{ displayProject }}</p> */}
      <FilterBtnComponent
        projects={[]}
        setFiltred={setFiltred}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-10'}
        title={'Tout'}
      />

      <FilterBtnComponent
        projects={[]}
        setFiltred={setFiltred}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-831'}
        title={'Development'}
      />
      <FilterBtnComponent
        projects={[]}
        setFiltred={setFiltred}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-12'}
        title={'UX/UI Design'}
      />
      <FilterBtnComponent
        projects={[]}
        setFiltred={setFiltred}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-13'}
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
  projects: never[] | Dispatch<SetStateAction<never[]>> | SetStateAction<never[]>
  setFiltred: Dispatch<SetStateAction<never[]>>
  activeCategory: Dispatch<SetStateAction<string>> | string | string[]
  setActiveCategory: Dispatch<SetStateAction<string>>
}
const FilterBtnComponent: FC<btnProps> = ({ id, title, projects, setFiltred, activeCategory, setActiveCategory }) => {
  return (
    <button onClick={() => setActiveCategory(id)} id={id} className={activeCategory === id ? ' btn-filter-on ' : ''}>
      {title}
    </button>
  )
}
