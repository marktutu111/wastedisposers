import firebase from "firebase";
import { UserService } from "../services";

/*
*  Dispose is the person who disposed or requested for service.
*  Disposer is the company that disposed the waste.
*/ 


class DisposalService {

        static disposals = [];
        user = UserService.getCurrentUser();

        getDisposals () {
                return new Promise((resolve,reject) => {
                        
                        if (!this.user.uid) return reject('You are not logged in.');
                        firebase.database().ref(`/Disposals`)
                                           .orderByChild('disposed')
                                           .equalTo(this.user.uid)
                                           .once('value', (res) => {

                                                        if (res.val()) {

                                                                let data = res.val();
                                                                let disposals = Object.keys(data)
                                                                                      .map(key => Object.assign(data[key], {key: key}))

                                                                DisposalService.disposals = disposals;

                                                        }

                                                        resolve();

                                           }, reject)

                })
        }


}


export { DisposalService };