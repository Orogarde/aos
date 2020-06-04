const { profil_aos,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findProfils', (req, res) =>{
        profil_aos.findAll({
            include : model,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}