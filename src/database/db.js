const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         adress TEXT,
    //         adress2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     ); 
    // `)

//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         adress,
//         adress2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `

//     const values = [
//         "http://localhost:3000/assets/recycle2.jpg",
//         "Papersider",
//         "Guilherme Gamballa, Jardim América",
//         "Número 260",
//         "Santa catarina",
//         "Rio do sul",
//         "Papeis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);

//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("Aqui estão seus registros");
//         console.log(rows);
//     })

    // db.run(`DELETE FROM places `,  function(err){
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("Registro deletado com sucesso");
    // })

})