const { Client } = require('pg');
const { faker } = require("@faker-js/faker");

const connectionString = 'postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm';

const client = new Client({
    connectionString: connectionString
});

client.connect();

const updateDescriptions = async () => {
    try {
        // Fetch all rows from the apps table
        const res = await client.query('SELECT book_id FROM BOOKS');

        // Update the description column with random sentences generated by faker
        for (const row of res.rows) {
            // const randomDescription = faker.lorem.sentences();
            const randomName = faker.name.fullName(); 
            await client.query('UPDATE BOOKS SET author = $1 WHERE book_id = $2', [randomName, row.book_id]);
        }

        console.log('Description column updated with random sentences.');
    } catch (error) {
        console.error('Error: ', error.message);
    } finally {
        await client.end();
    }
};

updateDescriptions();