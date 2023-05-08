# :computer: Modulo 9: Mongoose

## :book: Objetivo

- Conocer las diferencias entre ODM y ORM
- Crear schemas para poblar una base de datos NoSQL

## :books: Temas

### Diferencia entre una ODM y una ORM

Existen dos tipos de configuraciones para trabajar con bases de datos:

- ORM (Object Relation Mapping)
- ODM (Object Document Mapping)

ORM convierte datos entre tipos incompatibles para ser usados en lenguajes de programación orientados a objetos. ORM envuelve los detalles específicos de implementación de los controladores de almacenamiento en una API y asigna los campos relacionales a los miembros de un objeto.

ODM, por otro lado, es un mapeador de documentos de objetos, que mapea objetos a una base de datos de documentos como MongoDB.

La principal diferencia es que ORM es para bases de datos MySQL, mientras que ODM hace el mapeo para la representación de datos en documentos.

### Moongose

Mongoose es un modulo par NodeJs para el manejo de conexiones a una base de datos NoSQL como lo es MongoDB. Proporciona una solución sencilla basada en esquemas para modelar los datos de una aplicación. Incluye conversión de tipo incorporada, validación, creación de consultas, enlaces de lógica de negocios y más, listos para usar.

Para instalar, basta con ejecutar el siguiente comando en el root de nuestro proyecto

```bash
npm install mongoose --save
```

#### Schemas

Un esquema defina la estructura que tendrá una entidad en la colección de la base de datos.

```js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

```

#### Modelos

Los modelos son constructores de instancias de un esquema. Una instancia de un modelo se le conoce como documentos. Los modelos son responsables de crear y leer documentos en una base de datos.

```js
const Post = model('Post', blogSchema);
const newPost = new Post({ title: 'Greetings', author: 'John Doe' });
newPost.save((err) => {
  if (err) throw new Error(err);
})
```

#### Queries

Para poder obtener un documento de la base de datos, mongoose nos provee un abanico de opciones para realizar consultas. A continuación colocamos la sintaxis básica para Leer, Actualizar y Borrar.

```js

// Read
Post.find({ title: 'Greetings' })
  .where('autor')
  .equals('John Doe')
  .exec((err, post) => {
    if (err) throw new Error(err);

    console.log(post);
  });

//Update
Post.updateOne(
  { title: 'Greetings' },
  { author: 'Frank Smith' },
  (err, res) => {
    if (err) throw new Error(err);
  },
);

//Delete
Post.deleteOne({ author: 'Frank Smith' }, (err) => {
  if (err) throw new Error(err);
});

```

## :mag: Para saber más

- [Mongoose](https://mongoosejs.com/docs/guides.html)
