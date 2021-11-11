import express, { Request, Response, Application } from 'express'
import session from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'

declare module 'express-session' {
    export interface Session {
        Loggedin: boolean,
        Username: string
    }
}

const app: Application = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: 'secret2142citten',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req: Request, res: Response) => {
    if (req.session.Loggedin) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write('Welcome, ' + req.session.Username)
        res.write('<br><a href="/logout">Logout</a>')
        res.end()
    }
        
    else
        res.sendFile(path.join(__dirname + '/view/login.html'))

})

app.post('/auth', (req: Request, res: Response) => {
    console.log(req.body)
    let username: string = req.body.username
    let pass: string = req.body.password
    if (username && pass) {
        let Session = req.session
        Session.Loggedin = true
        Session.Username = username
        res.redirect('/')
    }
    else
        res.send('Please enter username and password')
    res.end()
})

app.get('/logout', (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
        res.redirect('/')
    })
})

app.listen(port, ():void => {
    return console.log(`server is listening on ${port}`);
});