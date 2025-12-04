# SmartSQL Starter

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/LiquidMetal-AI/netlify-smartsql-starter)

Minimal starter template demonstrating natural language database queries using Raindrop's SmartSQL feature on Netlify.

## What It Does

SmartSQL converts natural language questions into SQL queries and executes them against your database. This demo includes a sample sales database and a chat-like interface where you can ask questions in plain English.

## Quick Start

1. **Deploy to Netlify**: Click the button above to clone this template to a new Netlify project

2. **Add Raindrop Integration**: Follow the tutorial to add the Raindrop integration to your Netlify project:
   - [Netlify Integration Tutorial](https://docs.liquidmetal.ai/tutorials/netlify-integration/)
   - This automatically sets all required environment variables

3. **Run Locally** (optional):
   ```bash
   npm install
   netlify link              # Connect to your Netlify project
   npm run dev               # Pulls env vars from Netlify automatically
   ```

That's it! Your SmartSQL app is ready to use.

## Environment Variables

When you add the Raindrop integration to your Netlify project, these environment variables are **automatically set**:

- `RAINDROP_API_KEY`
- `RAINDROP_SMARTSQL_NAME`
- `RAINDROP_APPLICATION_NAME`
- `RAINDROP_APPLICATION_VERSION`

No manual configuration needed! The integration handles everything.

## Project Structure

```
netlify-smartsql-starter/
├── netlify.toml                    # Netlify configuration
├── netlify/functions/
│   ├── seed.js                     # Seeds database with sample data
│   └── query.js                    # Handles natural language queries
└── public/
    ├── index.html                  # Query UI
    ├── style.css                   # Styling
    └── app.js                      # Client-side logic
```

## How It Works

### API Endpoints (Netlify Functions)

#### POST /.netlify/functions/seed
Seeds the database with sample sales data (customers, products, orders).

**Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "tables": ["customers", "products", "orders", "order_items"],
  "stats": {
    "customers": 10,
    "products": 20,
    "orders": 30,
    "orderItems": 59
  }
}
```

#### POST /.netlify/functions/query
Converts natural language to SQL and executes the query.

**Request:**
```json
{
  "textQuery": "Show me the top 5 customers by total order value"
}
```

**Response:**
```json
{
  "results": [...],
  "queryExecuted": "SELECT ...",
  "aiReasoning": "Converting 'top 5 customers' to SQL with ORDER BY and LIMIT",
  "format": "json"
}
```

### SmartSQL Operations

**Execute SQL (Seeding):**
```javascript
client.executeQuery.execute({
  smartSqlLocation: {
    smartSql: {
      name: process.env.RAINDROP_SMARTSQL_NAME,
      version: process.env.RAINDROP_APPLICATION_VERSION,
      application_name: process.env.RAINDROP_APPLICATION_NAME
    }
  },
  sqlQuery: "CREATE TABLE customers (...); INSERT INTO customers VALUES (...);"
})
```

**Execute Natural Language Query:**
```javascript
client.executeQuery.execute({
  smartSqlLocation: smartSqlLocation,
  textQuery: "Show me the top 5 customers by total order value"
})
```

**Check Metadata (for idempotent seeding):**
```javascript
client.getMetadata.retrieve({
  smartSqlLocation: smartSqlLocation
})
```

## Database Schema

The starter creates a relational sales database:

**customers**
- id, name, email, created_at

**products**
- id, name, price, category

**orders**
- id, customer_id, order_date, total_amount

**order_items**
- id, order_id, product_id, quantity, price

Sample data: 10 customers, 20 products, 30 orders with line items

## Example Queries

Try these natural language questions:
- "Show me the top 5 customers by total order value"
- "What is the total revenue for November 2024?"
- "Which products have been ordered more than 5 times?"
- "Show me all orders from the Electronics category"
- "What is the average order value?"
- "List customers who haven't placed any orders"

## Deployment

### Deploy to Netlify

1. Install the Raindrop integration in your Netlify project
2. Push to your connected Git repository, or use:

```bash
npm run deploy
```

The Raindrop integration automatically sets all required environment variables.

### Netlify Configuration

The `netlify.toml` file configures:
- `publish = "public"` - serves static files from public/
- `functions = "netlify/functions"` - functions directory
- API redirects from `/api/*` to `/.netlify/functions/*`

## Key Concepts

- **SmartSQL Location**: Identifies the SQL database by name, application, and version
- **sqlQuery**: Direct SQL execution for creating tables and inserting data
- **textQuery**: Natural language converted to SQL automatically
- **AI Reasoning**: Shows how the AI interpreted and converted your question
- **Idempotent Seeding**: Checks if tables exist before creating them

## Next Steps

- Modify the schema to match your domain (e.g., e-commerce, analytics, CRM)
- Add authentication to protect database access
- Implement more complex queries with JOINs and aggregations
- Add data visualization for query results
- Integrate with a real production database
