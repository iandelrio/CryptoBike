# CryptoBike

## Description
CryptoBike is a service that allows people to rent out their bikes remotely by attaching a simple device to their bike lock.
The web app is hosted on Microsoft Azure and is built on Node.js and Azure SQL Database.

## CryptoLock Requirements
* Owner must be able to transfer cryptographic key to renter, allowing renter to unlock lock via RFID
* Owner must be able to unlock own lock
* Lock must emit alarm if forced open or if pressure sensor detects tampering

## Website Requirements
* User registration and login
* Geographical search for bikes

## Use cases:
### Requirements:
* Two users (one owner, one renter)
* One CryptoLock
### Use case 1:
  * Owner unlocks own CryptoLock
### Use case 2:
  * Renter "rents" bike from owner
  * Renter receives cryptographic key
  * Renter unlocks CryptoLock
### Use case 3:
  * Set off alarm

## Future features
* Owner gets notified:
  * when lock is locked/unlocked
  * if lock is broken
* Payment API
* Location search
* Move the alarm and the Raspberry Pi from the CryptoLock to a module on the bike
* Bike module that pings CryptoLock at regular intervals and emits alarm if:
  * loses connection for 3 consecutive pings (prevents bike from being separated from lock)
  * CryptoLock returns ping informing it has been tampered with or broken
  * (alarm would be transferred from CryptoLock to bike module)