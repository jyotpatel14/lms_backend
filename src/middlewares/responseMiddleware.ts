// src/middleware/responseMiddleware.ts
import { Request, Response, NextFunction } from "express";

export interface StandardResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T | T[] | null;
  count: number | null;
}

export interface CustomResponse extends Response {
  sendResponse: <T = any>(options: Partial<StandardResponse<T>>) => void;
}

export function responseMiddleware(
  req: Request,
  res: CustomResponse,
  next: NextFunction
): void {
  res.sendResponse = function <T>({
    success = true,
    code = 200,
    message = "Success",
    data = null,
    count = null,
  }: Partial<StandardResponse<T>>) {
    const isArray = Array.isArray(data);
    const response: StandardResponse<T> = {
      success,
      code,
      message,
      data,
      count: count !== null ? count : isArray ? data.length : data ? 1 : 0,
    };

    res.status(code).json(response);
  };

  next();
}
