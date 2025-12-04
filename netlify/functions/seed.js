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

    // Create tables and seed with data
    const seedSQL = `
      -- Create customers table
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      -- Create products table
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
      );

      -- Create orders table
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        total_amount REAL NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );

      -- Create order_items table
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );

      -- Insert sample customers
      INSERT INTO customers (id, name, email, created_at) VALUES (1, 'Alice Johnson', 'alice@example.com', '2024-01-15');
      INSERT INTO customers (id, name, email, created_at) VALUES (2, 'Bob Smith', 'bob@example.com', '2024-02-20');
      INSERT INTO customers (id, name, email, created_at) VALUES (3, 'Carol Williams', 'carol@example.com', '2024-03-10');
      INSERT INTO customers (id, name, email, created_at) VALUES (4, 'David Brown', 'david@example.com', '2024-04-05');
      INSERT INTO customers (id, name, email, created_at) VALUES (5, 'Emma Davis', 'emma@example.com', '2024-05-12');
      INSERT INTO customers (id, name, email, created_at) VALUES (6, 'Frank Miller', 'frank@example.com', '2024-06-18');
      INSERT INTO customers (id, name, email, created_at) VALUES (7, 'Grace Wilson', 'grace@example.com', '2024-07-22');
      INSERT INTO customers (id, name, email, created_at) VALUES (8, 'Henry Moore', 'henry@example.com', '2024-08-30');
      INSERT INTO customers (id, name, email, created_at) VALUES (9, 'Ivy Taylor', 'ivy@example.com', '2024-09-14');
      INSERT INTO customers (id, name, email, created_at) VALUES (10, 'Jack Anderson', 'jack@example.com', '2024-10-25');

      -- Insert sample products
      INSERT INTO products (id, name, price, category) VALUES (1, 'Laptop Pro', 1299.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (2, 'Wireless Mouse', 29.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (3, 'Desk Chair', 249.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (4, 'Standing Desk', 499.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (5, 'USB-C Cable', 19.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (6, 'Monitor 27"', 399.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (7, 'Keyboard Mechanical', 149.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (8, 'Desk Lamp', 79.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (9, 'Webcam HD', 89.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (10, 'Headphones', 199.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (11, 'Mouse Pad', 14.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (12, 'Cable Organizer', 24.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (13, 'Phone Stand', 34.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (14, 'Laptop Stand', 59.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (15, 'External SSD 1TB', 129.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (16, 'USB Hub', 39.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (17, 'Desk Mat', 44.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (18, 'Monitor Arm', 119.99, 'Furniture');
      INSERT INTO products (id, name, price, category) VALUES (19, 'Docking Station', 199.99, 'Electronics');
      INSERT INTO products (id, name, price, category) VALUES (20, 'Portable Charger', 49.99, 'Electronics');

      -- Insert sample orders
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (1, 1, '2024-11-01', 1329.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (2, 2, '2024-11-02', 749.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (3, 3, '2024-11-03', 279.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (4, 1, '2024-11-04', 449.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (5, 4, '2024-11-05', 1699.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (6, 5, '2024-11-06', 89.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (7, 2, '2024-11-07', 549.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (8, 6, '2024-11-08', 229.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (9, 7, '2024-11-09', 1499.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (10, 3, '2024-11-10', 169.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (11, 8, '2024-11-11', 679.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (12, 1, '2024-11-12', 249.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (13, 9, '2024-11-13', 1829.96);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (14, 4, '2024-11-14', 399.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (15, 10, '2024-11-15', 289.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (16, 5, '2024-11-16', 519.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (17, 6, '2024-11-17', 1549.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (18, 7, '2024-11-18', 79.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (19, 8, '2024-11-19', 959.96);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (20, 2, '2024-11-20', 329.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (21, 9, '2024-11-21', 649.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (22, 10, '2024-11-22', 1199.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (23, 3, '2024-11-23', 199.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (24, 4, '2024-11-24', 879.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (25, 5, '2024-11-25', 149.99);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (26, 1, '2024-11-26', 459.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (27, 6, '2024-11-27', 1099.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (28, 7, '2024-11-28', 239.98);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (29, 8, '2024-11-29', 729.97);
      INSERT INTO orders (id, customer_id, order_date, total_amount) VALUES (30, 9, '2024-11-30', 399.99);

      -- Insert sample order items
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (1, 1, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (2, 1, 2, 1, 29.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (3, 2, 3, 1, 249.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (4, 2, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (5, 3, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (6, 3, 9, 1, 89.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (7, 3, 11, 1, 14.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (8, 3, 5, 1, 19.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (9, 4, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (10, 4, 18, 1, 119.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (11, 5, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (12, 5, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (13, 6, 9, 1, 89.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (14, 7, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (15, 7, 8, 1, 79.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (16, 8, 10, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (17, 8, 2, 1, 29.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (18, 9, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (19, 9, 10, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (20, 10, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (21, 10, 5, 1, 19.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (22, 11, 15, 1, 129.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (23, 11, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (24, 11, 18, 1, 119.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (25, 12, 3, 1, 249.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (26, 13, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (27, 13, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (28, 13, 15, 1, 129.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (29, 14, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (30, 15, 19, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (31, 15, 9, 1, 89.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (32, 16, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (33, 16, 5, 1, 19.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (34, 17, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (35, 17, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (36, 17, 19, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (37, 18, 8, 1, 79.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (38, 19, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (39, 19, 2, 1, 29.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (40, 19, 5, 2, 39.98);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (41, 20, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (42, 20, 10, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (43, 21, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (44, 21, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (45, 22, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (46, 22, 16, 1, 39.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (47, 23, 10, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (48, 24, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (49, 24, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (50, 25, 7, 1, 149.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (51, 26, 6, 1, 399.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (52, 26, 18, 1, 119.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (53, 27, 1, 1, 1299.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (54, 27, 10, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (55, 28, 3, 1, 249.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (56, 29, 4, 1, 499.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (57, 29, 19, 1, 199.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (58, 29, 2, 1, 29.99);
      INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (59, 30, 6, 1, 399.99);
    `;

    // Execute the seed SQL
    const response = await client.executeQuery.execute({
      smartSqlLocation: smartSqlLocation,
      sqlQuery: seedSQL,
    });

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
          customers: 10,
          products: 20,
          orders: 30,
          orderItems: 59
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
