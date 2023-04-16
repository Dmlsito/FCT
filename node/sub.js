// Se subscribe a la informacion del publisher //
const mqtt = require('mqtt')
const mysql = require('mysql')
const DB = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'dmlsito14',
    password: 'Instiagra14',
    database: 'fctprueba'
})
//dmlsito14, Instiagra14
//Evento que se dencadenara cuando se conecte a la DDBB
DB.connect(() => {
    console.log('Database okey')
})

const sub = mqtt.connect('mqtt://localhost:9000')
// Se subscribe al broker
sub.on('connect', () => {
    //Se subscribe a lo que publica el publisher
    sub.subscribe('topic test')
})

sub.on('message', (topic, message) => {
    let pressureNumber = parseInt(message)
    let state;
   
    const date = new Date();
    
    if(pressureNumber >= 50) {
    state = 1;
    db.query('insert into machine_state set ? ',
    {state: 1},
   
    (err, rows) => {
    if(err){
        console.log(err)
    }
    });
}
})
//19: 31