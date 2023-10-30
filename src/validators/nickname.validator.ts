import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

// https://github.com/typestack/class-validator#custom-validation-classes
@ValidatorConstraint({ name: 'IsNicknameForm' })
@Injectable()
export class IsNicknameFormValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (typeof value !== 'string' || value.length < 3) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `닉네임은 최소 3글자 이상이어야 합니다.`;
  }
}

export function IsNicknameForm(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNicknameForm',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNicknameFormValidator,
    });
  };
}
