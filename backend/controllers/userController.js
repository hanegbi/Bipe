import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

//@desc      Auth user & get token
//@route     POST  /api/user/login
//@access    public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // if (user.isVerified == false) {
    //     res.status(401)
    //     throw new Error('User is not verified, please check your email')
    // }
    const isVerified = user.isVerified === true;
    const isPasswordMatch = await user.matchPassword(password);

    if (isVerified && isPasswordMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            hasGroup: user.hasGroup,
            household: user.household,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc      Register a new user
//@route     POST  /api/users
//@access    public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        // homeAddress,
        // workAddress,
        isVerified: false,
    });

    const UserToken = generateToken(user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            homeAddress: user.homeAddress,
            workAddress: user.workAddress,
            hasGroup: user.hasGroup,
            household: user.household,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: UserToken,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

    try {
        const url = `http://localhost:5000/api/users/verification/${user._id}`;
        await transporter.sendMail({
            to: user.email,
            subject: "Bipe - Email Validation",
            html: `<h4>Hello ${user.name},</h4>
            <h5>Thanks for registration to Bipe!</h5>
            <p>Please click on the link below to verify your account.</p>
            <p><a href="${url}">Verify your account</a></p>
            `,
        });
    } catch (error) {
        console.log(error);
    }
});

//@desc      Verify user profile
//@route     GET /api/users/verification
//@access    public
const verifyUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const redirectUrl = `http://localhost:3000/verified/${userId}`;
    try {
        const updateField = { $set: { isVerified: true } };
        await User.findByIdAndUpdate(userId, updateField);

        res.redirect(`${redirectUrl}/true`);
    } catch (error) {
        console.log(error);
        res.redirect(`${redirectUrl}/false`);
    }
});

//@desc      Get user profile
//@route     GET /api/users/profile
//@access    Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            homeAddress: user.homeAddress,
            workAddress: user.workAddress,
            hasGroup: user.hasGroup,
            household: user.household,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc      Get All users
//@route     GET /api/users
//@access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const name = req.query.name
        ? {
              name: {
                  $regex: req.query.name,
                  $options: "i",
              },
          }
        : {};
    const email = req.query.email
        ? {
              name: {
                  $regex: req.query.email,
                  $options: "i",
              },
          }
        : {};
    const isAdmin = req.query.admins === "true" ? { isAdmin: true } : {};

    const users = await User.find({
        ...name,
        ...email,
        ...isAdmin,
    });
    res.json(users);
});

//@desc      Delete user
//@route     DELETE /api/users/:ID
//@access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc      Get grt user by ID
//@route     GET /api/users/:id
//@access    Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    registerUser,
    verifyUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
