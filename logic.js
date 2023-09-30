const naam = document.querySelector('input[type="text"]');
const resultBox = document.querySelector(".result");
const imageBox = document.querySelector(".imageIdhu");

function ok() {
  if (naam.value == "") {
    naam.placeholder = "Image URL can't be Empty";
    naam.style.border = "2px solid red";
    setTimeout(() => {
      naam.style.border = "1px solid #ccc";
      naam.placeholder = "Enter Link of Image";
    }, 1234);
    return false;
  }

  resultBox.innerHTML =
    '<img src="https://media.tenor.com/FruzrtoOhfsAAAAC/scanner.gif" alt="loader" width="100px" height="100px">';
  const linkName = naam.value;

  var myHeaders = new Headers();
  myHeaders.append("apikey", "ZZUInj8jLntriMTPrWESoCoMqjSKMKJa");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  fetch(
    `https://api.apilayer.com/nudity_detection/url?url=${linkName}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      resultBox.style.fontSize = "32px";

      const value = JSON.parse(result).value;
      if (value === 1) {
        resultBox.style.backgroundColor = "white";
        resultBox.style.color = "green";
        resultBox.innerHTML = "<center>NO Adult Content</center><br>";
      } else if (value === 2) {
        resultBox.style.backgroundColor = "white";
        resultBox.style.color = "yellow";
        resultBox.innerHTML = "<center>Safe Content</center><br>";
      } else if (value === 3) {
        resultBox.style.backgroundColor = "white";
        resultBox.style.color = "orange";
        resultBox.innerHTML = "<center>Moderate Content</center><br>";
      } else if (value === 4) {
        resultBox.style.backgroundColor = "white";
        resultBox.style.color = "purple";
        resultBox.innerHTML = "<center>High Adult Content</center><br>";
      } else if (value === 5) {
        resultBox.style.backgroundColor = "white";
        resultBox.style.color = "red";
        resultBox.innerHTML = "<center>100% adult content</center><br>";
      } else {
        resultBox.style.backgroundColor = "gray";
        resultBox.innerHTML = "<center>Image could not be processed</center>";
      }
      var img = document.createElement("img");
      img.src = linkName;
      img.width = "248";
      img.height = "200";
      imageBox.appendChild(img);
    })
    .catch((error) => console.log("error", error));
}

naam.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    ok();
  }
});
