const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    hots: "localhost",
    user: "root",
    password: "1234",
    database: "autoscolombia"
})

app.post('/login', (req, res) => {
    console.log("Datos recibidos:", req.body); 
    const sql = "SELECT * FROM usuario WHERE `correo` = ? AND `contrasena` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err); 
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Faile");
        }
    });
});


app.listen(8081, ()=> {
    console.log("listening");
})