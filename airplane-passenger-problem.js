/*
The answer is 1/2.  Think about it this way; as soon as someone sits in the first passenger's seat, there is a so-called "closed loop" meaning that all of the remaining passengers, including the last passenger, will be able to sit in their assigned seat.  And as soon as someone sits in the last passenger's assigned seat, the last passenger will obviously not be able to sit in their assigned seat.

If a passenger sits in any seat other than the first passenger's assigned seat or the last passenger's assigned seat, that is simply "kicking the can down the road".  Eventually, the second to last passenger to board would only have the option to sit in the first passenger's assigned seat or the last passenger's assigned seat.  Since neither of those are his seat, he would randomly pick one of the two options, meaning that when the last passenger boards, there is a 50% chance that his seat is available and a 50% chance that the first passenger's seat is available.

If the can isn't kicked all the way down the road to the second to last passenger, but instead the kth to last passenger either closes the loop or takes the last passenger's seat, well, again, the probability that he chooses the first passenger's seat is the same that he chooses the last passenger's seat.
*/

function lastPassengerInCorrectSeat(n) {

  const firstPassengerSeat = Math.floor(Math.random() * n);

  // without loss of generality, we can assume that each passenger's assigned seat number is equal to their boarding order
  // no need to loop if the first person is in his assigned seat
  if (firstPassengerSeat === 0) return true;
  // no need to loop if the first person is in the last person's assigned seat
  if (firstPassengerSeat === n - 1) return false;

  const seatArray = Array(n).fill(undefined);
  seatArray[firstPassengerSeat] = 0;
  let seatNumber;

  for (let i = 1; i < n - 1; i++) {
    seatNumber = i;
    while (seatArray[seatNumber] != undefined) {
      // someone is sitting in passenger i's seat OR
      // the seat we randomly selected is already occupied so we need to randomly select another seat
      seatNumber = Math.floor(Math.random() * n);
    }
    // exits the function once we know whether the last person will end up in their correct seat
    if (seatNumber === 0) return true;
    if (seatNumber === n - 1) return false;

    seatArray[seatNumber] = i;
  }
}

let tally = 0;
const testCases = 10000;
const numberOfSeats = 100;

for (let i = 0; i < testCases; i++) {
  if (lastPassengerInCorrectSeat(numberOfSeats)) {
    tally++;
  }
}

// with a sufficiently large number of test cases and number of seats >= 2, we should observe a value very close to 0.5
console.log(tally / testCases);