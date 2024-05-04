import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        password: false,
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        password: false,
      },
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const getProfilePosts = async (req, res) => {
  const userId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
    });
    console.log(userPosts);

    const saved = await prisma.savedPost.findMany({
      where: { userId },
      include: { post: true },
    });

    const savedPosts = saved.map((item) => item.post);
    console.log(savedPosts);

    res.status(200).json({ success: true, userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to profile posts" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.userId)
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized access!" });

  const { password, avatar, ...otherData } = req.body;
  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...otherData,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        password: false,
      },
    });

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.userId)
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized access!" });

  try {
    await prisma.user.delete({ where: id });

    res
      .status(204)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res
        .status(203)
        .json({ success: true, message: "Post unsaved from saved list" });
    }

    await prisma.savedPost.create({
      data: {
        userId,
        postId,
      },
    });

    return res.status(200).json({ success: true, message: "Post saved" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to delete post" });
  }
};
