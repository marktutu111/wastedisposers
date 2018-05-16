import { MAPS_API_KEY } from "../constants";
class GetLocationAddress {

        static locationAddress = '';

        address (lat,lng) {
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${MAPS_API_KEY}`)
                   .then((response) => response.json())
                   .then(res => res.results[0].formatted_address)
                   .then((address) => GetLocationAddress.locationAddress = address );
        }

}


export { GetLocationAddress };