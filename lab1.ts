import * as readline from "readline/promises";
class CartItem {
  itemCode: string;
  description: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;

  constructor(itemCode: string, description: string, quantity: number, pricePerUnit: number) {
    this.itemCode = itemCode;
    this.description = description;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
    this.totalPrice = quantity * pricePerUnit;
  }
}

const cart: CartItem[] = [];

async function main() {

    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let isflag : boolean = true;

    while(isflag){

    
      // get thet inputs 
      const itemCode  = await r1.question("Item Code : ");
      const description  = await r1.question("Description : ");
      const quantity = Number(await r1.question("Quantity : "));
      const pricePerUnit = Number(await r1.question("PricePerUnit : "));


      const item1: CartItem = new CartItem(itemCode,description,quantity,pricePerUnit);
      cart.push(item1);
      //console.log(cart);

      const decision :string = await r1.question("Do you want to add more items [y/n] : ");
      if(decision == "n"){
        isflag = false;
      }
    }

    console.log("Printing entire cart items : ");
    console.log(cart);
    let globalTotal = 0.0;
    for(const i of cart){
      globalTotal += i.totalPrice;
    }
    console.log("Grand Total : " + globalTotal);




    r1.close();



}
main();