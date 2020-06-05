const express = require("express");
const server = express();

const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Rota principal
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" });
});

//Rota de cadastro de coleta
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

//Rota de coleta especifica
server.get("/get-point/:id", (req, res) => {

    let id = req.params.id;

    db.all(`SELECT * FROM places WHERE id = '${id}'`, function (err, rows) {
        if (err) {
            console.log(err);
        }
        console.log("Aqui estão seus registros");
        console.log(rows);

        return res.render("edit-point.html", { place: rows })
    })


})

//Cadastrar local de coleta
server.post("/savepoint", (req, res) => {

    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.render("create-point.html", { error: true })
        }
        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);

})

//Editar local de coleta
server.post("/editpoint/:id", (req, res) => {

    const id = req.params.id;

    console.log("Id da place:: ", id);

    console.log("Estado", req.body);

    db.run(`UPDATE places SET image = ?, name = ?, adress = ?, adress2 = ?, state = ?, city = ?, items = ? WHERE id = ? `, 
    [req.body.image, req.body.name, req.body.adress, req.body.adress2, req.body.state, req.body.city , req.body.items ,  id], function (err) {

        if (err) {
            console.log(err);
            return res.send("Ops! Algo deu errado!");
        }

        return res.render("edit-point.html", { edit: true });
    })
})

//Rota de confirmação de exclusão de coleta
server.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    return res.render("index.html", {delete: id});
})

//Deleta um local de coleta
server.get("/delete-point/:id", (req, res) => {

    const id = req.params.id;

    db.run (`DELETE FROM places WHERE id = '${id}'`, function (err) {
        if (err) {
            console.log(err);
            return res.render("Ops! Algo deu errado!");
        }

        return res.redirect("/");
    } )

}) 

//Listar todos os locais de coleta
server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        console.log("Aqui estão seus registros");
        console.log(rows);

        const total = rows.length

        return res.render("search-results.html", { places: rows, total })
    })
})


//Ligar o servidor 
server.listen(3000, () => {
    console.log("Conectado");
});
