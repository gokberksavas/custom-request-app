import jwt from 'jsonwebtoken'

export default (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_KEY!, (err: any, decoded: any) => {
    if (err) {
      console.error(err);

      return res.sendStatus(403); 
    }

    next();
  });
}