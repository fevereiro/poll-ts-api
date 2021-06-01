import env from '../../config/env';
import { JwtAdapter } from './../../../infra/criptography/jwt-adapter/jwt-adapter';
import { makeLoginValidation } from './login-validation-factory';
import { LogControllerDecorator } from './../../decorators/log-controller-decorator';
import { Controller } from "../../../presentation/protocols"
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repo';
import { DbAuthentication } from '../../../domain/usecases/authentication/db-authentication';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repo';

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}