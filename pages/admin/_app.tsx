import type { AppProps } from 'next/app'

import AdminLayoutComponent from '@/layout/admin'

const AdminApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <div className="top-10">
        <AdminLayoutComponent session={session}>
          <Component {...pageProps} />
        </AdminLayoutComponent>
      </div>
    </>
  )
}

export default AdminApp
