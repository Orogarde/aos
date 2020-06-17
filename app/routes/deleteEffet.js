const { effet_aos} = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteEffet', (req, res) =>{
        const effetAos = req.body; 
        
        effet_aos.destroy({
           where: {
                effetId: effetAos.effetIdSup,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}