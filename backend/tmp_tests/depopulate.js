#!/usr/bin/env node
'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect('mongodb://localhost:27017/populate_test')

const carSchema = Schema({
  name: String,
  model: String
})

const personSchema = Schema({
  name: String,
  phone: String,
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  }
})

personSchema.set('toObject', { depopulate: false })

const Car = mongoose.model('Car', carSchema)
const Person = mongoose.model('Person', personSchema)

const car = new Car({
  name: 'Ford',
  model: 'Mustang'
})

const person = new Person({
  name: 'John',
  phone: '1234',
  car: car._id
})

/* SHOULD PRODUCE (works with depopulate: false):
issues: ./6313.js 
depopulated at schema level:
{ _id: 5ac77d92ccf2fc3f259509ae,
  name: 'John',
  car: { _id: 5ac77d92ccf2fc3f259509ad, name: 'Ford' },
  __v: 0 }
depopulated at doc level:
{ _id: 5ac77d92ccf2fc3f259509ae,
  name: 'John',
  car: 5ac77d92ccf2fc3f259509ad,
  __v: 0 }
issues:'
*/
async function run () {
  await Car.remove({})
  await Person.remove({})
  await car.save()
  await person.save()
  let doc = await Person.findOne({}).populate('car', 'name model').exec()
  let popDoc = doc.toObject()
  console.log('before depopulate: ', doc)
  console.log(`depopulated at schema level:`)
  console.log(popDoc)
  let dePopDoc = doc.toObject({ depopulate: true })
  console.log('depopulated at doc level:')
  console.log(dePopDoc)
  return mongoose.connection.close()
}

run()