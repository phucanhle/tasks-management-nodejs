const User = require("../src/models/userModel");
const bcrypt = require("bcrypt");
const middlewareConfig = require("../config/middlewareConfig");
const usersController = require("../src/controllers/userController");

describe("usersController", () => {
    describe("login", () => {
        it("should return 404 if user not found", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => null);

            const req = { body: { username: "nonexistent", password: "password" } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await usersController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                status: "error",
                message: "User not found",
            });
        });

        it("should return 403 if password is incorrect", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => ({ password: bcrypt.hashSync("correct_password", 10) }));

            const req = { body: { username: "existingUser", password: "incorrect_password" } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await usersController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({
                error: "Unauthorized",
                message: "Incorrect password",
            });
        });

        it("should return 200 with token on successful login", async () => {
            // Mocking dependencies
            const userId = "fakeUserId";
            User.findOne = jest.fn(() => ({ _id: userId, password: bcrypt.hashSync("correct_password", 10) }));
            middlewareConfig.generateToken = jest.fn().mockReturnValue("fakeToken");

            const req = { body: { username: "existingUser", password: "correct_password" } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await usersController.login(req, res);
            

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                message: "Login successfully",
                token: "fakeToken",
            });
        });

        it("should return 401 on authentication failure", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => {
                throw new Error("Database error");
            });

            const req = { body: { username: "existingUser", password: "correct_password" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await usersController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: "error",
                message: "Authentication failed",
                error: "Database error",
            });
        });
    });

    describe("signup", () => {
        it("should return 400 if user already exists", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => ({ username: "existingUser" }));

            const req = { body: { username: "existingUser", password: "password" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await usersController.signup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: "error",
                message: "User already exists",
            });
        });

        it("should return 200 with user details on successful signup", async () => {
            // Mocking dependencies
            const newUser = { _id: "fakeUserId", username: "newUser", password: "hashed_password" };
            User.findOne = jest.fn(() => null);
            User.create = jest.fn(() => newUser);

            const req = { body: { username: "newUser", password: "password" } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await usersController.signup(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                message: "User created successfully",
                user: { id: "fakeUserId", username: "newUser" },
            });
        });

        it("should return 400 on validation error", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => null);
            User.create = jest.fn(() => {
                throw { name: "ValidationError", errors: { username: "Invalid username" } };
            });

            const req = { body: { username: "invalidUser", password: "password" } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await usersController.signup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                status: "error",
                message: "Validation error",
                errors: { username: "Invalid username" },
            });
        });

        it("should return 500 on internal server error", async () => {
            // Mocking dependencies
            User.findOne = jest.fn(() => null);
            User.create = jest.fn(() => {
                throw new Error("Internal server error");
            });

            const req = { body: { username: "newUser", password: "password" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await usersController.signup(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: "error",
                message: "Internal server error",
            });
        });
    });
});
