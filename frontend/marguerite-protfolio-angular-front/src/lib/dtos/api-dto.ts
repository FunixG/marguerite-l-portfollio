/**
 * ApiDTO base class sent by all requests on FunixAPI and PacifistaAPI
 */
export abstract class ApiDTO {
    public id?: string;

    public createdAt?: Date;

    public updatedAt?: Date;

}