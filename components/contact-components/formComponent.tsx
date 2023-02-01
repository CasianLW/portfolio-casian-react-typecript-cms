import { FC } from 'react'

const ContectComponent: FC = () => (
  // <form>
  //   <label htmlFor="email">Email</label>
  //   <input id="email" type="email" style={{ backgroundColor: '#bcbcbc' }} className="ml-2" />
  // </form>

  <form id="contact" action="mail.php" method="post">
    <fieldset>
      <input required type="text" placeholder="Nom* " name="name" value="" autoFocus />
    </fieldset>
    <fieldset>
      <input required type="email" placeholder="Adresse mail*" name="email" value="" />
    </fieldset>
    <fieldset>
      <input required type="text" placeholder="Sujet*" name="sujet" value="" />
    </fieldset>
    <fieldset>
      <textarea required placeholder="Message..." name="message1" value=""></textarea>
    </fieldset>
    <fieldset>
      <input value="Envoyer" name="Envoyer" type="submit" id="contact-submit" data-submit="...En cours" />
    </fieldset>
  </form>
)

export default ContectComponent
