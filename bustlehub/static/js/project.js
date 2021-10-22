/* Project specific Javascript goes here. */
document.getElementById("stop").addEventListener("click", loadText);
function loadText() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/v1/blog/", true);
  xhr.onload = function () {
    if (this.status == 200) {
      //   console.log(this.responseText);
      let blog = JSON.parse(this.responseText);
      let output = "";
      for (let post in blog) {
        output += `<ul>
          <li>id: ${blog[post].id}</li>
          <li>title: ${blog[post].title}</li>
          <li>author: ${blog[post].author}</li>
          <li>slug: ${blog[post].slug}</li>
          <li>detail: ${blog[post].detail}</li>
          </ul>`;
      }
      document.getElementById("text").innerHTML = output;
    } else if (this.status == 404) {
      document.getElementById("text").innerHTML = "Not Found";
    }
  };
  xhr.send();
}

document.getElementById("start").addEventListener("click", loadText2);
function loadText2() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/users/dozie781", true);
  xhr.onload = function () {
    if (this.status == 200) {
      //   console.log(this.responseText);
      document.getElementById("text").innerHTML = this.responseText;
    }
  };
  xhr.send();
}
document.getElementById("play").addEventListener("click", loadText3);
function loadText3() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/about", true);
  xhr.onload = function () {
    if (this.status == 200) {
      //   console.log(this.responseText);
      document.getElementById("text").innerHTML = this.responseText;
    }
  };
  xhr.send();
}
