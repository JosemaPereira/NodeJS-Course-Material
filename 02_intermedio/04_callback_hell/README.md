# :computer: Modulo 3:  Rest API with express

## :book: Objetivo

- Conocer

## :books: Temas

### I. Callback

Se le conoce como callback a las funciones que son pasadas como argumento a otra función. Esta es invocada dentro de la función externa como complemento a la rutina o acción.

```js

function saludo(nombre) {
  console.log(`Hola ${nombre}`)
}

function creaSaludo(nombre, callback){
  console.log("Creando saludo")
  callback(nombre)
}

creaSaludo("Wizeline Academy", saludo)
```

### II. Callback hell

Los callbacks se vuelven un problema cuando se comienza a abusar de la anidación.

Como ejemplo tenemos estas dos funciones

```js
function funcionA (done) {
  setTimeout(function () {
    done()
  }, 100)
}

function funcionB (done) {
  setTimeout(function () {
    done()
  }, 300)
}
```

En este ejemplo, vamos a intentar que se ejecuten de manera secuencial

```js
function ejecutaSecuencial (callback) {
  funcionA(() => {
    console.log("Funcion A terminada")
    funcionB(() => {
      console.log("Funcion B terminada")
    })
  })
}
ejecutaSecuencial()
```

Como podemos notar, para poder ejecutar funciones de manera secuencial estamos anidando funciones que están a la espera del termino de ejecución de la función anterior para poder ser invocadas, dando lugar a lo que se conoce como **callback hell**.

En la práctica esto puede convertir en tediosa la tarea de modificar cada uno de estos callbacks.

### III. Como evitar el Callback hell

Existen varias estrategias para evitar el callback hell. Analizaremos las mas importantes.

#### 1. Promesas

Si tomamos cada una de las funciones principales y las convertimos en promesas, podemos tener algo mas legible y fácil de mantener.

```js
function funcionA () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('funcionA terminada')
      resolve()
    }, 100)
  })
}

function funcionB () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('funcionB terminada')
      resolve()
    }, 300)
  })
}

function ejecutaAsync () {
    return Promise.all([funcionA(), funcionB()])
}

ejecutaAsync()
  .then(() => {
    console.log('Todas las operaciones han terminado')
  })
  .catch((error) => {
    console.error('Existe un error:', error)
  })

```

Las funciones originales, al convertirlas en promesas, nos permiten usar funciones nativas especificas para ellas, como lo es `Promise.all`.

Al momento de ejecutar `ejecutaAsync` también estamos regresando una promesa, por lo que podemos usar los métodos `.then` y `.catch` para manejar el resultado.

#### 2. Funciones asíncronas

El mismo problema se puede solucionar utilizando funciones asíncronas que llamen funciones que regresan una promesa.

```js
async function ejecutaAsync () {
  try{
    await funcionB()
    await funcionA()
    console.log('Todas las operaciones han terminado')
  }catch{
    console.error('Existe un error:', error)
  }
}
ejecutaAsync()
```

## :mag: Para saber más

- [Callbacks](https://nodejs.dev/en/learn/javascript-asynchronous-programming-and-callbacks/)
- [Entendiendo las promesas de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Async & Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Diferencias entre promesas y async/await](https://www.geeksforgeeks.org/difference-between-promise-and-async-await-in-node-js/)
- [Callback hell](http://callbackhell.com/)