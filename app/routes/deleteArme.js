const { arme_aos} = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteArme', (req, res) =>{
        const ArmeAos = req.body; 
        arme_aos.destroy({
           where: {
                ArmeId: ArmeAos.armeIdSup,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}