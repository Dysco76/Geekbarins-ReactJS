const colors = [
    {name: "cyan", colorTop: "#53edd6", colorBottom: "#28c9b7"},
    {name: "red", colorTop: "#ff885e", colorBottom: "#ff516a"},
    {name: "violet", colorTop: "#82b1ff", colorBottom: "#665fff"},
    {name: "green", colorTop: "#a0de7e", colorBottom: "#54cb68"},
 ] 

 export const chooseRandomAvatar = () => {
     const number = Math.floor(Math.random() * 4)
     return colors[number]
 }