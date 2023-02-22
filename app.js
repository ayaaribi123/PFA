const express = require('express');
const app = express();
const PORT = 5000;


// setting 'ejs' as template engine
app.set('view engine', 'ejs');


// GET /styles.css
app.use(express.static('public'));


// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index.html', (req, res) => {
    res.render('index');
});

app.get('/products.html', (req, res) => {
    res.render('products');
});

app.get('/2.html', (req, res) => {
    res.render('2');
});

app.get('/cart.html', (req, res) => {
    res.render('cart');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});


// to handle not found page
app.use((req, res) => {
    res.status(404).send(`Sorry can't find that !`);
});





app.listen(PORT, console.log(`Server started on port ${PORT}`));

