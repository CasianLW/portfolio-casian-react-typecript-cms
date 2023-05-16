import { FC } from 'react'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { AdminNavSettingsProvider } from '@/context/admin-nav-settings-context'
import AdminNavComponent from '@/components/nav/admin'
import NetlifyDeployButton from '@/components/admin/shared/netlifyDeployButton'

interface Props {
  children: JSX.Element
  session?: Session
}

const AdminLayoutComponent: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <AdminLayoutContent session={session}>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}

export default AdminLayoutComponent

const AdminLayoutContent: FC<Props> = ({ children }) => {
  const { data: sessionData } = useSession()

  return (
    <div className="block lg:flex top-header lateral-space ">
      <AdminNavSettingsProvider>
        <div className="w-fit mx-auto block  ">
          <AdminNavComponent />
          <div style={{ marginBottom: '20px', maxWidth: '180px' }}>
            <NetlifyDeployButton />
          </div>
          {sessionData?.user && (
            <div className="w-auto mx-auto -mt-10 mb-5 text-center">
              <button onClick={() => signOut()}>Se déconnecter</button>
            </div>
          )}
        </div>
        <div className="w-full">{children}</div>
      </AdminNavSettingsProvider>
    </div>
  )
}

// import { FC } from 'react'

// import { AdminNavSettingsProvider } from '@/context/admin-nav-settings-context'
// import AdminNavComponent from '@/components/nav/admin'

// import { SessionProvider, signOut, useSession } from 'next-auth/react'
// import { Session } from 'next-auth'

// interface Props {
//   children: JSX.Element
//   session: Session
// }

// const AdminLayoutComponent: FC<Props> = ({ children }) => {
//   const { data: session } = useSession()

//   return (
//     <SessionProvider>
//       <div className="block lg:flex top-header lateral-space ">
//         {session?.user && (
//           <div>
//             <button onClick={() => signOut()}>Se déconnecter</button>
//           </div>
//         )}
//         <AdminNavSettingsProvider>
//           <div className="w-fit mx-auto">
//             <AdminNavComponent />
//           </div>
//           <div className="w-full">{children}</div>
//         </AdminNavSettingsProvider>
//       </div>
//     </SessionProvider>
//   )
// }

// export default AdminLayoutComponent
