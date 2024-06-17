import { CreateUserDto } from './user.dto';
import { HttpException } from '@/exceptions/http.exception';
import { Service } from 'typedi';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import prisma from '@modules/db/prisma.service';

@Service()
export class UserService {
  public findUserById = async (userId: string) => {
    if (userId.length !== 24) {
      throw new Error('Invalid userId format');
    }
    const findUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const user = findUser;

    return user;
  };

  public createUser = async (userData: CreateUserDto): Promise<User> => {
    let findUser = await prisma.user.findFirst({ where: { email: userData.email } });
    console.log(userData);

    if (findUser) {
      throw new HttpException(409, `User with email ${userData.email} already exists`);
    }

    findUser = await prisma.user.findFirst({ where: { username: userData.username } });

    if (findUser) {
      throw new HttpException(409, `User with username ${userData.username} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    const createUser = await prisma.user.create({ data: newUser });
    return createUser;
  };
}
