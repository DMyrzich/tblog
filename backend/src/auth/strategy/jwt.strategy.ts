import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from '../../users/entities/users.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('access_token'),
            ignoreExpiration: false,
            secretOrKey: 'тест',
        });
    }

    async validate(payload: { email: string, id: number }): Promise<UsersEntity> {

        const user = await this.usersService.findByOne({ email: payload.email, id: payload.id })

        if (!user) {
            throw new UnauthorizedException();
        }

        delete user.password;

        return user;
    }
}