export class Token {
  access_token: string;
}


export class JwtToken {
  sub: string;
  auth: string[];
  iat: Date;
  exp: Date;
}
