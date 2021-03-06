import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import userRoute from './handlers/users';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();

app.use(bodyParser.json());

productRoutes(app);
orderRoutes(app);
userRoute(app);
dashboardRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

const server = app.listen(3000, function () {
    console.log('Listening on port ' + server.address()?.toString + '  .....');
});
