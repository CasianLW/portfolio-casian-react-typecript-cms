import { FC, useState } from 'react'

import Typewriter from 'typewriter-effect'

const TypingTextComponent: FC = () => {
  const [text, setText] = useState('')

  return (
    <h2 className="text-2xl mt-5 z-20 relative">
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            //   .typeString('<strong>UX / UI Designer')
            //   .pauseFor(2500)
            //   .callFunction(() => {
            //     console.log('ux/ui typed out!')
            //   })
            //   .pauseFor(2500)
            //   .deleteAll()
            .typeString("<strong>Création <span class='span_title'>site internet</span>")
            .pauseFor(1500)
            .deleteChars(13)
            .typeString("<strong><span style='text-decoration:underline;'>application mobile</span>")
            .pauseFor(700)
            .deleteChars(28)
            .typeString('<strong>UX / UI Designer')
            .pauseFor(1000)
            .deleteChars(16)
            .typeString('<strong>Fullstack / Mobile Developer')
            .pauseFor(1000)
            .deleteChars(28)
            .typeString("<strong>Services <span class='span_title'>webdesign</span>")
            .pauseFor(700)
            .deleteChars(9)
            .typeString("<strong><span class='span_title2'>web development</span>")
            .pauseFor(700)
            .deleteChars(24)
            .deleteChars(37)
            //   .callFunction(() => {
            //     console.log('All strings were deleted')
            //   })
            .start()
        }}
      />
    </h2>
  )
}

export default TypingTextComponent
