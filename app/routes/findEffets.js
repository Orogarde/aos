const { effet_aos,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findEffets', (req, res) =>{
        effet_aos.findAll({
            include : model,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}