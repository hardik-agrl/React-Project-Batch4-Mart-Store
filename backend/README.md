# Ecommerce Store API

Express + MongoDB backend for the Mart Store frontend.

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

## Product API

- `GET /api/v1/all/products` - list all products
- `GET /api/v1/one/product/:id` - get one product
- `POST /api/v1/new/product` - add a product (multipart form with image)
- `PUT /api/v1/update/product/:id` - update a product
- `DELETE /api/v1/delete/product/:id` - delete a product
- `POST /api/v1/seed/products` - add sample products for demo

## Auth API

- `POST /auth/register` - register a user
- `POST /auth/login` - login and receive JWT token
