const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const data = [
  { id: 1, name: 'name-1' },
  { id: 2, name: 'name-2' },
  { id: 3, name: 'name-3' },
  { id: 4, name: 'name-4' },
  { id: 5, name: 'name-5' },
];

app.patch("/items/:itemId", (req, res) => {
  const { itemId } = req.params;

  const elem = data.find(e => e.id == itemId);
  if (!elem) {
    return res.status(400).send({
      message: `Elem with id:${itemId} not found`
    })
  }

  const { name } = req.body;

  elem.name = name;

  return res.status(200).send(elem);

})

app.post("/items", (req, res) => {
  const { id, name } = req.body;
  const exists = data.find(e => e.id == id);

  if (exists) {
    return res.status(400).send({ message: `Elem with id:${id} already exists` });
  }

  if (name.length == 0) {
    return res.status(400).send({ message: `Name of item can be empty string` });
  }

  const elem = { id, name };
  data.push(elem);

  return res.status(200).send(elem);
})

app.get("/items", (req, res) => {

  const { ids = "" } = req.query;
  const parsedIds = ids.split(',')
    .map(e => parseInt(e, 10))
    .filter(e => !isNaN(e));
  const result = data.filter(elem => {
    if (parsedIds.length) {
      return parsedIds.includes(elem.id);
    }

    return true;
  });
  return res.status(200).send(result);

  // if (ids) {

  //   const parsedIds = ids.split(',').map(e => parseInt(e, 10));

  //   const result = data.filter(elem => parsedIds.includes(elem.id));
  //   return res.status(200).send(result)
  // }

  // return res.status(200).send(data)
})

app.listen(8080, () => {
  console.log("server was started");
})
console.log("This is server");