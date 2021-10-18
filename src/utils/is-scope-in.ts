import { BlockMode } from '../types/interfaces';

const scopes = ['headers', 'cookies', 'params', 'query', 'body', 'property'];
const isScopeIn = (scope: BlockMode): boolean => scopes.includes(scope);

export default isScopeIn;
