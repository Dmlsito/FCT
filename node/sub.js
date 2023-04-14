// Se subscribe a la informacion del publisher //
const mqtt = require('mqtt')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'instiagra',
    database: 'fct'
})
//Evento que se dencadenara cuando se conecte a la DDBB
db.connect(() => {
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
    if(pressureNumber >= 10) 
    state = 1;
    else
    state = 0
    
        db.query('insert into machine_state set ? ?',
        { data: state },
        { data: date },
        (err, rows) )

        console.log('data insertada')
        
    
    


})
//19: 31