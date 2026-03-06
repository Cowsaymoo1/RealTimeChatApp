import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import {
  emitNewMessage,
  updateConversationAfterCreateMessage,
} from "../utils/messageHelper.js";

import { io } from "../socket/index.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    let conversation;

    if (!content) {
      return res.status(400).json({ message: "Missing content!" });
    }

    if (!recipientId && !conversationId) {
      return res
        .status(400)
        .json({ message: "recipientId or conversationId is required" });
    }

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    } else {
      // Try to reuse an existing direct conversation between the two users
      if (!recipientId) {
        return res
          .status(400)
          .json({ message: "recipientId or conversationId is required" });
      }

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [senderId, recipientId] },
      });

      if (!conversation) {
        // Create new conversation if none exists
        conversation = await Conversation.create({
          type: "direct",
          participants: [
            { userId: senderId, joinedAt: new Date() },
            { userId: recipientId, joinedAt: new Date() },
          ],
          lastMessageAt: new Date(),
          unreadCounts: new Map(),
        });
      }
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });
    const fullMessage = await Message.findById(message._id);

    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();
    emitNewMessage(io, conversation, message);

    return res.status(201).json({ message: fullMessage });
  } catch (error) {
    console.error("Error in sendDirectMessage:", error);
    return res.status(500).json({ message: "Failed to send message" });
  }
};
export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    let conversation = req.conversation;

    if (!content) {
      return res.status(400).json({ message: "Missing content!" });
    }

    // Fallback: if conversation not set by middleware, fetch it
    if (!conversation) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });
    const fullMessage = await Message.findById(message._id).populate(
      "senderId",
      "userName displayName",
    );

    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();
    emitNewMessage(io, conversation, message);

    return res.status(201).json({ message: fullMessage });
  } catch (error) {
    console.error("Error in sendGroupMessage:", error);
    return res.status(500).json({ message: "Failed to send group message" });
  }
};
