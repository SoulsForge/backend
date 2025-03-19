import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async create(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    return this.prisma.user.create({ data });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      const hashedPassword = bcrypt.hashSync(updateUserInput.password, 10);
      updateUserInput.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
