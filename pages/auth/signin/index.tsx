import { NextPage } from 'next'
import { FormEvent, useState } from 'react'

export const SigninPage: NextPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  // const [token, setToken] = useState<string | null>(null)
  // const [error, setError] = useState<string>('no error')

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault()
  //     try {
  //       const response = await fetch('/api/auth/signin', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         //   body: JSON.stringify({ credentials }),
  //         body: JSON.stringify(credentials),
  //       })
  //       console.log(response.status)
  //       if (response.status === 200) {
  //         const { token } = await response.json()
  //         console.log('ca marche, tu est connecté', token)
  //         setToken(token)
  //         setError('null')
  //       } else {
  //         const { error } = await response.json()
  //         throw new Error(error)
  //       }
  //     } catch (error: string | any) {
  //       setError(error)
  //       console.log('ca marche pas :(', error)
  //     }
  //   }
  //   handleSubmit(e)
  // }

  return (
    <>
      <header className="top-header lateral-space">
        <h1 className="main-title">Espace Admin</h1>
      </header>
      <form typeof="POST" className="mt-40 flex flex-col w-72 m-auto" /* onSubmit={onSubmit}  */>
        <h3 className="text-2xl font-bold">Authentification</h3>
        <label className="mt-8" htmlFor="username">
          Username
        </label>
        <input
          required
          id="username"
          name="username"
          type="text"
          placeholder="your username here..."
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <label className="mt-8" htmlFor="password">
          Password
        </label>
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="your password here..."
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className="mt-8">Se connecter</button>
      </form>
    </>
  )
}

export default SigninPage
