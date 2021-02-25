import { AccountModel, Encrypter, AddAccountModel, AddAccountRepository } from "./db-add-account-protocols"
import { DbAddAccount } from "./db-add-account"

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        add (accountData: AddAccountModel): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
})

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccount Usecase', () => {
    test('should call Encrypter with correct password ', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.add(makeFakeAccountData())
        expect(encryptSpy).toHaveBeenLastCalledWith('valid_password')
    });

    test('should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(makeFakeAccountData())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })


    test('should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(makeFakeAccountData())
        expect(account).toEqual(makeFakeAccount())
    })

})