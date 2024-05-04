import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        type: query.type || undefined,
        city: query.city || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
      },
    });

    // setTimeout(() => {
    return res.status(200).json({ success: true, posts });
    // }, 3000);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                userId: payload.id,
                postId: id,
              },
            },
          });
          return res.status(200).json({
            success: true,
            post: { ...post, isSaved: saved ? true : false },
          });
        }
      });
    }
    if (!token)
      return res
        .status(200)
        .json({ success: true, post: { ...post, isSaved: false } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to get post" });
  }
};

export const createPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const userId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId,
        postDetail: {
          create: postDetail,
        },
      },
    });
    return res.status(200).json({ success: true, post: newPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      res
        .status(404)
        .json({ success: false, message: "Post does not exists!" });

    if (post.userId !== req.userId)
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized access or operation!" });

    await prisma.post.delete({ where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Failed to delete post" });
  }
};
