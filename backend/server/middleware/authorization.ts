import jwt from 'jsonwebtoken'

export default (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY!, (err: any, payload: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    next();
  })
}