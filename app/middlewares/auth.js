import admin from 'firebase-admin'
import pool from "../config/database.js";

import serviceAccount from '../credential/syncpro-66baa-firebase-adminsdk-odvl3-21dc515e8e.json' assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const authMiddleware = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        const decodedToken = await admin.auth().verifyIdToken(authToken);
        const userUID = await getUserUID(decodedToken.uid);

        userUID ?? (() => { throw new Error('Usuario no encontrado'); })();

        req.userUID = userUID;
        next();

    } catch (e) {
        console.log(e)
        return res.status(401).json({
            msg: "Error de autenticación"
        });
    }
}

const getUserUID = async (uid) => {
   try {
       const [user] = await pool.query('SELECT uid FROM USER WHERE uid = ?', [uid])
       console.log(user)
       return user.length > 0 ? user.uid : null;
   } catch (e) {
       return e;
   }
}


export {
    authMiddleware
}