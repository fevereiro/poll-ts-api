import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

interface SutTypes {
    sut: LogControllerDecorator,
    controllerStub: Controller
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const sut = new LogControllerDecorator(controllerStub)
    return {
        sut,
        controllerStub
    }
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse = {
                statusCode: 200,
                body: {
                    name: 'Denis'
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub()
}

describe('LogController Decorator', () => {
    test('should call controller handle', async () => {
        const { controllerStub, sut } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    });
});