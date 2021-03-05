import { EmailValidation } from "../../../presentation/helper/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helper/validators/required-field-validation";
import { Validation } from "../../../presentation/helper/validators/validation";
import { ValidationComposite } from "../../../presentation/helper/validators/validation-composite";
import { EmailValidator } from "../../../presentation/protocols";
import { makeLoginValidation } from "./login-validation";

jest.mock('../../../presentation/helper/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
});