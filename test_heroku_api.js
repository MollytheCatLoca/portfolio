const axios = require('axios');

async function testHerokuAPI() {
    const url = 'https://prompt-handler-06fbef253337.herokuapp.com/solar-parks';
    const data = {
        provincia: "Buenos Aires",
        localidad: "La Plata",
        capacidad: 2,
        area: 150000,
        latitud: -34.9206797,
        longitud: -57.9537638
    };

    const auth = {
        username: process.env.API_USERNAME || 'default_user',
        password: process.env.API_PASSWORD || 'default_password'
    };

    try {
        console.log('Sending request to Heroku API...');
        console.log('Data:', JSON.stringify(data, null, 2));
        const response = await axios({
            method: 'get',
            url: url,
            auth: auth,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)  // Enviamos los datos en el cuerpo de la solicitud
        });

        console.log('Response received:');
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error occurred while testing the API:');
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

testHerokuAPI();