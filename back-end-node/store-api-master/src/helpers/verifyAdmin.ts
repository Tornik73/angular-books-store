import * as jwt from "jwt-then";
import config from "../config/config";
const verifyAdmin = async (req, res, next): Promise<any> => {
  if (!req.headers.authorization)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // check header or url parameters or post parameters for token
  const token: string = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  try {
    // verifies secret and checks exp
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
    if (!(<any>decoded).isAdmin) {
      return res.status(401).send({ auth: false, message: "Unauthorized." });
    }
    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default verifyAdmin;
