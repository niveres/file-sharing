import firebase from "../firebase-conf";

const db = firebase.ref("/torrents");
class FirebaseService {
    getAll() {
        return db;
    }

    getOne(id){
        return firebase.ref("/torrents/"+id);
    }

    create(key, data) {
        return db.child(key).set(data);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new FirebaseService();
