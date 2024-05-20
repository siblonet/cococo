const apiUrlfin = 'http://localhost:3000/copine/';
const apiUrlfine = 'https://nuance-doud.adaptable.app/copine/';
const apiUrlfina = 'https://nuance-doud.adaptable.app/';
const apiUrlfinb = 'http://localhost:3000/';

const ivoireCities = [
    { "id": 1, "name": "Abidjan" },
    { "id": 2, "name": "Yamoussoukro" },
    { "id": 3, "name": "Bouaké" },
    { "id": 4, "name": "Daloa" },
    { "id": 5, "name": "San Pedro" },
    { "id": 6, "name": "Divo" },
    { "id": 7, "name": "Korhogo" },
    { "id": 8, "name": "Man" },
    { "id": 9, "name": "Gagnoa" },
    { "id": 10, "name": "Abengourou" },
    { "id": 11, "name": "Bouaflé" },
    { "id": 12, "name": "Séguéla" },
    { "id": 13, "name": "Oumé" },
    { "id": 14, "name": "Adzopé" },
    { "id": 15, "name": "Agnibilékrou" },
    { "id": 16, "name": "Boundiali" },
    { "id": 17, "name": "Bonoua" },
    { "id": 18, "name": "Bingerville" },
    { "id": 19, "name": "Tiassalé" },
    { "id": 20, "name": "Dabou" },
    { "id": 21, "name": "Grand-Bassam" },
    { "id": 22, "name": "Dimbokro" },
    { "id": 23, "name": "Bangolo" },
    { "id": 24, "name": "Akoupé" },
    { "id": 25, "name": "Biankouma" },
    { "id": 26, "name": "Ferkessédougou" },
    { "id": 27, "name": "Guiglo" },
    { "id": 28, "name": "Sassandra" },
    { "id": 29, "name": "Sinfra" },
    { "id": 30, "name": "Toumodi" },
    { "id": 31, "name": "Zuénoula" },
    { "id": 32, "name": "Adiaké" },
    { "id": 33, "name": "Danané" },
    { "id": 34, "name": "Béoumi" },
    { "id": 35, "name": "Tengréla" },
    { "id": 36, "name": "Vavoua" }
];




const requesttoBackend = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return false
    }

    return responseData;
};

const requesttoBacken = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfina + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return false
    }

    return responseData;
};