import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from "../../../presentation/helper/validators";
import { EmailValidator } from "../../../presentation/protocols";
import { Validation } from "../../../presentation/protocols/validation";
import { makeSignUpValidation } from "./signup-validation-factory";

jest.mock('./../../../presentation/helper/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}
describe('SignUpValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
});