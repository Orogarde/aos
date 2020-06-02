const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createUnite', (req, res) =>{
        const description = req.body.description;
        const taille_min = req.body.taille_min;
        const taille_max = req.body.taille_max;
        const cout_min = req.body.cout_min;
        const cout_max = req.body.cout_max;
        const taille_critique = req.body.taille_critique;
        const visuel = req.body.visuel_unit;
        const battletomeId = req.body.battletomeId;
        unite_aos.create({
            description,
            taille_min,
            taille_max,
            cout_min,
            cout_max,
            taille_critique,
            visuel,
            battletomeId,
        }).then((data)=>{
             res.json(data);
        })
    })
}