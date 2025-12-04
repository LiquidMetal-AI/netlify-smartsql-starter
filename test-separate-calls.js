import { Raindrop } from '@liquidmetal-ai/lm-raindrop';

const client = new Raindrop({ apiKey: process.env.RAINDROP_API_KEY });
const smartSqlLocation = {
  smartSql: {
    name: process.env.RAINDROP_SMARTSQL_NAME,
    version: process.env.RAINDROP_APPLICATION_VERSION,
    application_name: process.env.RAINDROP_APPLICATION_NAME,
  }
};

// Drop all
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: 'DROP TABLE IF EXISTS order_items; DROP TABLE IF EXISTS orders; DROP TABLE IF EXISTS products; DROP TABLE IF EXISTS customers' });

console.log('Creating tables...');
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: 'CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT); CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);' });

console.log('Inserting customers...');
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: "INSERT INTO customers VALUES (1, 'Alice')" });
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: "INSERT INTO customers VALUES (2, 'Bob')" });

console.log('Inserting products...');
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: "INSERT INTO products VALUES (1, 'Laptop', 1299.99)" });
await client.executeQuery.execute({ smartSqlLocation, sqlQuery: "INSERT INTO products VALUES (2, 'Mouse', 29.99)" });

console.log('\nChecking results...');
const metadata = await client.getMetadata.retrieve({ smartSqlLocation });
for (const table of metadata.tables || []) {
  const result = await client.executeQuery.execute({ smartSqlLocation, sqlQuery: `SELECT COUNT(*) as count FROM ${table.tableName}` });
  const count = JSON.parse(result.results)[0]?.count || 0;
  console.log(`${table.tableName}: ${count} rows`);
}
