const axios = require('axios');

describe('dadata api tests', () =>{
    axios.defaults.baseURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/';
    axios.defaults.headers.common['Authorization'] = 'Token '; //подставьте сюда свой токен

    test('dadata check ip location test', async () => {
        const r = await axios.get('/iplocate/address?ip=46.226.227.20');
        console.log(r.data.location.unrestricted_value);
        expect(r.status).toBe(200);
    });

    test('dadata find post station', async () => {
        const query = { "lat": 55.878, "lon": 37.653, "radius_meters": 1000 }
        const r = await axios.post('geolocate/postal_unit', query);
        console.log(r.data);
        expect(r.status).toBe(200);
    });

    test('dadata get info by inn', async () => {
        const query = {query: '9705100963'};
        const r = await axios.post('/suggest/party', query);
        console.log(r.data);
        expect(r.status).toBe(200);
    });

    test('dadata get car info', async () => {
        const query = {query: 'FORD'};
        const r = await axios.post('findById/car_brand', query);
        console.log(r.data.suggestions);
        expect(r.status).toBe(200);
    });

    test('dadata get metro station info', async () => {
        const query = {query: 'Бабушкинская'};
        const r = await axios.post('suggest/metro', query);
        console.log(r.data.suggestions);
        expect(r.status).toBe(200);
    });
});