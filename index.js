// Pick a movie => Array
// Select a available seat - done
// See the total selected seat number
// See the total ticket price
// The data is stored on the localstorage

/* Variables */
//const movieChoice = document.getElementById("movieChoice"); //dropdown
const viewSeatsBtn = document.getElementById("viewSeats"); //view seat btn
//const seatRow = document.querySelectorAll(".seatRow"); // seat rows (4)
const seat = document.querySelectorAll(".seat"); //all seats div 

//Seat Panel
const regularSeats = document.querySelectorAll(".flaticon-armchair"); // all regular seats 
const vipSeats = document.querySelectorAll(".flaticon-couch"); // all vip seats 

//Price Calc
const regularTicketNum = document.querySelector(".regNum");
const vipTicketNum = document.querySelector(".vipNum");
const totalTicketNum = document.querySelector(".totalNum");
const regularSubtotal = document.querySelector(".regSub");
const vipSubtotal = document.querySelector(".vipSub");
const totalPrice = document.querySelector(".sum");

//let regularSeatArray = [];
//let vipSeatArray = [];

let regularSeatCount = 0;
let vipSeatCount = 0;
let regSubTtl = 0;
let vipSubTtl = 0;

//object
const seatPrice = {
  regular: 10,
  vip: 20
}

/* Class */
class Movie {
  constructor() {

  }
}

class Seat {
  constructor(selected, location) {
    this._selected = selected;
    this._location = location;
  }
}

// class Price {
//   constructor() {
//     this._regular = 10;
//     this._vip = 20;
//   }
// }

class UI {
  constructor() {
    this._seatType;
    this._totalPrice;
    this._totalTicketNum;
  }
  //method
  //#1 Mark the seat as selected
  static toggleSelected(target) {
    console.log("target seat is ", target);
    //add "selected" class if available, change back to "available" when clicked again
    target.classList.toggle("selected");
    console.log(target);
    UI.getSeatCount(target);
  }

  //#2 Add seats to Your Seats
  static getSeatCount(seat) {
    console.log("target seats is ", seat.classList);
    //check seat type
    (seat.classList.contains("flaticon-armchair")) ? UI._seatType = "regular" : UI._seatType = "vip";

    console.log(UI._seatType); //regular or vip

    //count the number of tickets
    if (UI._seatType === "regular") {
      regularSeatCount++;
      regularTicketNum.innerHTML = regularSeatCount; //display reg ticket num
      console.log("regular Seat count is ", regularSeatCount);
      UI.calcTotalPrice(regularSeatCount, UI._seatType);
    } else if (UI._seatType === "vip") {
      vipSeatCount++;
      vipTicketNum.innerHTML = vipSeatCount; //display vip ticket num
      console.log("vip Seat count is ", vipSeatCount);
      UI.calcTotalPrice(vipSeatCount, UI._seatType);
    }

    UI._totalTicketNum = regularSeatCount + vipSeatCount;
    totalTicketNum.innerHTML = UI._totalTicketNum;

    return regularSeatCount, vipSeatCount, UI._seatType;
  }

  //#3 Calculate the price and show total
  static calcTotalPrice(seatNum, seatType) {

    //sub total
    if (seatType === "regular") {
      console.log("calc reg")
      regSubTtl = seatPrice["regular"] * seatNum;
      regularSubtotal.innerHTML = `$ ${regSubTtl}`;
    } else if (seatType === "vip") {
      console.log("calc vip")
      vipSubTtl = seatPrice["vip"] * seatNum;
      vipSubtotal.innerHTML = `$ ${vipSubTtl}`;
    }
    //total
    console.log("reg sub total is ", regSubTtl, vipSubTtl);

    UI._totalPrice = regSubTtl + vipSubTtl;
    totalPrice.innerHTML = `$ ${UI._totalPrice}`;

  }

}

//When view seats button is clicked
//display seat map

/* When the seat is selected */
//add "selected" class to the target
//regular
for (let i = 0; i < regularSeats.length; i++) {
  regularSeats[i].addEventListener("click", (event) => {
    UI.toggleSelected(event.target);
  });
};
//vip
for (let i = 0; i < vipSeats.length; i++) {
  vipSeats[i].addEventListener("click", (event) => {
    UI.toggleSelected(event.target);
  });
};

// set selected = true == > can judge from the class

//つづき　Selectedからキャンセルした時

// #1 change the availability to selected 
// #2 add to the regularSeatArray and vipSeatArray
// #3 local storage

//price calculation

//=======================================Testing for mobile
// var touchEvent = ((window.ontouchstart !== null) ? 'click' : 'touchstart');

// $(document).on(touchEvent, '#viewSeats', function () {
//   alert("JQuery button is clicked");
// });


// viewSeatsBtn.addEventListener("click", () => {
//   alert("button is clicked");
// });

function btnTest() {
  alert("view seat button is clicked");
};

//=======================================Testing for mobile
class Test {
  constructor() {
    this._seatType;
    this._totalPrice = 0; //set initial value 0
    this._totalTicketNum;
  }
  test() {
    console.log(this._totalPrice);
   }
}
let a = new Test();
a.test();

class Test2 {
  constructor() {
    this._seatType;
    this._totalPrice = 0; //set initial value 0
    this._totalTicketNum;
  }
  static test() {
    console.log(Test2._totalPrice);
   }
}
Test2.test();