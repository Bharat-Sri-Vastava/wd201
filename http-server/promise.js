// WITHOUT PROMISES
// const fetchuserdetails = (uID , callback) => {
//   console.log("Fetching");
//   setTimeout(() => {
//     callback(`User details for ${uID}`);
//   }, 1000);
// };
// const download = (imgurl, callback) => {
//   console.log("Downloading");
//   setTimeout(() => {
//     callback(`Image from ${imgurl}`);
//   }, 500);
// }
// const render = (img) =>{
//   console.log("Rendering");
// }

// fetchuserdetails("123", (imgurl) => {
//   download(imgurl, (imgdata)=>{
//     render(imgdata);
//   })
// });

// WITH PROMISES
// const fetchuserdetails = (uID) => {
//   console.log("Fetching");
//   return new Promise((resolve, reject) =>{
//     setTimeout(() => {
//       resolve(`User details for ${uID}`);
//     },500);
//   });
// };
// const download = (imgurl) => {
//   console.log("Downloading");
//   return new Promise((resolve, reject) =>{
//     setTimeout(() => {
//       resolve(`User details for ${imgurl}`);
//     },500);
//   })
// };
// const render = (img) =>{
//   console.log("Rendering");
// }

// fetchuserdetails("123")
// .then((imgurl) => download(imgurl))
// .then((imgdata) => render(imgdata))
// .catch((err) => {
//   console.log("Error");
// })

// WITH ASYNC AWAIT
const time =async (ms) => {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve("Hello");
    }, ms);
  });
};


const fetchuserdetails =async (uID) => {
    console.log("Fetching");
    await time(1000);
    return `User details for ${uID}`;
  };

  const download =async (imgurl) => {
    console.log("Downloading");
    await time(500);
    return `Image from ${imgurl}`;
  };
  const render =async (img) =>{
    await time(500);
    console.log("Rendering");
  }
 const run = async () => { 
  const imgurl = await fetchuserdetails("123");
  const imgdata = await download(imgurl);
  await render(imgdata);
 }
 run();
