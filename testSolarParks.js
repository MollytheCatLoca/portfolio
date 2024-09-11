const axios = require('axios');

async function testSolarParksAPI() {
    const url = 'http://localhost:3000/api/solarParks';
    const data = {
        provincia: "Buenos Aires",
        localidad: "La Plata",
        capacidad: 2,
        area: 150000,
        latitud: -34.9206797,
        longitud: -57.9537638
    };

    try {
        console.log('Sending request to Solar Parks API...');
        console.log('Data:', JSON.stringify(data, null, 2));
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response received:');
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Data:', JSON.stringify(response.data, null, 2));

        if (response.data.parque_solar && Array.isArray(response.data.parque_solar)) {
            console.log('Received valid solar park data.');
            console.log(`Number of scenarios: ${response.data.parque_solar.length}`);
        } else {
            console.log('Warning: Unexpected data structure in response.');
        }

        console.log('Processing time:', response.data.processingTime, 'seconds');
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

testSolarParksAPI();