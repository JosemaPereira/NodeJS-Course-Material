# :computer: ESLint & Prettier

## :book: Objetivo

- Conocer el concepto de formateadores
- Configuración e instalación de ESlint
- Configuración e instalación de Prettier

## :clipboard: Material

Consultar en la presentación <-TODO->

## :books: Temas

### I. Formateadores y Linters

Para asegurar que el estilo de código sea uniforme en todo el proyecto se utilizan herramientas como lo son los ****formateadores****. Estos son un conjunto de reglas de estilo que orillan a que el desarrollador adopte buenas practicas de código y que su lectura sea de fácil entendimiento para cualquier desarrollador que desee trabajar en el proyecto. Entre las reglas mas comunes se encuentran el terminar cada sentencia con un punto y coma `;`, usar comillas simples `''`, usar espacios como tabulación, entre otras.

Ademas de corregir el estilo es importante no cometer errores de código, es decir,  usar una sintaxis que no sea valida y que pueda provocar errores de ejecución o compilación, dependiendo del lenguaje usado. Para esto existen los ****linters****. Los linters son una herramienta que revisa y detecta errores que puedan afectar tu código y, dependiendo del linter, pueden ofrecerte recomendaciones de como arreglar el error o incluso corregirlo por ti.

En este modulo analizaremos el linter ESlint y el formateador Prettier.

### II. ESlint

ESLint es una herramienta de código abierto enfocada en el proceso de linting para javascript. ESLint es la herramienta predominante para la tarea de limpiar código javascript tanto en el servidor (node.js) como en el navegador.

ESLint es una herramienta que puede ayudarte en:

- Mostrarte errores de sintaxis.
- Mostrarte errores cuando no se siguen buenas prácticas.
- Proveer sugerencias para mejorar tu código.
- Mantener un estilo consistente en tu código o reforzar reglas internas de tu propio equipo.

#### 1. Instalación

Tomando como base la [documentación oficial](https://eslint.org/docs/latest/user-guide/getting-started) daremos inicio la instalación de ESLint.

Creemos un directorio vacío e iniciemos un proyecto de node

```bash
mkdir eslinter-prettier && cd $_
touch index.js
npm init
```

Completamos los campos que se nos solicitan y terminamos con la inicialización del proyecto.

Ahora instalaremos el paquete en nuestras dependencias de desarrollo

```bash
npm install eslint -D
```

Para que ESLint pueda funcionar requiere un archivo de configuración, para esto ejecutamos el comando

```bash
npx eslint --init
```

Se nos pedirá que elijamos algunas opciones para poder crear una configuración inicial.
Mi recomendación la señalare con **negrita**

1. Uso que le daremos a ESLint
   1. Revisar sintaxis
   2. Revisar sintaxis y encontrar problemas
   3. **Revisar sintaxis, encontrar problemas y forzar el uso de estilos de código**
2. Tipo de módulos usados en el proyecto
   1. **JavaScript modules (import/export)**
   2. CommonJS (require/exports)
   3. Ninguno
3. Framework al que pertenece el proyecto
   1. React
   2. Vue.js
   3. **Ninguno**
4. Uso de Typescript: Si/**No**
5. Donde se ejecutará
   1. Navegador
   2. **Node**
6. Uso de estilo recomendado
   1. Usar un estilo recomendado
      1. **Airbnb**
      2. Standard
      3. Google
   2. Responder preguntas sobre tu estilo
   3. Analizar tu código
7. Formato de tu archivo de configuración
   1. JavaScript
   2. YAML
   3. **JSON**

Antes de terminar se te preguntara si deseas instalar las dependencias requeridas, elegimos que si y completamos la configuración inicial.

Al finalizar deberás tener un archivo llamado `.eslintrc.json` cuyo contenido es similar al siguiente

```json
{
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
```

#### 2. Añadiendo script

Para poder ejecutar el linter en nuestros archivos es necesario añadir los siguientes scripts a nuestro `package.json`

```json
{
   //...
      "scripts": {
         //...
         "lint": "eslint index.js",
         "lint-fix": "eslint index.js --fix"
      }
   //...
}
```

Con el script `lint` mostraremos en consola todos los errores que ESLint ha encontrado en nuestro archivo, y para repararlos de manera automática usaremos el script `lint-fix`

```bash
npm run lint
npm run lint-fix
```

#### 3. Extension de VSCode

Una manera en la que VSCode nos puede notificar en tiempo real cuando cometamos un error de linter, es instalando la [extension oficial](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### III. Prettier

Prettier es una herramienta de código abierto que nos permite aplicar un patron o estilo de formato de código en el proyecto que estamos trabajando. Esto nos ayuda a ordenar nuestro código para que sea mas fácil de leer.

La diferencia que existe entre ESLint y Prettier es que trabajo de un linter como ESLint es encontrar bugs y el de Prettier formatear el código.

#### 1. Instalación y configuración en VSCode

Para user prettier es necesario instalar la [extension oficial](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Una vez instalado procederemos a configurar nuestro entorno de trabajo.

Para asegurarse de que esta extensión se use sobre otras extensiones que podamos tener instalado, es necesario establecerla como el formateador predeterminado en la configuración de VS Code.

En Windows o Linux se usa el atajo `Shift + Ctrl + P` o en Mac con `Shift + CMD + P` para acceder al cuadro de comandos. Estando ahi elegimos `Open Settings (JSON)` y colocamos al final el siguiente código

```json
{
   // ...
   "prettier.requireConfig": true,
   "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    }
}
```

#### 2. Creando archivo de configuración

Prettier requiere un archivo de configuración en donde colocaremos las reglas de formateo que deseamos. En la raíz creamos un archivo llamado `.prettierrc.json` y colocamos el siguiente código.

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all"
}
```

Este es un set de reglas básicas que prettier tomará y buscara que se apliquen en nuestro proyecto.

#### 3. Configurando ESLint con Prettier

Para este momento es normal que existan discrepancias entre las reglas que prettier tiene declaradas en el archivo de configuración y las reglas que ESLint tiene definidas.

Para lograr que ambas herramientas coexistan, es necesario instalar el paquete `eslint-config-prettier`

```bash
npm install eslint-config-prettier -D
```

Una vez instalado, en el archivo `.eslintrc.json` añadiremos los siguientes cambios para que ESLint tome las configuraciones de Prettier y no genere conflictos.

```bash
{
   //..
   "extends": ["airbnb-base", "prettier", "plugin:prettier/recommended"],
   "plugins": ["prettier"],
}
```

## :mag: Para saber más

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Curso de ESLint y Prettier por Webtutoriales](https://www.youtube.com/playlist?list=PL_7HoiqMMaOdn9_NO7hoq6ie95qeksszX)
