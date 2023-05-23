import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserRepository } from "../../repositories/IUserRepository";
import { UnauthorizedException } from "../../../../errors/UnauthorizedException";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("email or password incorrect!");
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException("email or password incorrect!");
    }

    const token = jwt.sign({}, String(process.env.PRIVATE_ACCESS_KEY), {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
