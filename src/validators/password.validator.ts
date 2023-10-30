import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

// https://github.com/typestack/class-validator#custom-validation-classes
@ValidatorConstraint({ name: 'IsPasswordForm' })
@Injectable()
export class IsPasswordFormValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (typeof value !== 'string') {
      throw new BadRequestException('비밀번호는 문자열이어야 합니다.');
    }
    if (value.length < 8 || !/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `비밀번호는 8글자 이상, 하나 이상의 문자, 하나 이상의 숫자가 포함되어야 합니다.`;
  }
}

export function IsPasswordForm(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPasswordForm',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPasswordFormValidator,
    });
  };
}
