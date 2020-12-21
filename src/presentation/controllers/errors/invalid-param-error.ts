export class InvalidParamError extends Error {
    constructor(paramName: string) {
        super(`Invalid Param Error ${paramName}`)
        this.name = 'InvalidParamError'
    }
}