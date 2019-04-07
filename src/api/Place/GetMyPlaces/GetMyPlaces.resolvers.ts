import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import { GetMyPlacesResponse } from "../../../types/graphql";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );
          if (user) {
            return {
              ok: true,
              places: user.places,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "사용자를 찾을 수 없습니다.",
              places: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.messages,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
