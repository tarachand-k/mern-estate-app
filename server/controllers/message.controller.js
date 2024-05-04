import prisma from "../lib/prisma.js";

export const createMessage = async (req, res) => {
  const userId = req.userId;
  const { chatId } = req.params;
  const { text } = req.body;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat does not exists!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [userId],
        lastMessage: text,
      },
    });

    res.status(200).json({ success: true, message });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create message" });
  }
};
