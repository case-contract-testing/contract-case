import type { Response } from 'express';
import type {
  ErrorResponse,
  ArbitraryResponseType,
} from '__tests__/server/http/model/responses';

interface Responder {
  success: (data: ArbitraryResponseType) => void;
  error: (error: ErrorResponse) => void;
}

const responder = (res: Response): Responder => ({
  success: (data: ArbitraryResponseType) => {
    res.format({
      'application/json': () => {
        res.json(data);
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
