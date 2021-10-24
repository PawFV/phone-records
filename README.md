# Phone Records

## Introduction

I don't have much experience with Vue 3, so most of my first choice libraries for Vue 2 where not really available or bug free for this version, so I had to spend more time setting up the project/dev tools, etc...

### UI Framework

For doing the test I picked a new UI framework [PrimeVUE](https://primefaces.org/primevue/showcase/#/). This is my first time using it but the experience was positive overall, there are some downsides as the docs for some features are super overloaded and are hard to read, but the pros is that it's really well designed and most features work really well.

### Server

I decided to implement a real Nodejs server, you can find it under `server` folder. It's simply serving the REST API and using [lowdb](https://github.com/typicode/lowdb) which is a local JSON database for simplicity purposes. [faker](https://www.npmjs.com/package/faker) is being used for generating mock data.

### API

Api you can find this isolated module under `src/api`.

### TypeScript

The project was done entirely with TypeScript, you can see the `types` directory which is used in both client and server.

### Tests 

I added a couple of e2e and unit tests I didn't really dived much into it as this wasn't required.


## Project setup
```
npm install
cd server && npm install
```

### Compiles and hot-reloads for development
```
npm run serve
cd server && npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
