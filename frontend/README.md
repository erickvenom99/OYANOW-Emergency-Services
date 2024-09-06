# React + TypeScript + Vite

# Things to Install before you begin

- Vite `npm install vite`
- Typescript
- Bootstrap
- Tailwind
- Axios
- Mongodb
- HERE MAPS API:
  Run these commands
  ```
  npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
  npm install @here/maps-api-for-javascript
  npm install --save-dev webpack webpack-cli
  npm install --save-dev typescript ts-loader
  ```

---

## How To Setup |

---

# On the Frontend

- When prompted select Typescript as part of the installation
- Install Bootstrap Using the command:
- Install Axios Using the command:

# On the Backend

- Run npm install to install all required dependencies
- Ensure you have mongodb setup and installed
- Install Axios Using The Command:

---

## Start The Application |

`npm run dev`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
