// prisma/seed.ts
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../lib/generated/prisma/client';
import * as fs from 'fs';
import * as path from 'path';
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const sqlFilePath = path.join(__dirname, 'seed.sql');
  const sql = fs.readFileSync(sqlFilePath, 'utf-8');

  // Split SQL into individual statements if necessary,
  // as $executeRaw typically handles a single statement at a time.
  // For simple cases with multiple INSERTs, you might need to iterate.
  const statements = sql.split(';').filter((s) => s.trim() !== '');

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement); // Use $executeRaw for parameterized queries
  }
  console.log('Database seeded successfully with raw SQL.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
