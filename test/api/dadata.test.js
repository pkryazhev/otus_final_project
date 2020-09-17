const axios = require('axios');
let assert = require('assert');
let Ajv= require('ajv');

describe('dadata api tests', () =>{
    axios.defaults.baseURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/';
    axios.defaults.headers.common['Authorization'] = 'Token 959e434f97b7a005867e5066421a306281c965fc'; //подставьте сюда свой токен
    const ajv = new Ajv({$data: true, logger: console, allErrors: true, verbose: true});
    let shema;

    test('dadata check ip location test', async () => {
        shema = {"properties" : {
                "value" : {'type' : 'string'},
                "unrestricted_value" : {'type' : 'string'}
            },
            "required": ["value", "unrestricted_value"]};
        const r = await axios.get('/iplocate/address?ip=46.226.227.20');
        const a = ajv.validate(shema, r.data.location);
        console.log(r.data.location.unrestricted_value);
        expect(r.status).toBe(200);
        assert.deepEqual(a, true);
    });

    test('dadata find post station', async () => {
        const query = { "lat": 55.878, "lon": 37.653, "radius_meters": 1000 }
        const r = await axios.post('geolocate/postal_unit', query);
        console.log(r.data);
        expect(r.status).toBe(201);
    });

    test('dadata get info by inn', async () => {
        shema = {"properties" : {
                "suggestions" : {'type' : 'array'}
            },
            "required": ["suggestions"]};
        const query = {query: '9705100963'};
        const r = await axios.post('/suggest/party', query);
        const a = ajv.validate(shema, r.data);
        console.log(r.data);
        expect(r.status).toBe(200);
        assert.deepEqual(a, true);
    });

    test('dadata get car info', async () => {
        shema = {"properties" : {
                "suggestions" : {'type' : 'array'}
            },
            "required": ["suggestions"]};
        const query = {query: 'FORD'};
        const r = await axios.post('findById/car_brand', query);
        const a = ajv.validate(shema, r.data);
        console.log(r.data.suggestions);
        expect(r.status).toBe(200);
        assert.deepEqual(a, true);
    });

    test('dadata get metro station info', async () => {
        shema = {"properties" : {
                "suggestions" : {'type' : 'array'}
            },
            "required": ["suggestions"]};
        const query = {query: 'Бабушкинская'};
        const r = await axios.post('suggest/metro', query);
        const a = ajv.validate(shema, r.data);
        console.log(r.data.suggestions);
        expect(r.status).toBe(200);
        assert.deepEqual(a, true);
    });
});