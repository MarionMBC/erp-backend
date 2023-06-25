class User {
    constructor(id, uid, username, email, password, rememberToken, twoFactorSecret, idUserRoleFK, status) {
        this.id = id;
        this.uid = uid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rememberToken = rememberToken;
        this.twoFactorSecret = twoFactorSecret;
        this.idUserRoleFK = idUserRoleFK;
        this.status = status;
    }

}