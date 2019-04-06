import jwt from "jsonwebtoken"
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const jwtToken = process.env.JWT_TOKEN
    if(!jwtToken){
      throw "JWT_TOKEN이 설정되지 않았습니다."
    }
    const decoded: any = jwt.verify(token, jwtToken)
    const { id } = decoded
    const user = await User.findOne({ id })
    return user
  } catch (error) {
    return undefined;
  }
}


export default decodeJWT