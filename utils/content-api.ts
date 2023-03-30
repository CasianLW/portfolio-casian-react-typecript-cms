import { Service, Project, Seo } from '@/cas-types'
import fs from 'fs'
import { join } from 'path'

const contentPagesDirectory = join(process.cwd(), '_content/pages')
// const contentProjectsDirectory = join(process.cwd(), '_content/projects')
// const contentServicesDirectory = join(process.cwd(), '_content/services')

export const getPageSeoBySlug: (slug: string) => Seo = (slug) => {
  const realSlug = slug.replace(/\.json$/, '')

  const fullPath = join(contentPagesDirectory, `${realSlug}.json`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const pageData = JSON.parse(fileContents)

  const seo = pageData.seo

  return seo
}

// // projets

// export const getProjectByFileName: (fileName: string) => Project = (fileName) => {
//   const fullPath = join(contentProjectsDirectory, fileName)

//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   const fileData = JSON.parse(fileContents)

//   const { title, liens, primaryImage, secondaryImage, description, seo, order } = fileData
//   const slug = fileName.replace(/\.json$/, '')
//   // const methods = fileData.methods.map((s: { method: string }) => s.method)
//   const methods = fileData.methods.map((g: { method: string }) => g.method)

//   // const methods = fileData.methods.map((g: { method: string }) => g.method)

//   const project: Project = {
//     title,
//     methods,
//     description,
//     primaryImage,
//     secondaryImage,
//     slug,
//     liens,
//     order,
//     seo,
//   }

//   return project
// }

// // get the file paths of all available list of Projects
// export const getProjectsSlugs: () => string[] = () =>
//   fs.readdirSync(contentProjectsDirectory).map((fileName) => fileName.replace(/\.json$/, ''))

// // getting all projects
// export const getAllProjects: () => Project[] = () => {
//   // add paths for getting all Projects
//   const filesNames = fs.readdirSync(contentProjectsDirectory)

//   // get the Projects from the filenames with the needed fields sorted by date in descending order
//   const projects = filesNames
//     .map((fileName) => getProjectByFileName(fileName))

//     .sort((f1, f2) => {
//       if (f1.order === f2.order) return f1.title.localeCompare(f2.title)
//       return f1.order - f2.order
//     })

//   // return the available Projects
//   return projects
// }

// // services

// // export const getServiceByFileName: (fileName: string) => Service = (fileName) => {
// //   const fullPath = join(contentServicesDirectory, fileName)

// //   const fileContents = fs.readFileSync(fullPath, 'utf8')

// //   const fileData = JSON.parse(fileContents)

// //   const { title, liens, primaryImage, secondaryImage, description, seo, order } = fileData
// //   const slug = fileName.replace(/\.json$/, '')
// //   // const categorys = fileData.categorys.map((s: { category: string }) => s.category)
// //   const categories = fileData.categories.map((g: { categorie: string }) => g.categorie)

// //   // const methods = fileData.methods.map((g: { method: string }) => g.method)

// //   const service: Service = {
// //     title,
// //     description,
// //     primaryImage,
// //     slug,
// //     order,
// //     categories,
// //   }

// //   return service
// // }
// // get all services
// // export const getAllServices: () => Service[] = () => {
// //   // add paths for getting all Services
// //   const filesNames = fs.readdirSync(contentServicesDirectory)

// //   // get the Projects from the filenames with the needed fields sorted by date in descending order
// //   const services = filesNames
// //     .map((fileName) => getProjectByFileName(fileName))

// //     .sort((f1, f2) => {
// //       if (f1.order === f2.order) return f1.title.localeCompare(f2.title)
// //       return f1.order - f2.order
// //     })

// //   // return the available Projects
// //   return services
// // }
