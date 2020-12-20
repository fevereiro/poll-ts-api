import { Controller } from './protocols/controller';
import { badRequest } from './helper/http-helper';
import { MissingParamError } from './errors/missing-param-error';
import { HttpResponse, HttpRequest } from './protocols/http';

export class SignUpController implements Controller {
    handle (httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}