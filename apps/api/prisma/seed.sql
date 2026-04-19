-- Sample data for the profiles table
-- Run this against your PostgreSQL database after migrations have been applied:
--
--   psql -h localhost -p 55432 -U admin -d challenge_db -f apps/api/prisma/seed.sql
--
-- Or, if using Docker Compose:
--
--   docker exec -i node-candidate-db psql -U admin -d challenge_db < apps/api/prisma/seed.sql

INSERT INTO profiles (id, "firstName", "lastName", email, bio, "createdAt", "updatedAt")
VALUES
  (
    gen_random_uuid(),
    'Alice',
    'Johnson',
    'alice.johnson@example.com',
    'Senior software engineer with 8 years of experience in distributed systems.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Bob',
    'Martinez',
    'bob.martinez@example.com',
    'Full-stack developer passionate about clean architecture and developer experience.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Clara',
    'Nguyen',
    'clara.nguyen@example.com',
    'Product designer who codes. Focused on accessibility and inclusive design.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'David',
    'Kim',
    'david.kim@example.com',
    'Backend engineer specialising in event-driven architectures and Kafka.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Eva',
    'Rossi',
    'eva.rossi@example.com',
    NULL,
    NOW(),
    NOW()
  );
