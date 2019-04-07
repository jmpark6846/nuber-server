import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "../../../types/graphql";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.id });
          if (place) {
            if (place.userId === user.id) {
              await place.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "찾을 수 없습니다."
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
