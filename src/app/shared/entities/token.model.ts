export class Token {
  access_token: string;
  user_reference: string;
}


export class JwtToken {
  sub: string;
  auth: string[];
  iat: number;
  exp: number;
}
