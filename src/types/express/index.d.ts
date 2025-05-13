import { ApiResponse } from "../../interfaces/response.interface";

declare global {
  namespace Express {
    interface Response {
      json: (body: ApiResponse) => this;
    }
  }
}
