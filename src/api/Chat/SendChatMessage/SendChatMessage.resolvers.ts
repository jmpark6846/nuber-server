import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graphql";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        const { text, chatId } = args;
        const chat = await Chat.findOne({ id: chatId });
        if (chat) {
          if (chat.passengerId === user.id || chat.driverId === user.id) {
            try {
              const message = await Message.create({
                text,
                chat,
                user
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            } catch (error) {
              return {
                ok: false,
                error: error.message,
                message: null
              };
            }
          } else {
            return {
              ok: false,
              error: "권한이 없습니다.",
              message: null
            };
          }
        } else {
          return {
            ok: false,
            error: "채팅을 찾을 수 없습니다.",
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
