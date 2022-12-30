import type { Response } from 'express';
import type { ErrorResponse } from '__tests__/server/http/model/responses';

interface Responder {
  success: <T>(data: T) => void;
  status: <T>(status: number, data: T) => void;
  error: (error: ErrorResponse) => void;
}

const responder = (res: Response): Responder => ({
  success: <T>(data: T) => {
    res.format({
      'application/json': () => {
        res.json(data);
      },
      default: () => {
        res.status(406).send('Not Acceptable');
      },
    });
  },
  status: <T>(status: number, data: T) => {
    res.format({
      'application/json': () => {
        res.status(status).json(data);
      },
      default: () => {
        res.status(406).send('Not Acceptable');
      },
    });
  },
  error: (error: ErrorResponse) => {
    res.statusCode = 400;
    res.json({ message: error.message });
  },
});

export default responder;
