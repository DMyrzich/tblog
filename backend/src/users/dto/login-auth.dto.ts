import { CreateAuthDto } from '../../auth/dto/create-auth.dto';

export type LoginAuthDto = Omit<CreateAuthDto, "fullName">;