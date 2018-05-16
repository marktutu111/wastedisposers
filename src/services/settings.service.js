import firebase from "firebase";
import { UserService } from "../services";


class SettingsService {

        user = UserService.getCurrentUser();
        static profile = {
                name: '',
                phonenumber: '',
                photoUrl: '',
                mobilemoneyWallet: null
        }

        addPayment (phonenumber)  {

                return new Promise((resolve,reject) => {

                        if (!this.user) return reject('You are not logged in.');
                        firebase.database().ref(`/Profiles/${this.user.uid}`)
                                           .set({mobilemoneyWallet: phonenumber})
                                           .then(resolve,reject);

                })

        }


        updateProfile (data)  {

                return new Promise((resolve,reject) => {

                        firebase.database().ref(`/Profiles/${this.user.uid}`)
                                        .update(data)
                                        .then(resolve,reject);

                })

        }


        fetchProfile () {

            return new Promise((resolve,reject) => {

                    firebase.database().ref(`/Profiles/${this.user.uid}`)
                                       .once('value', (res) => {
                                               
                                               if (res.val()) {

                                                       let base64 = res.val().photoUrl;
                                                       SettingsService.profile = res.val();
                                                       SettingsService.profile.photoUrl = 'data:image/jpeg;base64,' + base64;
                                                };
                                                
                                               resolve();

                                       }, reject );

                })

        }



        getUsername ()  {

                return new Promise((resolve,reject) => {
                        firebase.database().ref(`/Profiles/${this.user.uid}/name`)
                                           .once('value', (res) => {

                                                   if (res.val()) return resolve(res.val());
                                                   resolve('');

                                           }, reject);
                })

        }

        
        removePayment ()  {

                return new Promise((resolve,reject) => {
                        if (!this.user) return reject('You are not logged in, please login to continue.');
                        firebase.database().ref(`/Profiles/${this.user.uid}/mobilemoneyWallet`)
                                           .remove()
                                           .then(resolve,reject);

                })
        }
        


}




export {SettingsService };