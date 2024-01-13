import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// ----------------------------------------------------------------------

type Middleware = (req: NextApiRequest, res: NextApiResponse, next: (result: any) => void) => void;

const initMiddleware = (middleware: Middleware) => (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve();
    });
  });

// ----------------------------------------------------------------------

// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

export default cors;
