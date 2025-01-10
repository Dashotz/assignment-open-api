# Pokemon API Documentation

## Endpoints

### 1. Get Pokemon Details
- **URL:** `/pokemon/:name`
- **Method:** GET
- **URL Params:** 
  - Required: `name=[string]`
- **Success Response:**
  - Code: 200
  - Content: Detailed Pokemon information including stats, abilities, and locations
- **Error Response:**
  - Code: 404
  - Content: Pokemon not found error page

### 2. Get Pokemon List
- **URL:** `/pokemon`
- **Method:** GET
- **Query Params:**
  - Optional: 
    - `limit=[number]` (default: 1000)
    - `offset=[number]` (default: 0)
    - `search=[string]` (default: '')
- **Success Response:**
  - Code: 200
  - Content: Paginated list of Pokemon with search and filter capabilities
- **Error Response:**
  - Code: 500
  - Content: Error loading Pokemon list 