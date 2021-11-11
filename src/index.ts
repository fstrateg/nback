import express, { Request, Response, Application} from 'express';

const app: Application = express();
const port = 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
});
app.listen(port, ():void => {
    return console.log(`server is listening on ${port}`);
});