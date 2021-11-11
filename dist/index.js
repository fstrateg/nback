"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'secret2142citten',
    resave: true,
    saveUninitialized: true
}));
app.get('/', (req, res) => {
    if (req.session.Loggedin) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write('Welcome, ' + req.session.Username);
        res.write('<br><a href="/logout">Logout</a>');
        res.end();
    }
    else
        res.sendFile(path_1.default.join(__dirname + '/view/login.html'));
});
app.post('/auth', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let pass = req.body.password;
    if (username && pass) {
        let Session = req.session;
        Session.Loggedin = true;
        Session.Username = username;
        res.redirect('/');
    }
    else
        res.send('Please enter username and password');
    res.end();
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
