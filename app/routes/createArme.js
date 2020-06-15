const { arme_aos } = require('../sequelize')


module.exports = (app) =>{
app.post('/createArme', (req, res) =>{
        const nom = req.body.nom;
        const portee = req.body.portee;
        const nb_attaque = req.body.nb_attaque;
        const touche = req.body.touche;
        const blesse = req.body.blesse;
        const perforation = req.body.perforation;
        const degat = req.body.degat;
        const aosPts = req.body.aosPts;
        const modeleId = req.body.modeleId;
        arme_aos.create({
           nom,
           portee,
           nb_attaque,
           touche,
           blesse,
           perforation,
           degat,
           aosPts,
           modeleId,
        }).then((data)=>{
             res.json(data);
        })
    })
}