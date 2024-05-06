import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const userId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });

    for (const chat of chats) {
      const recieverId = chat.userIDs.find((id) => id !== userId);
      const reciever = await prisma.user.findUnique({
        where: {
          id: recieverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.reciever = reciever;
    }

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get chats" });
  }
};

export const getChat = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await prisma.chat.update({
      where: {
        id,
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });
    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userIDs: {
          hasSome: [userId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    console.log(chat);

    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const createChat = async (req, res) => {
  const userId = req.userId;
  const { recieverId } = req.body;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [userId, recieverId],
      },
    });

    res.status(200).json({ success: true, chat: newChat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const readChat = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });

    res.status(204).json({ success: true, chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};
