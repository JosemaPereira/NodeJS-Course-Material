# :computer: Modulo 5:  Middleware & Error handling

## :book: Objetivo

- Conocer y aplicar el concepto de Middleware
- Implementar estrategias de manejo de errores

## :books: Temas

### Middleware

Los Middleware son funciones que tienen acceso al objeto request, al objeto de respuesta y al siguiente middleware que esta declarada en el ciclo de petición-respuesta.

Los middleware pueden ejecutar las siguientes tareas:

- Ejecutar código
- Realizar cambios en los objetos de petición o respuesta
- Finalizar un ciclo de petición-respuesta
- LLamar a la siguiente función declarada como middleware
  
Existen diferentes tipos de middleware

- Middleware a nivel de aplicación
- Middleware a nivel de router
- Manejo de errores
- Middleware intermedio incorporado
- Middleware ofrecido por terceros

En este curso explicaremos el middleware a nivel de aplicación y de manejo de errores.

### Middleware a nivel de aplicación

Este tipo de middleware se vincula a una instancia del objeto `app` mediante el uso de `app.use()` y `app.METHOD()`

El siguiente ejemplo muestra un middleware que se ejecuta con cada petición hacia el app.

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Hora:', Date.now())
  next()
})
```

Los middleware a nivel de usuario se pueden ser declarados para que funcionen en determinados endpoints, como el siguiente ejemplo que afecta a cualquier tipo de petición sobre el endpoint `/user`

```js
app.use('/user', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

De la misma manera se pueden delimitar a un solo tipo de petición, el siguiente ejemplo se realiza sobre una petición `GET`

```js
app.get('/user', (req, res, next) => {
  res.send('Usuario')
})
```

### Middleware para manejo de errores

Este tipo de middleware, a diferencia del de a nivel de aplicación, recibe cuatro argumentos en lugar de tres, ya que incluye el objeto error `err`

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error!')
})
```

## :mag: Para saber más

- [Middleware en Express](https://expressjs.com/en/guide/using-middleware.html)
- [Error Handling](https://expressjs.com/en/guide/error-handling.html)