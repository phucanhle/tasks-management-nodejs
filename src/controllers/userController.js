// users controller

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
        if (bcrypt.compareSync(password, existingUser.password)) {
            return res.status(401).send({
                error: "Unauthorized",
                message: "Incorrect password",
            });
        }
        res.status(200).send({
            status: "success",
            message: existingUser,
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

        // Create a new user
        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
        });

        // Return success response
        res.status(200).json({
            status: "success",
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Signup error:", error.message);

        // Handle different error scenarios
        if (error.name === "ValidationError") {
            return res.status(400).json({
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
