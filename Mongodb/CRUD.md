# CRUD
Create, Read, Update, Delete

## Create
` db.collection.insert() `
Returns an object: `WriteResult({ "nInserted" : 1 })`, where `nInserted` is the number of document insertions. If the operation encounters an error, the `WriteResult` object will contain the error information. You can also insert an array of documents.

## Rread
`db.collection.find() `
Returns a cursor to the retrieved documents. This method receives a condition which can be one of the following:

### Equality
`{ <field>: <value> }`: Where `field` has an exact value of `value`

### AND
```mongo
{
  <field1>: <value1>,
  <field2>: <value2>
}
```

### OR
Using the `$or` operator, you can specify a compound query that joins each clause with a logical OR conjunction so that the query selects the documents in the collection that match at least one condition.
```mongo
{
  $or: [
    { <field1>: <value1> },
    { <field2>: <value2> }
  ]
}
```
## Update

## TODO:
 - cursor
 - `$gt`
 - `$lt`
