const API_KEY ='746a7e35cd31764d23dd633b';
const BASE_URL =  `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from Select");
const toCurr = document.querySelector(".to Select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    //  for (code in countryList) {
    //    console.log(code, countryList[code]);
    //  }
  
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD") {
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
 }
 
 const updateFlag = (element) =>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
 };


 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }


//console.log(fromCurr.value, toCurr.value);
 const URL = `${BASE_URL}${fromCurr.value}`;
 fetch(URL)
   .then((response) => response.json())
   .then((data) => {
      let exchangeRate = data.conversion_rates[toCurr.value];
      let finalAmount = (amtVal * exchangeRate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
   })
   .catch((error) => {
     msg.innerText = 'Error fetching exchange rate data.';
     console.error(error);
   });
 });  
