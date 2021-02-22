import { LogControllerDecorator } from './../decorators/log';
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account';
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account';
import { EmailValidatorAdapter } from './../../utils/email-validator';
import { SignUpController } from './../../presentation/controllers/singup/singup';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { Controller } from '../../presentation/protocols';

export const makeSignUpController = (): Controller => {
    const salt = 12
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const singUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
    return new LogControllerDecorator(singUpController)
}