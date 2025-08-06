// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    enum Role { None, User, Admin }
    
    struct User {
        address userAddress;
        Role role;
        bool isRegistered;
    }
    
    mapping(address => User) public users;
    address public owner;

    event UserRegistered(address user, Role role);

    constructor() {
        owner = msg.sender;  // Contract එක deploy කරන අය admin වෙනවා
        users[owner] = User(owner, Role.Admin, true);
    }

    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Not authorized");
        _;
    }

    function registerUser(address _user, Role _role) external onlyAdmin {
        require(!users[_user].isRegistered, "User already registered");
        users[_user] = User(_user, _role, true);
        emit UserRegistered(_user, _role);
    }

    function getUserRole(address _user) external view returns (Role) {
        require(users[_user].isRegistered, "User not registered");
        return users[_user].role;
    }
}
