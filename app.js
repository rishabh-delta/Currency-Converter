const baseUrl=" https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns=document.querySelectorAll("select");
let btn=document.querySelector("button")
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector("p");


for (let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        select.appendChild(newOption);
        if(select.name==="from"&&code==="USD"){
            newOption.setAttribute("selected");    
        }else if (select.name==="to"&& code=== "INR"){
            newOption.setAttribute("selected");
        }
    }
    select.addEventListener("change",(element)=>{
        console.log(element);
        updateFlag(element.target);
    })
}

const updateFlag=(el)=>{
    let currCode=el.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=el.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (event)=>{
    let amount=document.querySelector("input");
    let amtVal=amount.value;
    console.log(amtVal);
    const URL=`${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await axios.get(URL);
    console.log(response);
    let data=await response.data;
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt=amtVal*rate;
    console.log(finalAmt);
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmt} ${toCurr.value}`;
});
