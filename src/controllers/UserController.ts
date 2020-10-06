import { User } from "../models/userModel";
import * as boom from "@hapi/boom";

export class UserController {
  // POST
  public addEntityRoute: any;
  // GET
  public getAllEntitiesRoute: any;
  // GET
  public getEntityByIdRoute: any;
  // PUT
  public updateEntityByIdRoute: any;
  // DELETE
  public deleteEntityByIdRoute: any;

  constructor() {
    this.initBaseRoutes();
  }

  private initBaseRoutes(): void {
    this.addEntityRoute = () => {
      return {
        method: "POST",
        path: "/user",
        handler: async (request: any, h: any) => {
          const user = await User.create(request.payload);

          return h
            .response({
              statusCode: 201,
              message: "Successfully Created",
              id: user._id,
            })
            .code(201);
        },
      };
    };

    this.getAllEntitiesRoute = () => {
      return {
        method: "GET",
        path: "/user",
        handler: async (request: any, h: any) => {
          const users = await User.find({});

          return h.response(users).code(200);
        },
      };
    };

    this.getEntityByIdRoute = () => {
      return {
        method: "GET",
        path: "/user/{id}",
        handler: async (request: any, h: any) => {
          const user = await User.findById(request.params.id);
          if (user) {
            return h.response(user).code(200);
          } else {
            return boom.notFound("user not found");
          }
        },
      };
    };

    this.updateEntityByIdRoute = () => {
      return {
        method: "PUT",
        path: "/user/{id}",
        handler: async (request: any, h: any) => {
          const user = await User.findById(request.params.id);
          if (user) {
            await User.findByIdAndUpdate(request.params.id, request.payload);

            return h
              .response({ statusCode: 200, message: "Successfully Updated" })
              .code(200);
          } else {
            return boom.notFound("user not found");
          }
        },
      };
    };

    this.deleteEntityByIdRoute = () => {
      return {
        method: "DELETE",
        path: "/user/{id}",
        handler: async (request: any, h: any) => {
          const user = await User.findById(request.params.id);
          if (user) {
            await User.findByIdAndDelete(request.params.id);

            return h
              .response({ statusCode: 200, message: "Successfully Deleted" })
              .code(200);
          } else {
            return boom.notFound("user not found");
          }
        },
      };
    };
  }

  public getRouteList(): any[] {
    return [
      this.addEntityRoute(),
      this.getAllEntitiesRoute(),
      this.getEntityByIdRoute(),
      this.updateEntityByIdRoute(),
      this.deleteEntityByIdRoute(),
    ];
  }
}
