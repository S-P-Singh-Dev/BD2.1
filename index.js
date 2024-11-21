const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let person = {
  firstName: 'Amit',
  lastname: 'Sharma',
  gender: 'male',
  age: 30,
  isMember: true,
};

function getFullName(person) {
  return person.firstName + ' ' + person.lastname;
}

function getFirstNameAndGender(person) {
  return {
    firstname: person.firstName,
    gender: person.gender,
  };
}

function getIncrementedAgePerson(person) {
  person.age += 1;
  return person;
}

function getFullnameMembership(person) {
  let fullName = getFullName(person);
  return {
    fullname: fullName,
    isMember: person.isMember,
  };
}

function getFinalPrice(cartTotal, person) {
  if (person.isMember) {
    cartTotal = cartTotal - cartTotal * (10 / 100);
    return {
      finalPrice: cartTotal.toString(),
    };
  } else {
    return {
      finalPrice: cartTotal.toString(),
    };
  }
}

function calcShippingCost(cartTotal, isMember) {
  if (isMember && cartTotal > 500) {
    return 0;
  } else {
    return 99;
  }
}

app.get('/person', (req, res) => {
  res.json(person);
});

app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

app.get('/person/firstname-gender', (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

app.get('/person/increment-age', (req, res) => {
  let incrementedAgePerson = getIncrementedAgePerson(person);
  res.json(incrementedAgePerson);
});

app.get('/person/fullname-membership', (req, res) => {
  let fullnameMembership = getFullnameMembership(person);
  res.json(fullnameMembership);
});

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person);
  res.json(finalPrice);
});

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = calcShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
