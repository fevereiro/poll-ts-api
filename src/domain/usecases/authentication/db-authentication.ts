import { Authentication, AuthenticationModel } from "../authentication"
import { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAcessTokenRepository } from "./db-authentication-protocols"

export class DbAuthentication implements Authentication {

    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly tokenGenerator: Encrypter,
        private readonly updateAcessTokenRepository: UpdateAcessTokenRepository) {
    }

    async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this.tokenGenerator.encrypt(account.id)
                await this.updateAcessTokenRepository.updateAcessToken(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}