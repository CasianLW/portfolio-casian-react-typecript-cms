import React, { useState, useEffect, useRef, FC } from 'react'

const ProjectFilterComponent: FC = () => {
  const [selected, setSelected] = useState('all')
  const devBtn = useRef<HTMLAnchorElement>(null)
  const uxuiBtn = useRef<HTMLAnchorElement>(null)
  const graphicBtn = useRef<HTMLAnchorElement>(null)
  const allBtn = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const mavar = (event.target as HTMLAnchorElement).id
      setSelected(mavar)
    }
    const filterSelector = document.querySelector<HTMLElement>('.filter-selector')
    if (filterSelector) {
      filterSelector.addEventListener('click', handleClick)
      return () => {
        filterSelector.removeEventListener('click', handleClick)
      }
    }
  }, [])

  useEffect(() => {
    if (devBtn.current) {
      if (selected === 'dev') {
        devBtn.current.classList.add('btn-filter-on')
        uxuiBtn.current.classList.remove('btn-filter-on')
        graphicBtn.current.classList.remove('btn-filter-on')
        allBtn.current.classList.remove('btn-filter-on')
      } else {
        devBtn.current.classList.remove('btn-filter-on')
      }
      if (selected == 'dev') {
        console.log('dev on')
        devBtn.current.classList.add('btn-filter-on')
        uxuiBtn.current.classList.remove('btn-filter-on')
        graphicBtn.current.classList.remove('btn-filter-on')
        allBtn.current.classList.remove('btn-filter-on')
      } else if (selected == 'uxui') {
        console.log('ux on')
        devBtn.current.classList.remove('btn-filter-on')
        uxuiBtn.current.classList.add('btn-filter-on')
        graphicBtn.current.classList.remove('btn-filter-on')
        allBtn.current.classList.remove('btn-filter-on')
      } else if (selected == 'graphic') {
        console.log('graphic on')
        devBtn.current.classList.remove('btn-filter-on')
        uxuiBtn.current.classList.remove('btn-filter-on')
        graphicBtn.current.classList.add('btn-filter-on')
        allBtn.current.classList.remove('btn-filter-on')
      } else if (selected == 'all') {
        console.log('all on')
        devBtn.current.classList.remove('btn-filter-on')
        uxuiBtn.current.classList.remove('btn-filter-on')
        graphicBtn.current.classList.remove('btn-filter-on')
        allBtn.current.classList.add('btn-filter-on')
      } else {
      }
    }
  }, [selected])

  return (
    <div className="filter-selector mt-10 w-4/5 m-auto flex justify-between flex-wrap">
      {/* <a id="dev" ref={devBtn} className="">
        Development
      </a>
      <a id="uxui" ref={uxuiBtn} className="">
        UX/UI Design
      </a>
      <a id="graphic" ref={graphicBtn} className="">
        Graphic Design
      </a> */}
      <FilterBtnComponent id={'all'} title={'Tout'} refBtn={allBtn} defaultActive={true} />
      <FilterBtnComponent id={'dev'} title={'Development'} refBtn={devBtn} />
      <FilterBtnComponent id={'uxui'} title={'UX/UI Design'} refBtn={uxuiBtn} />
      <FilterBtnComponent id={'graphic'} title={'Graphic Design'} refBtn={graphicBtn} />
    </div>
  )
}

export default ProjectFilterComponent

interface btnProps {
  id: string
  title: string
  refBtn: React.RefObject<HTMLAnchorElement>
  defaultActive?: boolean
}
const FilterBtnComponent: FC<btnProps> = ({ id, title, refBtn, defaultActive = false }) => {
  return (
    <a id={id} ref={refBtn} className={defaultActive ? ' btn-filter-on ' : ''}>
      {title}
    </a>
  )
}
