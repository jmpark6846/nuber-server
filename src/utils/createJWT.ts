import jwt from "jsonwebtoken";

const createJWT = (id: number): string => {
  const jwtToken = process.env.JWT_TOKEN
  if(!jwtToken){
    throw "JWT_TOKEN이 설정되지 않았습니다."
  }
  return jwt.sign({ id }, jwtToken);
};

export default createJWT;
