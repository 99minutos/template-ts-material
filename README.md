# Template con Material UI

Este template utiliza componentes de Material UI, por defecto se configuró un tema con los colores de `99minutos`. Tailwind CSS (v4 instalado) también está disponible para estilos utilitarios.

- [Material UI Docs](https://mui.com/): Librería de componentes React para una interfaz de usuario rápida y sencilla.
- [Tailwind CSS Docs](https://tailwindcss.com/): Libreria de estilos utilitarios.

## Estructura del template

```
.
├── public
└── src
    ├── components
    │   ├── layouts
    │   │   └── dashboard
    │   └── providers
    │       ├── app
    │       │   └── dependencies
    │       ├── auth
    │       └── http
    │           └── rest
    ├── domain
    ├── hooks
    ├── pages
    │   └── welcome
    ├── styles
    └── utils
```

- `public`: contiene recursos públicos como imágenes, etc..
- `src/components`: contiene componentes reutilizables
  - `src/components/layouts`: contiene los layouts disponibles para diferentes presentaciones de la aplicación
  - `src/components/providers`: contiene componentes de proveedores
    - `src/components/providers/app`: contiene componentes de proveedores para la aplicación
    - `src/components/providers/auth`: contiene componentes de proveedores para la autenticación
    - `src/components/providers/http`: contiene componentes de proveedores para la comunicación HTTP
- `src/domain`: contiene dominios de negocio, interfaces y tipos preferentemente
- `src/hooks`: contiene hooks personalizados
- `src/pages`: contiene páginas de la aplicación
- `src/styles`: contiene estilos personalizados
- `src/utils`: contiene utilidades personalizadas

## Inicialización del template

1. Una vez creado el repositorio desde github con base a este template, debera copiar el archivo .env.example como .env.local
2. Llene las variables de entorno en el archivo .env.local
3. Ejecute el comando `pnpm install` para instalar las dependencias del proyecto
4. Ejecute el comando `pnpm run prepare`, este comando solo debe ejecutarse una vez al clonar el repositorio, posteriormente no es necesario
5. Ejecute el comando `pnpm run dev` para iniciar el servidor de desarrollo

## src/components/custom-actions

Este componente permite renderizar elementos en la barra de título junto al logotipo
