import { Request, Response } from "express";
import { ApiResponse } from "../interfaces/response.interface";
import { User, UserModel } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

type AsyncRequestHandler<T = any> = (
  req: Request,
  res: Response<ApiResponse<T>>
) => Promise<void>;

export const getUsers: AsyncRequestHandler<User[]> = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json({
      success: true,
      code: 200,
      data: users,
      count: users?.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      code: 500,
      message: "Error fetching users",
    });
  }
};

export const getUserById: AsyncRequestHandler<User> = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic UUID format validation
    // if (
    //   !id ||
    //   !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{4}-[89abAB][0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    //     id
    //   )
    // ) {
    //   res.status(400).json({
    //     success: false,
    //     code: 400,
    //     message: "Invalid UUID format",
    //   });
    //   return;
    // }

    const user = await UserModel.getById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        code: 404,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      code: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      code: 500,
      message: "Error fetching user",
    });
  }
};

export const createUser: AsyncRequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res.status(400).json({
        success: false,
        code: 400,
        message: "Missing required fields: name, email, phone",
      });
      return;
    }

    const newUserId = await UserModel.create({
      name,
      email,
      phone,
    });
    res.status(201).json({
      success: true,
      code: 201,
      data: { id: newUserId },
      message: "User created successfully",
    });
  } catch (error: any) {
    console.error("Create user error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        success: false,
        code: 409,
        message: "Email already exists",
      });
      return;
    }
    res.status(500).json({
      success: false,
      code: 500,
      message: "Error creating user",
    });
  }
};

export const updateUser: AsyncRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // if (
    //   !id ||
    //   !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{4}-[89abAB][0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    //     id
    //   )
    // ) {
    //   res.status(400).json({
    //     success: false,
    //     code: 400,
    //     message: "Invalid UUID format",
    //   });
    //   return;
    // }

    const updateData = req.body;
    const updated = await UserModel.update(id, updateData);

    if (!updated) {
      res.status(404).json({
        success: false,
        code: 404,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      code: 200,
      message: "User updated successfully",
    });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        success: false,
        code: 409,
        message: "Email already exists",
      });
      return;
    }
    res.status(500).json({
      success: false,
      code: 500,
      message: "Error updating user",
    });
  }
};

export const deleteUser: AsyncRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // if (
    //   !id ||
    //   !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{4}-[89abAB][0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    //     id
    //   )
    // ) {
    //   res.status(400).json({
    //     success: false,
    //     code: 400,
    //     message: "Invalid UUID format",
    //   });
    //   return;
    // }

    const deleted = await UserModel.delete(id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        code: 404,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      code: 200,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      code: 500,
      message: "Error deleting user",
    });
  }
};
