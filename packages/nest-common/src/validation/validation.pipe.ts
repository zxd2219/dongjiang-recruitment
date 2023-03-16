import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

// eslint-disable-next-line @typescript-eslint/ban-types
type MetaType<T> = string | boolean | number | Array<T> | Object;

@Injectable()
export class ValidationPipe<T extends object> implements PipeTransform<T> {
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance<T, T>(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(
          (error) =>
            `${Object.values(error.constraints).join(", ")}, got ${String(
              error.value
            )}`
        )
      );
    }
    return value;
  }

  private toValidate(metatype: MetaType<T>): boolean {
    const types: MetaType<T>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
