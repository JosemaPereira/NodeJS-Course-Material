# :computer: Modulo 8: Database Integration

## :book: Objetivo

- Conocer las diferencias entre SQL y NoSQL
- Configuración básica de una conexión a una base de datos

## :books: Temas

### Database integration

Express ofrece la capacidad de poder conectarse a una variedad de base datos simplemente importando los controladores adecuados para NodeJS.

Existen dos tipos de base da datos: SQL y NoSQL

A continuación daremos una breve explicación de en que consisten y de como es la configuración inicial para cada uno de ellos

#### SQL

SQL significa Lenguaje de consulta estructurado. Este lenguaje permite manejar la información mediante tablas y muestra un lenguaje para consultar estas tablas y otros objetos relacionados (vistas, funciones, procedimientos, etc.). La mayoría de las bases de datos como SQL Server, Oracle, PostgreSQL, MySQL, MariaDB manejan este lenguaje para manejar los datos.

Con SQL puede insertar, eliminar y actualizar datos. También puede crear, eliminar o modificar objetos de la base de datos.

Un ejemplo de integración de una base datos SQL, como lo es MySQL es el siguiente.

Se instala mediante el comando

```bash
npm install mysql
```

Y la instancia se crea de la siguiente forma

```js
import mysql from 'mysql'
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 'dbpass',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
```

#### NoSQL

NoSQL es una base de datos no relacional que almacena y accede a datos mediante valores clave. En lugar de almacenar datos en filas y columnas como una base de datos tradicional, se almacena cada elemento individualmente con una clave única. Además, una base de datos NoSQL no requiere un esquema estructurado que defina cada tabla y las columnas relacionadas. Esto proporciona un enfoque mucho más flexible para almacenar datos que una base de datos relacional.

Un ejemplo de integración de una base datos NoSQL, como lo es MongoDB es el siguiente.

Se instala mediante el comando

```bash
npm install mongodb
```

Y la instancia se crea de la siguiente forma

```js
import { MongoClient } from 'mongodb'

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err

  const db = client.db('animals')

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})
```

## :mag: Para saber más

- [NoSQL vs SQL](https://www.ibm.com/cloud/blog/sql-vs-nosql)
- [Express Database Integration](https://expressjs.com/en/guide/database-integration.html#mysql)