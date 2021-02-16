# Javascript

If you are not accurate with Javascript you should take a look at thoses ressources each time you have a question:
- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference): repository of facts about the JavaScript language.
- [Eloquent Javascript](https://eloquentjavascript.net/): great ebook

## Quick tour

You can try all the code below in your browser console or with node repl.

### Bindings

```javascript
//this is a variable with string type
let weapon = 'knife';
weapon = 'hand';
//this is a reference constante with string type
const name = 'Negan';
```

### Product types

```javascript
//this is an Object. Object data structure is often used as a product type
const hero = {
  name, // puning, equivalent to name : name
  weapon,
  heart: 5,
  quote: () => 'There is always next time, I suppose', // anonymous function, a.k.a lambda
};

// we create a copy of hero with spread operator
const clone1 = { ...hero };
const clone2 = { ...hero, heart:2 }; // copy with modified heart value

console.log(`clone1 === hero ? ${clone1 === hero}`); //false : it's not the same reference. No deep equality !

// destructure hero, a pattern matching on product type
const { heart } = hero
```

### Functions

```javascript
// Expression function
const strike = hero => hero.weapon === 'spiked bat' ? 'kill' : 'hurt';

console.log(strike(clone1));

// Function with scope
const add = (x, y) => {
    console.log('this function add x to y');
    return x + y;
};
// function application
add(1,2);

// Since functions are first class
// It is easy to currify functions
const addC = x => y => x + y;
// partial application
const add1 = addC(1);
const threeIsThree = add1(2) === addC (1) (2); // true
const threeIsStillThree = add(1,2) === addC (1) (2); // true
```

Time to read [architecture](./architecture.md)