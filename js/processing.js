import data from "./data.json" assert {type: 'json'};

// const button=document.querySelector(".button");
// button.addEventListener('click', process);
let min=0;
const name= document.getElementById("name_card");
const fees= document.getElementById("fees_card");
const placement= document.getElementById("placement_cards");
process()

function process(){
   const store=[];
   
   data.map((value)=>{
    const ratio=value.fees/value.placement;
    store.push(ratio);
   })
   
   for(let i=0;i<store.length;i++){
       if(store[i]<store[min]){
         min=i;
       }
   }

   console.log(data[min]);

   name.innerHTML=data[min].name;
   fees.innerHTML=data[min].fees;
   placement.innerHTML=data[min].placement;
   console.log(store);
}


