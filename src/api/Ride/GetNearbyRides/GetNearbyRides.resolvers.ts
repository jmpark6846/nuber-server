import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import { GetNearbyRidesResponse } from "../../../types/graphql";
import User from "../../../entities/User";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRides: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        if (user.isDriving) {
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              ride: rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: "운전중이 아닙니다.",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
