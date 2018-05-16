import firebase from "firebase";
import { UserService } from "../services";

class DisposersService {

        static disposers = [];
        disposer = {
                name: '',
                amount: '',
                phonenumber: '',
                location: '',
                photoUrl: ''
        }
        
        user = UserService.getCurrentUser();


        getDisposer () {

                return new Promise((resolve,reject) => {

                        firebase.database().ref(`/Disposers/${this.user.uid}`)
                                           .once('value', (res) => {

                                                        if (res.val()) {
                                                                console.log(res.val())
                                                        }

                                                        resolve();

                                           }, reject);
                })
        }

        getDisposers () {

                return new Promise((resolve,reject) => {

                        firebase.database().ref(`/Disposers`)
                                           .once('value', (res) => {
        
                                                        if (res.val())  {
                                                                let data = res.val();
                                                                let disposers = Object.keys(data)
                                                                                      .map(key => Object.assign(data[key], {key: key}))
        
                                                                DisposersService.disposers = disposers;
                                                                resolve();
                                                        }
                                                
                                           }, err => {

                                                        reject(err);
                                                        console.log(err);
        
                                           })

                })


        }


        addDisposer (disposer)  {

                return new Promise((resolve,reject) => {

                        if (!this.user) return reject('You are logged in, please login to continue.');
                        firebase.database().ref(`/Disposers/${this.user.uid}`)
                                   .set(disposer)
                                   .then(resolve, reject)

                })

        }


        request (request) {

                return new Promise((resolve,reject) => {
                        if (!this.user) return reject('You are logged in, please login to continue.');                        
                        firebase.database().ref(`/Requests`)
                                           .push(request)
                                           .then(resolve)
                                           .catch(reject);

                })

        }


        checkDisposer ()  {

                return new Promise((resolve,reject) => {
                        if (!this.user) return;
                        firebase.database().ref(`/Disposers/${this.user.uid}`)
                                           .once('value', (res) => {
                                                        if (res.val()) return resolve(true);
                                                        resolve(false);

                                           }, reject);

                })

        }


        checkDisposerPhoto () {

                return new Promise((resolve,reject) => {

                        if (!this.user) return;
                        firebase.database().ref(`/Disposers/${this.user.uid}/photoUrl`)
                                           .once('value', (res) => {

                                                        if (res.val()) return resolve(true);
                                                        return reject(false);

                                           })

                })
        }

        
        setDisposerPhoto (photo) {
                
                return new Promise((resolve,reject) => {

                        if (!this.user) return reject('You are not logged in, please login to continue');
                        firebase.database().ref(`/Disposers/${this.user.uid}`)
                                           .set({photoUrl: photo})
                                           .then(resolve,reject);

                })

        }


        
        deleteDisposer ()  {

                return new Promise((resolve,reject) => {

                        if (!this.user) return reject('You are not logged in, please login to continue.');
                        firebase.database().ref(`/Disposers/${this.user.uid}`)
                                           .remove()
                                           .then(resolve,reject);

                })
        }




}


export { DisposersService };