CREATE USER hasurauser WITH PASSWORD 'hasura_development_password';

-- required for Hasura to work properly
-- https://hasura.io/docs/latest/graphql/core/deployment/postgres-requirements.html
CREATE SCHEMA IF NOT EXISTS hdb_catalog;
ALTER SCHEMA hdb_catalog OWNER TO hasurauser;
GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO hasurauser;
GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO hasurauser;

--
-- Code below this line is for customizing what Hasura has access to
-- For production instances, you might want to use more granular controls
GRANT USAGE ON SCHEMA public TO hasurauser;

GRANT CREATE ON SCHEMA public TO hasurauser; -- only if Hasura is managing migrations

-- "ALTER DEFAULT PRIVILEGES IN SCHEMA public" allows future resources to be accessed by hasurauser
-- Without it, the GRANT command would only apply to currently existing resources
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO hasurauser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO hasurauser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ALL TABLES IN SCHEMA public TO hasurauser;
