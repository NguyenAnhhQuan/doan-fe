// Sử dụng XMLHttpRequest để tải dữ liệu từ phpMyAdmin

// setInterval(() => {
//   fetch('http://localhost:8888/product')
//     .then(response => response.json())
//     // .then(response => displayData(response.data))
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
// }, 2000)
// Hiển thị dữ liệu lên bảng
// function displayData(data) {
//   console.log(data)
//   var table = document.getElementById('data-table');
//   for (var i = 0; i < data.length; i++) {
//     var row = table.insertRow(i + 1);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
//     cell1.innerHTML = data[i].Humidity;
//     cell2.innerHTML = data[i].Temprature_C;
//     cell3.innerHTML = data[i].Temprature_F;
//     cell4.innerHTML = data[i].Time;
//   }
// }

// setInterval(function ( ) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     // if (this.readyState == 4 && this.status == 200) {
//     //   document.getElementById("temperature").innerHTML = this.responseText;
//     // }
//   };
//   xhttp.open("GET", "doan-d97kv03ko-nguyenanhhquan.vercel.app/product", true);
//   xhttp.send();
// }, 2000 ) ;


var gaugeTempC = new JustGage({
  id: "gaugeTempC", // the id of the html element
  value: 50,
  min: 0,
  max: 50,
  decimals: 2,
  gaugeWidthScale: 0.8,
  title: 'Nhiệt độ',
  titleFontColor: 'black',
  symbol: '°C'
});

var gaugeHumi = new JustGage({
  id: "gaugeHumi", // the id of the html element
  value: 50,
  min: 20,
  max: 90,
  decimals: 2,
  gaugeWidthScale: 0.8,
  title: 'Độ ẩm',
  titleFontColor: 'black',
  symbol: "%",
})

// update the value 
// function updateTime() {
//   const now = new Date();
//   const hours = String(now.getHours()).padStart(2, '0');
//   const minutes = String(now.getMinutes()).padStart(2, '0');
//   const seconds = String(now.getSeconds()).padStart(2, '0');

//   document.getElementById('hours').textContent = `${hours} giờ`;
//   document.getElementById('minutes').textContent = `${minutes} phút`;
//   document.getElementById('seconds').textContent = `${seconds} giây`;
// }
// setInterval(updateTime, 5000);

setInterval(() => {
  fetch('https://doan-d97kv03ko-nguyenanhhquan.vercel.app//product')
    .then(response => response.json())
    // .then(response => displayData(response.data))
    .then(response => changeGauge(response.data[0]))
    // .then(data => console.log(data))
    .catch(error => console.error(error));
    
}, 5000)

function changeGauge(data){  
  gaugeTempC.refresh(data.Temprature_C)
  gaugeHumi.refresh(data.Humidity)

  let date = new Date(data.Time)

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  document.getElementById('hours').textContent = `${hours} giờ`;
  document.getElementById('minutes').textContent = `${minutes} phút`;
  document.getElementById('seconds').textContent = `${seconds} giây`;
}
