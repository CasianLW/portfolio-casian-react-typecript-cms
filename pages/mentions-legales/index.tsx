import NavComponent, { NavLinkEnum, getPathFromNavLink } from '@/components/nav'
import SeoComponent from '@/components/shared/seo-component'
import { useNavSettingsContext } from '@/context/nav-settings-context'
import { NextPage } from 'next'

import Link from 'next/link'
import { useEffect } from 'react'

const MentionsLegales: NextPage = () => {
  const { setActiveNavLink } = useNavSettingsContext()
  const getYear = () => new Date().getFullYear()

  useEffect(() => {
    setActiveNavLink(NavLinkEnum.MentionsLegales)
  }, [setActiveNavLink])
  return (
    <>
      <SeoComponent
        seo={{
          title: 'Mentions Legales casian.fr ',
          description: 'Les differentes mentions legales du site internet casian.fr & autres informations.',
        }}
      />

      <header className="top-header lateral-space grid md:grid-cols-3">
        <section className="col-span-1 md:col-span-3">
          <h1 className="main-title">Mentions Légales</h1>
          <div className="grid sm:grid-cols-1 flex-col-reverse max-w-[600px] ">
            <h2>Développeur/Designer :</h2>
            <p>Casian Ciorba</p>

            <h2>Hébergeur du site :</h2>
            <p>Site hébergé par Netlify, 2325 3rd Street, Suite 296, San Francisco, California 94107, USA.</p>

            <h2>Textes :</h2>
            <p>Casian Ciorba - Développeur Fullstack / mobile & UX UI Designer</p>

            <p>En accédant et en utilisant ce site, vous acceptez les conditions générales et les mentions légales.</p>

            <h2>Propriété intellectuelle :</h2>
            <p>Ce site est la propriété exclusive de Casian Ciorba - Développeur/Designer.</p>

            <p>
              La structure générale du site, ainsi que les logiciels, textes, images animées ou non, sons, savoir-faire
              et tous les autres éléments qui le composent sont protégés par le droit de la propriété intellectuelle.
            </p>

            <p>
              Toute reproduction totale ou partielle de ce site ou de l&apos;un de ses éléments, que ce soit par une
              personne physique ou morale, sans autorisation expresse de l&apos;éditeur du site, constitue une
              contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>

            <p>
              Les bases de données éventuellement présentes sur le site sont également protégées par les dispositions de
              la loi du 1er juillet 1998 portant transposition dans le Code de la Propriété Intellectuelle de la
              directive européenne du 11 mars 1996 relative à la protection juridique des bases de données.
            </p>

            <p>
              Toutes les marques et logos figurant sur le site sont des marques déposées et protégées par les
              dispositions du Livre VII du Code de la Propriété Intellectuelle.
            </p>

            <p>
              La reproduction totale ou partielle des images, photos, modèles, marques et logos présents sur le site,
              sans autorisation expresse de l&apos;exploitant du site, est strictement interdite conformément aux
              dispositions du Code de la Propriété Intellectuelle. Aucune modification des contenus n&apos;est
              autorisée.
            </p>
            <h2>Informations sur l&apos;entreprise :</h2>
            <p>
              La société Casian Ciorba est une entreprise individuelle dirigée par Casian Ciorba, développeur/designer.
            </p>
            <br />
            <p>
              Pour toute question ou demande d&apos;autorisation, veuillez nous contacter via le notre page de contact :
            </p>
            <Link className="contact-btn md:w-1/3 mt-6 mb-14" href={getPathFromNavLink(NavLinkEnum.Contact)}>
              Contact
            </Link>
          </div>
          <p>COPYRIGHT © CASIAN {getYear()}</p>
        </section>
      </header>
    </>
  )
}

export default MentionsLegales
