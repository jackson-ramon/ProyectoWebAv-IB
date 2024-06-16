import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): string | null => {
    function extractTokenFromHeader(request: Request): string | null {
      const [type = '', token = ''] = request.headers.authorization?.split(' ') ?? [];
      return token;
    }
    return extractTokenFromHeader(ctx.switchToHttp().getRequest());
  },
);
