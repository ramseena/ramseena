export const rounder =(number, digits)=> {
   var result = (number - Math.floor(number)) !== 0; 
   if(result)
   {
   var multiplier = Math.pow(10, digits),
       adjustedNum = number * multiplier,
       truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

   return truncatedNum / multiplier;
   }
   else{
      return( Math.round(number * 100) / 100).toFixed(digits);
   }
}