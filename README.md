# SmartSQL Netlify Starter

A Netlify starter template demonstrating [Raindrop SmartSQL](https://docs.raindrop.ai) capabilities with database seeding and natural language query functionality.

## Features

- **Database Seeding**: Initialize a multi-table sales database with sample data
- **Natural Language Queries**: Ask questions about your data in plain English
- **AI-Powered SQL Generation**: Automatic conversion from natural language to SQL
- **Beautiful UI**: Clean, responsive interface with tab-based navigation
- **Idempotent Operations**: Safe to seed multiple times without data corruption

## Demo Schema

The starter creates a relational database with four tables:

- **customers**: Customer information (id, name, email, created_at)
- **products**: Product catalog (id, name, price, category)
- **orders**: Order records (id, customer_id, order_date, total_amount)
- **order_items**: Individual line items (id, order_id, product_id, quantity, price)

Sample data includes:
- 10 customers
- 20 products (Electronics and Furniture categories)
- 30 orders
- 59 order items

## Prerequisites

- A [Netlify](https://netlify.com) account
- A [Raindrop](https://raindrop.ai) API key
- Node.js 18+ (for local development)

## Environment Variables

The following environment variables are required:

```bash
RAINDROP_API_KEY=your_api_key
RAINDROP_SMARTSQL_NAME=your_smartsql_instance_name
RAINDROP_APPLICATION_VERSION=v1.0.0
RAINDROP_APPLICATION_NAME=netlify-smartsql-starter
```

When deployed to Netlify with the Raindrop integration, these are automatically configured. For local development, copy `.env.example` to `.env` and fill in your values.

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:8888`

## Usage

### 1. Seed the Database

Click the "Seed Database" button on the first tab to initialize your SmartSQL database with sample data. This operation is idempotent - you can click it multiple times safely.

### 2. Query Your Data

Switch to the "Query Data" tab and ask questions in natural language:

**Example Questions:**
- "Show me the top 5 customers by total order value"
- "What is the total revenue for November 2024?"
- "Which products have been ordered more than 5 times?"
- "Show me all orders from the Electronics category"
- "What is the average order value?"
- "List customers who haven't placed any orders"

The AI will:
1. Convert your question to SQL
2. Execute the query
3. Show you the reasoning behind the conversion
4. Display the results in a formatted table

## Deployment

### Deploy to Netlify

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect the settings from `netlify.toml`

3. **Configure Environment Variables**:
   - In your Netlify site dashboard, go to Site settings → Environment variables
   - Add your Raindrop API credentials
   - Or use the Raindrop integration to auto-configure

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## Project Structure

```
netlify-smartsql-starter/
├── netlify/
│   └── functions/
│       ├── seed.js          # Database seeding endpoint
│       └── query.js         # Natural language query endpoint
├── public/
│   ├── index.html           # Main UI
│   ├── style.css            # Styling
│   └── app.js               # Client-side logic
├── netlify.toml             # Netlify configuration
├── package.json             # Dependencies
├── .env.example             # Environment template
└── README.md                # Documentation
```

## Architecture

### Backend (Netlify Functions)

- **seed.js**: Creates tables and inserts sample data using `executeQuery.execute()` with SQL queries
- **query.js**: Converts natural language to SQL using `executeQuery.execute()` with text queries

### Frontend

- **index.html**: Tab-based UI with seed and query interfaces
- **style.css**: Modern, responsive styling with animations
- **app.js**: Handles user interactions and API calls

### API Endpoints

- `POST /api/seed`: Initialize the database
- `POST /api/query`: Execute natural language queries

## SmartSQL API Usage

### Seeding (Direct SQL)

```javascript
await client.executeQuery.execute({
  smartSqlLocation: {
    smartSql: { name, version, application_name }
  },
  sqlQuery: "CREATE TABLE customers (...); INSERT INTO customers VALUES (...);"
});
```

### Querying (Natural Language)

```javascript
await client.executeQuery.execute({
  smartSqlLocation: {
    smartSql: { name, version, application_name }
  },
  textQuery: "Show me the top 5 customers by total order value"
});
```

## Learn More

- [Raindrop Documentation](https://docs.raindrop.ai)
- [SmartSQL API Reference](https://docs.raindrop.ai/api-reference/smart-sql)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Raindrop SDK](https://www.npmjs.com/package/@liquidmetal-ai/lm-raindrop)

## License

MIT
