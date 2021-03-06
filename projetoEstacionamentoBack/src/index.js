import express, { request, response } from 'express';
import { activitiesCheckout, activityCheckin, listActivities, removeActivities } from './controlers/activitiesController.js';
import { insertVehicles, listVehicles, removeVehicle, updateVehicles } from './controlers/vehiclesController.js';
import { openDatabase } from './database.js';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");// dentro do '*' poderia ser qual site poderia fazer a requisiçao.
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    next();
})

app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    })
});

/* Endpoints Vehicles */
app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicles);
app.put('/api/vehicles/:id', updateVehicles);
app.delete('/api/vehicles/:id', removeVehicle);

/* Endpoints Activities */
app.post('/api/activities/checkin', activityCheckin);
app.put('/api/activities/checkout', activitiesCheckout);
app.delete('/api/activities/:id', removeActivities);
app.get('/api/activities', listActivities);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...");
});