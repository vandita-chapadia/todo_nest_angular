import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    //get current user info
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
