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
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-10'}
        title={'Tout'}
      />

      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-831'}
        title={'Development'}
      />
      <FilterBtnComponent
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        id={'PC-12'}
        title={'UX/UI Design'}
      />
      <FilterBtnComponent
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
