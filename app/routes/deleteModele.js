const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteModele', (req, res) =>{
        const modele = req.body; 
        model.destroy({
           where: {
                modeleId: modele.modelId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}