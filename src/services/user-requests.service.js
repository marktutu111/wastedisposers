import firebase from "firebase";
import { UserService } from "../services";


class UserRequestService {

        static requests = [];
        static disposerRequests = [];
        user = UserService.getCurrentUser();

        getRequests () {
                return new Promise((resolve,reject) => {
                        
                        if (!this.user.uid) return reject('You are not logged in.');
                        firebase.database().ref(`/Requests`)
                                           .orderByChild('sender')
                                           .equalTo(this.user.uid)
                                           .once('value', (res) => {

                                                if (res.val()) {

                                                        let data = res.val();
                                                        let requests = Object.keys(data)
                                                                              .map(key => Object.assign(data[key], {key: key}));
                                                        
                                                        UserRequestService.requests = requests;

                                                }

                                                resolve();

                                           }, reject)

                })
        }


        getDisposerRequests () {

                return new Promise((resolve,reject) => {
                        if(!this.user) return reject('You are not logged in.');
                        firebase.database().ref(`/Requests`)
                                           .orderByChild('disposer')
                                           .equalTo(this.user.uid)
                                           .once('value', (res) => {

                                                if (res.val())  {

                                                        let data = res.val();
                                                        let requests = Object.keys(data)
                                                                              .map(key => Object.assign(data[key], {key: key}))

                                                        UserRequestService.disposerRequests = requests;
                                                }

                                                resolve();

                                           }, reject)

                })

        }

        

        cancelRequest (key)  {

                return new Promise((resolve,reject) => {

                        firebase.database().ref(`/Requests/${key}`)
                                           .update({status: 'CANCELED'})
                                           .then(resolve,reject);

                })

        }


        acceptRequest (key)  {

                return new Promise((resolve,reject) => {
                        
                        firebase.database().ref(`/Requests/${key}`)
                                           .update({status: 'ACCEPTED'})
                                           .then(resolve,reject);
                })

        }


}


export { UserRequestService };