import type * as http from 'http';
import start from './connectors/web';

export default (): http.Server => start();
