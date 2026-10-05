/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_648340500")

  // update collection data
  unmarshal({
    "name": "servicios"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_648340500")

  // update collection data
  unmarshal({
    "name": "Servicios"
  }, collection)

  return app.save(collection)
})
