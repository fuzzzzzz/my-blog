import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export function AuthGuard() {
  return applyDecorators(UseGuards(NestAuthGuard('jwt')));
}
