import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let pixResponse = await fetch('https://pixabay.com/api/?key=52800745-f52e8441750acdaa430f09481&q=solar+system+space&orientation=horizontal');
    let pixData = await pixResponse.json();
    let randomURL = pixData.hits[Math.floor(Math.random() * pixData.hits.length)].largeImageURL;
    console.log(pixData);
    console.log(randomURL);
    
    res.render('home.ejs', {randomURL});
//    res.send('Hello Express app!')
});

app.listen(3000, () => {
   console.log('server started');
});

// app.get('/mercury', (req, res) => {
//     let planetInfo = solarSystem.getMercury();
//     console.log(planetInfo);
//     res.render('mercury.ejs',{planetInfo});
// });

app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;
    let planetInfo = solarSystem[`get${planet_name}`]();
    console.log(planetInfo);
    res.render('planetInfo.ejs',{planetInfo, planet_name});
});