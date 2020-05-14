const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.get('/createUnite', (req, res) =>{
        console.log('coucou');
        unite_aos.create({
            description: "cool",
            taille_min: 10,
            taille_max: 50,
            cout_min: 600,
            cout_max: 1000,
            taille_critique: 20,
            visuel: "visuel-create.png",
            battletomeId:1,
        }).then((data)=>{
             res.json(data);
        })
    })
}