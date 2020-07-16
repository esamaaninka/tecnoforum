#!/usr/bin/env node
'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect('mongodb://localhost:27017/populate_test')

const carSchema = Schema({
  name: String,
  model: String,
  style: String,
  year: String
})

const bikeSchema = Schema({
  name: String,
  model: String
})

const personSchema = Schema({
  name: String,
  phone: String,
  bike: {type: Schema.ObjectId, ref: 'Bike'},
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'Car'
  }]
})

// SET FALSE TO ENABLE POPULATION
personSchema.set('toObject', { depopulate: true  })

const Car = mongoose.model('Car', carSchema)
const Bike = mongoose.model('Bike', bikeSchema)
const Person = mongoose.model('Person', personSchema)

const bike = new Bike({
  name: 'Harley-Davidson',
  model: 'softail'
})

const car = new Car({
  name: 'Ford',
  model: 'Mustang',
  style: 'cabriolet',
  year: "1965"
})
const car2 = new Car({
  name: 'Chevy',
  model: 'Corvette',
  style: 'cabriolet',
  year: "1969"
})

const person = new Person({
  name: 'John',
  phone: '1234',
  bike: bike._id
  //cars: [{car._id}, {car2._id}]
})


async function run () {
  await Car.remove({})
  await Person.remove({})
  await Bike.remove({})

  await bike.save()
  await car.save()
  await car2.save()
  await person.save()

  await person.cars.push(car)
  await person.cars.push(car2)
  await person.save()


  let doc = await Person.findOne({}).populate('cars bike', 'name model').exec()
  let popDoc = doc.toObject()
  console.log(`depopulated at schema level:`)
  console.log(popDoc)
  let dePopDoc = doc.toObject({ depopulate: false })
  console.log('depopulated at doc level:')
  console.log(dePopDoc)
  return mongoose.connection.close()
}

run()