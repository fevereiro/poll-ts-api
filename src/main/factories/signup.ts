import { ValidationComposite } from './../../presentation/helper/validators/validation-composite';
import { LogMongoRepository } from './../../infra/db/mongodb/log-repository/log';
import { LogControllerDecorator } from './../decorators/log';
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account';
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account';
import { SignUpController } from './../../presentation/controllers/singup/singup';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { Controller } from '../../presentation/protocols';
import { makeSignUpValidation } from './signup-validation';

export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const singUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(singUpController, logMongoRepository)
}