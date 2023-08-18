import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userRegisterDto } from 'src/DTO/register-user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginUser } from 'src/DTO/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(userregister: userRegisterDto) {
    const { username, password } = userregister;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const foundUser = await this.repo.findOne({ username });

    if (foundUser) {
      throw new BadRequestException('Username is already taken');
    } else {
      try {
        const user = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        await this.repo.create(user);
        return await this.repo.save(user);
      } catch (err) {
        throw new InternalServerErrorException(
          'something went wrong ,user is not created',
        );
      }
    }
  }

  async loginUser(userLogin: loginUser) {
    const { username, password } = userLogin;
    const user = await this.repo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const salt = user.salt;
    const ispasswordMatch = await bcrypt.compare(password, user.password);

    if (ispasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('invalid credentials');
    }
  }
}
