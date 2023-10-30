import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Password Constraint', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
  validate(value: string): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    const isMatch = regex.test(value);

    return isMatch;
  }

  // [GeneratedRegex()]
  //   private static partial Regex RegexNumber();

  //   [GeneratedRegex("")]
  //   private static partial Regex RegexLower();

  //   [GeneratedRegex("")]
  //   private static partial Regex RegexUpper();

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'invalid password';
  }
}
