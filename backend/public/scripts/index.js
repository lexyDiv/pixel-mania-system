const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;


 const imageData = ctx.getImageData(0, 0, width, height);

 
//  imageData.data[0] = 255
//  imageData.data[3] = 255
//  ctx.putImageData(imageData, 0, 0)

console.log(imageData.data.length)
///////////////////////////////////////////////////////////

const screenArrey = [];

for(let i = 0; i < height; i ++) {
   screenArrey.push([])
}



