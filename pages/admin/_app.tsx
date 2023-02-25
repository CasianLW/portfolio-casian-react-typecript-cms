import type { AppProps } from 'next/app'

import AdminLayoutComponent from '@/layout/admin'

const AdminApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="top-10">
        <AdminLayoutComponent>
          <Component {...pageProps} />
        </AdminLayoutComponent>
      </div>
    </>
  )
}

export default AdminApp
