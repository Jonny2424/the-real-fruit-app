// const fruits = require('../fruits');

const Fruit = require('../models').Fruit;
const User = require('../models').User;
const Season = require('../models').Season;
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ INDEX - MAIN PAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const index = (req, res) => {
    Fruit.findAll() // SELECT * FROM "Fruits"
        .then(casey => { // fruits is a temp local variable
            res.render('index.ejs', {
                fruits: casey // fruits is the key and casey is the variable
            })
        })
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SHOW PAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const show = (req, res) => {
    Fruit.findByPk(req.params.index, {
        // take name of that user only
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Season // Include seasons associated with the fruit
            }
        ],
        attributes: ['name', 'color', 'readyToEat']
    })
        .then(foundFruit => {
            res.render('show.ejs', {
                fruit: foundFruit
            });
        })
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ NEW FRUIT PAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const newFruit = (req, res) => {
    res.render('new.ejs')
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ADD FRUIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const addFruit = (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    Fruit.create(req.body)
        .then(newFruit => {
            res.redirect('/fruits');
        })
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ DELETE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const deleteFruit = (req, res) => {
    Fruit.destroy({ where: { id: req.params.index } })
        .then(() => {
            res.redirect('/fruits');
        })
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ EDIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Finds fruit first, then the season. If theres no fruit, then dont search for
// a season. if flipped, its not clean and inefficient.
const editFruit = (req, res) => {
    Fruit.findByPk(req.params.index) // Find the fruit by id with the PK
        .then(foundFruit => { // Once the fruit is found 
            Season.findAll() // query seasons table to get all seasons
                .then(allSeasons => {
                    res.render('edit.ejs', { //send fruit and seasons back to the view
                        fruit: foundFruit,
                        seasons: allSeasons
                    });
                })

        })
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ UPDATE FRUIT'S VALUES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const updateFruit = ('/fruits/:index', (req, res) => { //:index is the index of our fruits array that we want to change
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.update(req.body, {
        where: { id: req.params.index },
        returning: true, // ONLY NEEDED FOR UPDATE
    }
    )
        .then(updatedFruit => { //Once the fruit is updated, then it finds season by PK
            Season.findByPk(req.body.season) //gives acces to season ID
                .then(foundSeason => {
                    Fruit.findByPk(req.params.index)
                        .then(foundFruit => {
                            foundFruit.addSeason(foundSeason); //adds a row to joint table
                            res.redirect(`/fruits/${req.params.index}`);
                        })
                })

        })
});

module.exports = {
    show,
    index,
    newFruit,
    addFruit,
    deleteFruit,
    editFruit,
    updateFruit
}