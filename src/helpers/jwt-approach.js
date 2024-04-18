import { KJUR, b64toutf8, b64utob64 } from 'jsrsasign';
import { parseToJSON } from './json';
import { WEBSITE_URL } from '../models/constants';

export const signPasswordAsToken = (password, secretKey) => {

    const header = {alg: 'HS256', typ: 'JWT'};

    // Sign JWT
    var payload = {};
    var timeNow = KJUR.jws.IntDate.get('now');
    var timeEnd = KJUR.jws.IntDate.get('now + 1hour');
    payload.iss = WEBSITE_URL; 
    payload.sub = 'marcellinr.rabe@gmail.com';
    payload.nbf = timeNow;
    payload.iat = timeNow;
    payload.exp = timeEnd;
    payload.jti = crypto.randomUUID();
    payload.aud = "user-have-just-sign-up";
    payload.password = password
    const headerJSON =  parseToJSON(header);
    const payloadJSON = parseToJSON(payload);
    const token = KJUR.jws.JWS.sign("HS256", headerJSON, payloadJSON, secretKey);
    return token
}

export const decodePasswordAsToken = (token, secretKey) => {
    try {
        const isValid = KJUR.jws.JWS.verifyJWT(token, secretKey, {alg: ['HS256']});
        console.log(isValid)
        var payload = KJUR.jws.JWS.readSafeJSONString(b64toutf8(token.split(".")[1]));
        return payload
    } catch (error) {
       console.error('Error decoding JWT:', error);
    }
}