import { Raindrop } from '@liquidmetal-ai/lm-raindrop';

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Initialize Raindrop client
    const client = new Raindrop({
      apiKey: process.env.RAINDROP_API_KEY,
    });

    const smartSqlLocation = {
      smartSql: {
        name: process.env.RAINDROP_SMARTSQL_NAME,
        version: process.env.RAINDROP_APPLICATION_VERSION,
        application_name: process.env.RAINDROP_APPLICATION_NAME,
      }
    };

    // Check if tables already exist
    try {
      const metadata = await client.getMetadata.retrieve({
        smartSqlLocation: smartSqlLocation,
      });

      // If tables exist, return early
      if (metadata.tables && metadata.tables.length > 0) {
        const tableNames = metadata.tables.map(t => t.tableName);
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: true,
            message: 'Database already seeded',
            tablesExist: tableNames,
            alreadySeeded: true,
          }),
        };
      }
    } catch (metadataError) {
      // If metadata retrieval fails, tables probably don't exist yet - continue with seeding
      console.log('No existing tables found, proceeding with seed');
    }

    // Create tables only - SmartSQL has a bug where multiple INSERT statements
    // fail with "RETURNING" syntax error. Users can insert data via natural language queries.
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        total_amount REAL NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `;

    // Execute the table creation
    const response = await client.executeQuery.execute({
      smartSqlLocation: smartSqlLocation,
      sqlQuery: createTablesSQL,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Database tables created successfully. Use natural language queries to insert data!',
        tables: ['customers', 'products', 'orders', 'order_items'],
        note: 'Tables are empty. Try queries like: "Add a customer named Alice with email alice@example.com"'
      }),
    };
  } catch (error) {
    console.error('Seed error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to seed database',
        details: error.message
      }),
    };
  }
};
