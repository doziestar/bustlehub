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

const text = document.getElementById("test");
// $.ajax({
//   type: "GET",
//   url: "/core/text/",
//   success: function (response) {
//     console.log(`success: ${response.text}`);
//     text.textContent = response.text;
//   },
//   error: function (error) {
//     console.log(`error: ${error}`);
//   },
// });
const loadBtn = document.getElementById("load-more");
const spinner = document.getElementById("spinner");
const endBox = document.getElementById("end-box");
const csrf = document.getElementsByName("csrfmiddlewaretoken");
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
const csrftoken = getCookie("csrftoken");

const likeAndUnlikePost = () => {
  const likeAndUnlikeForm = [...document.getElementsByClassName("like-unlike")];
  console.log(likeAndUnlikeForm);
  likeAndUnlikeForm.forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const clickedId = e.target.getAttribute("data-form-id");
      const clickedBtn = document.getElementById(`like-unlike-${clickedId}`);
      $.ajax({
        type: "POST",
        url: "core/like-unlike/",
        data: {
          csrfmiddlewaretoken: csrf[0].value,
          pk: clickedId,
        },
        success: function (response) {
          console.log(response);
          clickedBtn.textContent = response.liked
            ? `Unlike (${response.like_count})`
            : `Like (${response.like_count})`;
        },
        error: function (error) {
          console.log(error);
        },
      });
    })
  );
};
let visible = 3;
const getDate = () => {
  $.ajax({
    type: "GET",
    url: `/core/load-blog/${visible}`,
    success: function (response) {
      console.log(`success: ${response.data}`);
      const data = response.data;
      console.log(data);
      setTimeout(() => {
        spinner.classList.add("not-visible");
        data.forEach((el) => {
          text.innerHTML += `
      <div class="card mb-2 col-4" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.excerpt}</p>
          </div>
          <div class="card-footer">
          <div class="row">
              <div class="d-grid gap-2 d-md-block">
            <a href="#" class="btn btn-primary me-md-2">Detail</a>
            <hr>

            <form class="like-unlike" data-form-id="${el.id}">
            <button href="#" class="btn btn-primary" id="like-unlike-${
              el.id
            }">${
            el.liked ? `Unlike (${el.like_count})` : `Like (${el.like_count})`
          }</button>
            </form>
              </div>
            </div>
      </div>

        `;
        });
        likeAndUnlikePost();
      }, 100);
      // console.log(response.size);
      if (response.size === 0) {
        endBox.textContent = "No Post Yet";
      } else if (response.size < visible) {
        endBox.textContent = "No More Post To Load.....";
      }
    },
    error: function (error) {
      console.log(`error: ${error}`);
    },
  });
};
loadBtn.addEventListener("click", () => {
  spinner.classList.remove("not-visible");
  visible += 3;
  getDate();
});
getDate();

const title = document.getElementById("id_title");
const slug = document.getElementById("id_slug");
const excerpt = document.getElementById("id_excerpt");
const detail = document.getElementById("id_detail");
const postForm = document.getElementById("create-post");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "",
    data: {
      csrfmiddlewaretoken: csrf[0].value,
      title: title.value,
      slug: slug.value,
      excerpt: excerpt.value,
      detail: detail.value,
    },
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
console.log("csrf", csrf[0].value);
