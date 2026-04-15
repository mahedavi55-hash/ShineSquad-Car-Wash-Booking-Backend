import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '../../../application/use-cases/auth/RegisterUser';
import { LoginUser } from '../../../application/use-cases/auth/LoginUser';
import { sendSuccess } from '../response/ApiResponse';

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerUser.execute(req.body);
      sendSuccess(res, 201, 'User registered successfully.', user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.loginUser.execute(req.body);
      sendSuccess(res, 200, 'Login successful.', result);
    } catch (error) {
      next(error);
    }
  };
}
