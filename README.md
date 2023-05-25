# casian.fr

https://lucky-baklava-bfe6f8.netlify.app/

![Example Image](https://example.com/image.png)

This Git project is a React/Node application featuring a CRUD CMS integrated with a MongoDB database. The website is styled using Tailwind and incorporates TypeScript for type checking. In addition, Framer Motion is utilized for managing animations.
Visitors can access the front pages of the website, while admins can manage works, services, and other page settings via the protected CMS, which requires login credentials.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Project Build Steps](#project-build-steps)

## Installation

Instructions for installing the project.

1. Download the git
2. Run `npm install` to get modules
3. Run `npm run dev`to launch project

## Usage

Instructions for using the project.

## Contributing

Instructions for contributing to the project, including guidelines for pull requests and code reviews.

## Contact

Casian.C
casian.fr

## Acknowledgements

If you want to give credit to anyone who helped with the project, you can do so here.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](LICENSE.md).

## Project build steps

### Init project

<details>
<summary>How to init project?</summary>
<br>
This is how you dropdown.

1.  `npx create-next-app@latest project-name --typescript`

1.  `cd project-name`

1.  `npm install -D tailwindcss postcss autoprefixer`

1.  `npx tailwindcss init -p ` (The -p flag generates a postcss.config.js file in addition to the tailwind.config.js file.)

1.  Options tailwind.config.js (can be found on Tailwindcss website)(add content configs):

```javascript
/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

1. Add the baseUrl and paths fields to the tsconfig.json file to achieve relative paths starting with @/ for imports.
<details>
<summary>See tsconfig.json</summary>
<br>

```
{

  "compilerOptions": {

    "target": "es5",

    "lib": ["dom", "dom.iterable", "esnext"],

    "allowJs": true,

    "skipLibCheck": true,

    "strict": true,

    "forceConsistentCasingInFileNames": true,

    "noEmit": true,

    "esModuleInterop": true,

    "module": "esnext",

    "moduleResolution": "node",

    "resolveJsonModule": true,

    "isolatedModules": true,

    "jsx": "preserve",

    "incremental": true,

    "baseUrl": ".",

    "paths": {

      "@/*": ["*"]

    }

  },

  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],

  "exclude": ["node_modules"]

}
```

</details>

</details>

1. Replace the entire content of the styles/global.css file with these three lines:

```
@tailwind base;

@tailwind components;

@tailwind utilities;
```

(We can then delete the Home.module.css file, which is no longer needed, as well as the import import styles from '../styles/Home.module.css' in pages/index.tsx.)

<details>
<summary>.prettierrc configuration if not already done:</summary>
<br>
Add .prettierrc.rc to the project:

```
{

    "semi": false,

    "singleQuote": true,

    "trailingComma": "es5",

    "printWidth": 120,

    "tabWidth": 4

}

```

</details>

1. `npm run dev` to test if setup is working (or other line, see package.json, `npm run build` and try again if it's not working)
