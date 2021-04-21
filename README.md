# Admin
This is a starter project that provides a quick to setup admin interface for data in a Postgres database. It relies on [react-admin](https://marmelab.com/react-admin/), [Firebase authentication](https://firebase.google.com/products/auth), and [Hasura](https://hasura.io/docs/latest/graphql/core/getting-started/index.html) to provide significant functionality with minimal setup. The project was originally inspired by [this project](https://github.com/dvasdekis/react-admin-hasura-firebase) but has had significant changes to how migrations are handled and how react-admin connects to Hasura.

## Setting Up
To get started, run `./script/bootstrap` to install dependencies. <br />
Then run `./script/server` to run the [admin frontend](http://localhost:3000/) and the [Hasura console](http://localhost:8081/console).
<br /><br />
You will likely want to create a user for yourself in the database. In one terminal session, make sure you have the server running with `./script/server`. Then, in another terminal session, you can connect to the database with
```
docker exec -it admin-database psql postgres://postgres:postgres@localhost:5432/postgres
```
Once connected, run the command below to make a new user for yourself. Your email should match what you use to login with through Google sign in.
```
insert into users(email, first_name, last_name) values('YOUR EMAIL', 'YOUR FIRST NAME', 'YOUR LAST NAME');
```

## Adding a new resource/table
1. Add the `*.up.sql` and `*.down.sql` files in `hasura/migrations`
2. If you're using granular permissions for the Hasura user in the database, update the `postgres/init/1_hasura_permissions.sql` file. This isn't necessary with the default setup of this project which gives the Hasura user full permissions to the `public` schema.
3. Update the `hasura/metadata/tables.yaml` file with new table and the corresponding role permissions for the table. If you need help with the syntax for the file, you can follow the guide in the [Hasura metadata section](#Updating-Hasura-Metadata-Files).
4. Add a new `Resource` to `react-admin/src/App.js`. You can use the `User` resource as an example of how to do this.
5. The changes will be applied automatically the next time you run `./script/server`

## Updating Hasura Metadata Files
Hasura metadata contains information about Hasura's configuration, including table permissions. To configure Hasura, you can update the files in the `hasura/metadata` directory of this project. You might find it easier to update the metadata using [Hasura's admin console interface](http://localhost:8081) and then [exporting the configuration](http://localhost:8081/console/settings/metadata-actions). The data only exports as JSON, but we want to commit configurations to version control under the `hasura/metadata/` directory. To do that, take the JSON file and [convert it to YAML](https://www.json2yaml.com/). Save the relevant YAML section in `hasura/metadata/[relevant_section].yaml`

## Firebase (authentication)
We use Firebase for authentication. To restrict the allowed users, we need to have a Firebase function deployed. To set up Firebase, run `npm install -g firebase-tools`, you might need to restart your shell to have the `firebase` command available. Run `firebase login` to authenticate your account so you can use the `firebase` command.
<br /><br />
To deploy the Firebase function, navigate to this project's `firebase` directory and run `firebase deploy --only functions`
