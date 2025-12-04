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

    // Step 1: Create all tables in one call
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

    await client.executeQuery.execute({
      smartSqlLocation: smartSqlLocation,
      sqlQuery: createTablesSQL,
    });

    // Step 2: Insert customers (one call per insert to avoid RETURNING bug)
    const customers = [
      [1, 'Alice Johnson', 'alice@example.com', '2024-01-15'],
      [2, 'Bob Smith', 'bob@example.com', '2024-02-20'],
      [3, 'Carol Williams', 'carol@example.com', '2024-03-10'],
      [4, 'David Brown', 'david@example.com', '2024-04-05'],
      [5, 'Emma Davis', 'emma@example.com', '2024-05-12'],
    ];

    for (const [id, name, email, created_at] of customers) {
      await client.executeQuery.execute({
        smartSqlLocation: smartSqlLocation,
        sqlQuery: `INSERT INTO customers (id, name, email, created_at) VALUES (${id}, '${name}', '${email}', '${created_at}')`,
      });
    }

    // Step 3: Insert products
    const products = [
      [1, 'Laptop Pro', 1299.99, 'Electronics'],
      [2, 'Wireless Mouse', 29.99, 'Electronics'],
      [3, 'Desk Chair', 249.99, 'Furniture'],
      [4, 'Standing Desk', 499.99, 'Furniture'],
      [5, 'Monitor 27"', 399.99, 'Electronics'],
    ];

    for (const [id, name, price, category] of products) {
      await client.executeQuery.execute({
        smartSqlLocation: smartSqlLocation,
        sqlQuery: `INSERT INTO products (id, name, price, category) VALUES (${id}, '${name}', ${price}, '${category}')`,
      });
    }

    // Step 4: Insert orders
    const orders = [
      [1, 1, '2024-11-01', 1329.98],
      [2, 2, '2024-11-02', 749.98],
      [3, 3, '2024-11-03', 279.98],
      [4, 1, '2024-11-04', 449.98],
      [5, 4, '2024-11-05', 1699.97],
    ];

    for (const [id, customer_id, order_date, total_amount] of orders) {
      await client.executeQuery.execute({
        smartSqlLocation: smartSqlLocation,
        sqlQuery: `INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (${id}, ${customer_id}, '${order_date}', ${total_amount})`,
      });
    }

    // Step 5: Insert order_items
    const orderItems = [
      [1, 1, 1, 1, 1299.99],
      [2, 1, 2, 1, 29.99],
      [3, 2, 3, 1, 249.99],
      [4, 2, 4, 1, 499.99],
      [5, 3, 5, 1, 399.99],
    ];

    for (const [id, order_id, product_id, quantity, price] of orderItems) {
      await client.executeQuery.execute({
        smartSqlLocation: smartSqlLocation,
        sqlQuery: `INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (${id}, ${order_id}, ${product_id}, ${quantity}, ${price})`,
      });
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Database seeded successfully',
        tables: ['customers', 'products', 'orders', 'order_items'],
        stats: {
          customers: customers.length,
          products: products.length,
          orders: orders.length,
          orderItems: orderItems.length,
        }
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
