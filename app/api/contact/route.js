// app/api/contact/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function POST(request) {
    console.log('Received POST request to /api/contact');

    try {
        const { name, email, message } = await request.json();
        console.log('Request body:', { name, email, message });

        console.log('Connecting to database...');
        const client = await pool.connect();
        console.log('Connected to database');

        console.log('Executing query...');
        const result = await client.query(
            'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id',
            [name, email, message]
        );
        console.log('Query executed, result:', result.rows[0]);

        client.release();

        return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 200 });
    } catch (err) {
        console.error('Error in API route:', err);
        return NextResponse.json(
            { success: false, error: 'Internal server error', details: err.message },
            { status: 500 }
        );
    }
}