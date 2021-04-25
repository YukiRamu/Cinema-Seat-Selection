// Pick a movie => Array
// The data is stored on the localstorage

/* Variables */
//const movieChoice = document.getElementById("movieChoice"); //dropdown
const viewSeatsBtn = document.getElementById("viewSeats"); //view seat btn
//const seatRow = document.querySelectorAll(".seatRow"); // seat rows (4)
const seat = document.querySelectorAll(".seat"); //all seats div 

//Seat Panel
const regularSeats = document.querySelectorAll(".regSeat"); // all regular seats 
const vipSeats = document.querySelectorAll(".vipSeat"); // all vip seats 

//Price Calc
const regularTicketNum = document.querySelector(".regNum");
const vipTicketNum = document.querySelector(".vipNum");
const totalTicketNum = document.querySelector(".totalNum");
const regularSubtotal = document.querySelector(".regSub");
const vipSubtotal = document.querySelector(".vipSub");
const totalPrice = document.querySelector(".sum");

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
  constructor(seatType, isSelected) {
    this._seatType = seatType; //regular or vip
    this._isSelected = isSelected // is "selected" in classLise? true or false

    this._totalTicketNum = 0;
    this._totalPrice;
  }
  //static property
  static regularSeatCount = 0;
  static vipSeatCount = 0;
  static regSubTtl = 0;
  static vipSubTtl = 0;
  //method
  //#1 add "selected" class to the target or remove it 
  toggleSelected(target) {
    target.classList.toggle("selected");
  }

  //#2 Add seats to Your Seats Panel
  addSeat() {
    //count the number of tickets
    if (this._seatType === "regular") {
      UI.regularSeatCount++;
      regularTicketNum.innerHTML = UI.regularSeatCount; //display reg ticket num
      UI.calcTotalPrice(UI.regularSeatCount, this._seatType);
    } else if (this._seatType === "vip") {
      UI.vipSeatCount++;
      vipTicketNum.innerHTML = UI.vipSeatCount; //display vip ticket num
      UI.calcTotalPrice(UI.vipSeatCount, this._seatType);
    }
    //total ticket cound
    this._totalTicketNum = UI.regularSeatCount + UI.vipSeatCount;
    totalTicketNum.innerHTML = this._totalTicketNum;
  }

  //#3 Calculate the price and show total
  static calcTotalPrice(seatNum, seatType) {
    //sub total
    if (seatType === "regular") {
      UI.regSubTtl = seatPrice["regular"] * seatNum;
      regularSubtotal.innerHTML = `$ ${UI.regSubTtl}`;
    } else if (seatType === "vip") {
      UI.vipSubTtl = seatPrice["vip"] * seatNum;
      vipSubtotal.innerHTML = `$ ${UI.vipSubTtl}`;
    }
    //total ticket price
    this._totalPrice = UI.regSubTtl + UI.vipSubTtl;
    totalPrice.innerHTML = `$ ${this._totalPrice}`;
  }

  //#4 Remove seats from Your Seats panel
  removeSeat() {
    //recount the number of tickets
    if (this._seatType === "regular") {
      UI.regularSeatCount--;
      regularTicketNum.innerHTML = UI.regularSeatCount; //display reg ticket num
      UI.calcTotalPrice(UI.regularSeatCount, this._seatType);
    } else if (this._seatType === "vip") {
      UI.vipSeatCount--;
      vipTicketNum.innerHTML = UI.vipSeatCount; //display vip ticket num
      UI.calcTotalPrice(UI.vipSeatCount, this._seatType);
    }
    //total ticket count
    this._totalTicketNum = UI.regularSeatCount + UI.vipSeatCount;
    totalTicketNum.innerHTML = this._totalTicketNum;
  }
}

/* When the seat is selected */
//regular
for (let i = 0; i < regularSeats.length; i++) {
  regularSeats[i].addEventListener("click", (event) => {
    //get the data from local strage
    //seatcount--> pass it to the instance both reg and vip

    if (event.target.classList.contains("selected")) {
      let regular = new UI("regular", true);
      regular.toggleSelected(event.target);
      regular.removeSeat();
    } else {
      let regular = new UI("regular", false);
      regular.toggleSelected(event.target);
      regular.addSeat();
    }
  });
};
//vip
for (let i = 0; i < vipSeats.length; i++) {
  vipSeats[i].addEventListener("click", (event) => {
    //seatcount--> pass it to the instance both reg and vip

    if (event.target.classList.contains("selected")) {
      let vip = new UI("vip", true);
      vip.toggleSelected(event.target);
      vip.removeSeat();
    } else {
      let vip = new UI("vip", false);
      vip.toggleSelected(event.target);
      vip.addSeat();
    }
  });
};

/* When "view Seats" button is clicked */
const displaySeatMap = () => {
  alert("view seat button is clicked");
};

/* When "Add to cart" button is clicked */
const addToCart = () => {
  alert("add to cart button is clicked");
};






