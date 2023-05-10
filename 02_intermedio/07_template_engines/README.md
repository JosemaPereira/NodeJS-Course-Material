# :computer: Modulo 7: Template Engines

## :book: Objetivo

- Conocer el concepto de template engines
- Crear una pagina básica usando PUG

## :books: Temas

### Templete Engines

Un Template engine permite utilizar archivos de plantillas estáticas en una aplicación. En tiempo de ejecución, el engine reemplaza las variables en el archivo de plantilla con valores reales y transforma la plantilla en un archivo HTML enviado al cliente. Este enfoque facilita el diseño de una página HTML.

Algunos motores de plantillas populares que funcionan con Express son Pug, Moustache y EJS. El generador de aplicaciones Express usa Jade por defecto, pero también es compatible con varios otros.

### PUG (JADE)

PUG, antes conocido como JADE es uno de los templete engines mas utilizados ya que provee de una sintaxis de fácil aprendizaje.
Durante este modulo estaremos explorando los conceptos básicos de PUG.

#### Instalación  

PUG provee un paquete el cual es muy fácil integrar a nuestros proyectos en NodeJS/Express. La instalación se da con el comando

```bash
npm install pug --save
```

La estructura básica de un archivo template es el siguiente

```jade
html
  head
    title= title
  body
    h1= message
```

## :mag: Para saber más

- [Templete Engines](https://expressjs.com/en/guide/using-template-engines.html)
- [PUG Tutorial](https://dev.to/nkratzmeyer/html-templating-with-pugjs-7m9)
