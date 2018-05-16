import firebase from "firebase";

class UserService {

            static loggedIn = false;

            static getCurrentUser () {

                    return UserService.user = firebase.auth().currentUser;

            }


            login (user)  {
                    return new Promise((resolve,reject) => {

                        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                                .then(() => UserService.loggedIn = true)
                                .then(resolve,reject);

                    })
            }

            signUp (user)  {
                return new Promise((resolve,reject) => {

                        firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
                                       .then(resolve,reject);

                })
            }

            updateUser (data)  {
                return new Promise((resolve,reject) => {
                        
                        firebase.database().ref(`/Profiles/${data.key}`)
                                           .update({ name: data.name, 
                                                     phonenumber: data.phonenumber,
                                                     photoUrl: ''})
                                           .then(resolve,reject);

                })

            }


            resetPassword (email) {
                return new Promise((resolve,reject) => {

                        firebase.auth().sendPasswordResetEmail(email)   
                                       .then(resolve,reject);

                })
            }


            logout ()  {

                return new Promise((resolve,reject) => {

                        firebase.auth().signOut()
                                       .then(() => UserService.loggedIn = false)
                                       .then(resolve,reject);

                })
            }



}


export { UserService };