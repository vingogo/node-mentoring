import { Request, Response, Router } from 'express';
const route = Router();

const getUserList = (req: Request, res: Response) => {

};

export default (app: Router) => {
    app.use('/users', route);

    route.get('/', getUserList);
};
