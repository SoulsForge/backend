import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly sizeFile: number) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // "value" contains the file's attributes

    console.log('meta', metadata);
    console.log('value', value);

    if (value.size > this.sizeFile) {
      throw new BadRequestException(
        `Expected size is less than ${this.sizeFile}`,
      );
    }

    return true;
  }
}
