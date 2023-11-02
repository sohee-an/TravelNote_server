import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    // ExecutionContext를 통해 userId를 가져온다.
    const userId = context.switchToHttp().getRequest()['userId'];
    return userId;
  },
);
