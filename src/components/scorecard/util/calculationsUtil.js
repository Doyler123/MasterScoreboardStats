export const calculateTotal = (scores, prop) => {
    let hasScratch = false 
    let total = scores.reduce((total, score) => {
         let value = score[prop] ? !isNaN(score[prop]) ? parseInt(score[prop])  : 0 : 0
         value = value < 0 ? 0 : value
         if(score[prop] === 0){
             hasScratch = true;
         }
         return total + value;
     }, 0);
 
     if(hasScratch && prop === 'strokes'){
         return 0
     }
 
     return total <= 0 ? 0 : total;
 }