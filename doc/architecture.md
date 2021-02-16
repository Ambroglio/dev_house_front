# Architecture of the project

## Tooling

### Code Formater

This project include a setup of [prettier](https://prettier.io/), a code formater for Javascript.
If you are using VSCode, you should install the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and activate the "Format on save" option.

### Test Frameworks (optional)

You may add some tests.

[Jest](https://jestjs.io/docs/en/getting-started.html) is already setup, you can add as many unit tests as necessary.

If you wanna add some property based tests, you can add and configure [Fast-check](https://github.com/dubzzz/fast-check)

### Type system

Javascript is a dynamically typed language without ADT or immutability (neither have Typescript).
To make Javascript more safe you could adopt different strategies:
- Use a statically typed language that compiles to Javascript, like we did with OCaml + Jsoo
- Use a type checker preprocessor like _Flow_ combined with an immutable datastructure library like _immutablejs_
- Use a library that provides good datastructures like [Sanctuary](https://sanctuary.js.org/)

We will follow the last approach during this training cause it is the less invasive one, and so the easiest to start for any project.

Santuary provides:
- a typechecker: [sanity-def](https://sanctuary.js.org/#section:type-checking)
- data type like [either](https://sanctuary.js.org/#section:either) _(similar to option)_ or [maybe](https://sanctuary.js.org/#section:maybe) _(_similar to result)_

## A solution overview

Javascript module system is weak so there is often many folder and files.

We will use thoose main modules:
- src/
    - App.js
    - server.js
    - client.js
    - app/ : _Application logic here_
        - App.css : _App CSS_
        - App.test.js : _App Tests_
        - App.js : _App component (main component of the application)_
        - action.js : _Redux Actions_
        - reducer.js : _Redux Reducer function and initial state_
        - store.js : _Redux Store_
    - pages/ : _Page components here_
        - Home/ : _sample, each page should follow this template_
            - App.js : _Home component ... should be replaced by login page_
            - Home.css : _Home CSS_
        - myPage/ : _sample, each page should follow this template_
            - App.js : _MyPage component_
            - MyPage.css : _MyPage CSS_
    - components/ : _Reusable components here_
        - simpleComponent/ : _sample, each reusable component should follow this template_
            - App.js : _SimpleComponent component_
            - SimpleComponent.test.js : _SimpleComponent test_
            - SimpleComponent.css : _SimpleComponent CSS_

Time to read [an introduction to redux](./redux.md)