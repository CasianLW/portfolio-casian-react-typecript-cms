import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

/* RÉCUPÉRATION DES LOGIN/PASSWORD ÉCRITS DANS LA VARIABLE D’ENVIRONNEMENT */
const { ADMIN_NAME, ADMIN_PASSWORD } = process.env

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      /* CONFIGURATION DU FORMULAIRE INTÉGRÉ PAR LE PLUGIN */
      credentials: {
        username: { label: 'Nom', type: 'text', placeholder: 'admin' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      authorize(credentials, req) {
        try {
          if (!credentials) throw new Error('No credentials')
          const { username, password } = credentials
          if (username !== ADMIN_NAME || password !== ADMIN_PASSWORD) throw new Error('Bad credentials')
          return { name: username, id: username }
        } catch (error) {
          console.log('-------------------')
          console.log('pages/api/auth/[...nextauth].ts > error >', error)
          console.log('-------------------')

          return null
        }
      },
    }),
  ],

  /* À DÉCOMMENTER SI JE VEUX UTILISER MON PROPRE FORMULAIRE DE CONNEXION */
  // pages: { signIn: '/auth/signin' },
}

export default NextAuth(authOptions)
