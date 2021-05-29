import { InvalidParamError } from "../../errors";
import { CompareFieldsValidation } from "./compare-fields.validation";

const makeSut = (): CompareFieldsValidation => {
    return new CompareFieldsValidation('name', 'fieldToCompare')
}
describe('CompareFieldsValidation', () => {
    test('should return an InvalidParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            name: 'any_name',
            fieldToCompare: 'wrong_value'
        })
        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    });

    test('should not return if validation succeds', () => {
        const sut = makeSut()
        const error = sut.validate({
            name: 'any_name',
            fieldToCompare: 'any_name'
        })
        expect(error).toBeFalsy()
    });
});