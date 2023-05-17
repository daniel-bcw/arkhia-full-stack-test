# Backend to fetch the best Exchange provider.
The project will with `4000` port by default.
So `http://localhost:4000/exchange?currency=USD&coinId=bitcoin` should be called to get data.

## Table of Content:
- [APIs](#apis)
- [Technologies](#technologies)
- [Install](#install)
- [Run](#run)

## APIs
* GET /exchange?currency={currency}&coinId={coinId}
```
Example:
* GET /exchange?currency=USD&coinId=bitcoin

Respose
"Cryptonex"
```

## Technologies
`Node.js`, `Express.js`, `Typescript`

## Install
- Download or clone the repository
- Run `npm install`

## Run
- Run `npm run dev` to see the app running locally
