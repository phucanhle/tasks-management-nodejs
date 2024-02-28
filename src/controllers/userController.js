// users controller

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const middlewareConfig = require("../../config/middlewareConfig");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).send({
                status: "error",
                message: "User not found",
            });
        }
        if (!bcrypt.compareSync(password, existingUser.password)) {
            return res.status(403).send({
                error: "Unauthorized",
                message: "Incorrect password",
            });
        }
        const token = middlewareConfig.generateToken(existingUser._id);
        res.status(200).send({
            status: "success",
            message: "Login successfully",
            token: token,
        });
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Authentication failed",
            error: error.message,
        });
    }
};

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }

        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
        });

        res.status(200).send({
            status: "success",
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Signup error:", error.message);

        if (error.name === "ValidationError") {
            return res.status(400).send({
                status: "error",
                message: "Validation error",
                errors: error.errors,
            });
        }

        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
