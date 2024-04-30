
document.addEventListener("DOMContentLoaded", function() {
    var gameStatus = document.getElementById("game-status");
    var startButton = document.getElementById("start-button");
  
    startButton.addEventListener("click", function() {
      gameStatus.textContent = "Oyun başladı!";
    
    });
  
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        startButton.click();
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    var gameStatus = document.getElementById("game-status");
    var startButton = document.getElementById("start-button");
    var timer;
    var startTime;
    var elapsedTime = 0;
  
    // buton kontrolü sağlar. 

    startButton.addEventListener("click", function() {   
      if (!timer) {
        startTimer();
        startButton.textContent = "Duraklat";
      } else {
        clearInterval(timer);
        timer = null;
        startButton.textContent = "Başlat";
      }
    });
  
    // zamanı ayarlar.
    function startTimer() {
      startTime = Date.now() - elapsedTime;
      timer = setInterval(function() {
        var currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateTimer(elapsedTime);
      }, 100);
    }
  
    function updateTimer(elapsedTime) {
      var seconds = Math.floor(elapsedTime / 1000);
      var minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      gameStatus.textContent = "Geçen süre: " + minutes + " dakika " + seconds + " saniye";
    }
  
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {          // enter a tıklanınca klavyeden süreyi durdurup başlatıyoruz.
        startButton.click();
      }
    });
  });
    
 


var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    // 5x5 tablo oluşturdum.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
           
            let tile = document.createElement("img");
            tile.src = "./resımler/beyaz.jpg";

           // drag sürüklemek demek daha kısa olduğu için ve daha evrensel olup yazdığım kodu herkes anlasın diye ingilizce kullanıp 
           // dragstart gibi fonksiyon adları seçtim.
            tile.addEventListener("dragstart", dragStart); //sürüklemek için tıklandığında
            tile.addEventListener("dragover", dragOver);   //sürüklerken
            tile.addEventListener("dragenter", dragEnter); // görüntüyü başkasının içine sürüklerken
            tile.addEventListener("dragleave", dragLeave); // görüntüyü uzağa sürüklediğimizde 
            tile.addEventListener("drop", dragDrop);       // görüntüyü diğer görüntünün üzerine bırakırken
            tile.addEventListener("dragend", dragEnd);      // tamamlandıktan sonrası için

            document.getElementById("board").append(tile);
        }
    }

    
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); 
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        // takas
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./resımler/" + pieces[i] + ".jpg";

        //DRAG fonksiyonları
        tile.addEventListener("dragstart", dragStart); 
        tile.addEventListener("dragover", dragOver);   
        tile.addEventListener("dragenter", dragEnter); 
        tile.addEventListener("dragleave", dragLeave); 
        tile.addEventListener("drop", dragDrop);       
        tile.addEventListener("dragend", dragEnd);      

        document.getElementById("pieces").append(tile);
    }
}


function dragStart() {
    currTile = this; //this sürüklemek için tıklanan resimi ifade ediyor
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this, üzerine bırakılan görüntüyü ifade eder
}

function dragEnd() {
    if (currTile.src.includes("beyaz")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

