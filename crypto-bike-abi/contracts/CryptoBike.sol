pragma solidity 0.5.0;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract CryptoBike is ERC721Token, Ownable {

    /* Events */
    event BikeRented(string owner_id, string renter_id);
    event BikeReturned(string owner_id, string renter_id);

    // /* Events */
    // string public constant name = "CryptoBike";
    // string public constant symbol = "BIKE";

    /* Data Types */
    uint256 currentPrice = 3000000000000000;
    mapping (uint => Bike) bikes;
    uint numBikes;
    address public owner;

    struct Trip {
        int256 latitude; // location latitude
        int256 longitude; // location longitude
        int256 rf_id; // generated RFID
        string start_time;
        string end_time;
        string renter_id; // renter's ID
    }
    
    struct Bike {
        string model; // bike model
        string owner_id; // owner's ID
        mapping(uint => Trip) trips;
        uint numTrips;
        // Trip[] trips;
        bool active_trip;
        // string bike_id; // bike's ID
    }
    
    constructor() public ERC721Token("CryptoBike", "BIKE") {
        owner = msg.sender; // The Sender is the Owner; Ethereum Address of the Owner
    }
    
    function add_bike(string memory owner_id, string memory model) public returns (uint bike_id){
        bike_id = numBikes ++;
        // mapping(uint => Trip) storage trips;
        bikes[bike_id] = Bike(model, owner_id, 0, false);
    }
    
    function rent_bike(uint bike_id, string memory renter_id, int256 latitude, int256 longitude, int256 rf_id, string memory start_time) private returns (bool success) {
        Bike storage bike = bikes[bike_id];
        uint trip_id;

        // fail-safe
        if(bike.active_trip == true) {
            return false;
        }
        
        // Trip storage trip = Trip(latitude, longitude, rf_id, start_time, "", renter_id);
        bike.trips[trip_id] = Trip(latitude, longitude, rf_id, start_time, "", renter_id);
        bike.active_trip = true;
        
        return true;
    }
    
    function return_bike(uint bike_id, uint trip_id, string memory end_time) public returns (bool success) {
        Bike storage bike = bikes[bike_id];
        // fail-safe
        if(bike.active_trip == false) {
            return false;
        }
        
        Trip storage trip = bike.trips[trip_id];
        trip.end_time = end_time;
    }
    
}