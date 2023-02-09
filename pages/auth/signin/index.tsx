const SigninPage = () => {
  return (
    <>
      <header className="top-header lateral-space">
        <h1 className="main-title">Espace Admin</h1>
      </header>
      <form className="mt-40 flex flex-col w-72 m-auto" action="">
        <h3 className="text-2xl font-bold">Authentification</h3>
        <label className="mt-8" htmlFor="username">
          Username
        </label>
        <input id="username" required type="text" placeholder="your user name here..." />
        <label className="mt-8" htmlFor="password">
          Password
        </label>
        <input required type="password" placeholder="your password name here..." />
        <button className="mt-8">Se connecter</button>
      </form>
    </>
  )
}

export default SigninPage
