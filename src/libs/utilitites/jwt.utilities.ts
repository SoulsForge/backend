import { Request } from 'express';

function extractTokenFromHeader(request: Request) {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export default { extractTokenFromHeader };
