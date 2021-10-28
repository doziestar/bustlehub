const event = document.getElementById("event");
const endBox = document.getElementById("end-box");
const loadBtn = document.getElementById("load-more");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

// liking content and sending to server using ajax
// !csrf token for django {% crsf_token %} syntax and security
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
const csrfToken = getCookie("csrftoken");

// ! like and unlike post
const likeAndUnlikePost = () => {
  const likeAndUnlikeForm = [...document.getElementsByClassName("like-unlike")];
  likeAndUnlikeForm.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const postId = e.target.getAttribute("data-form-id");
      const clickedBtn = document.getElementById(`like-unlike-${postId}`);
      $.ajax({
        type: "POST",
        url: "like-unlike/",
        data: {
          csrfmiddlewaretoken: csrf[0].value,
          pk: postId,
        },
        success: (response) => {
          console.log(response);
          clickedBtn.textContent = response.liked
            ? `Unlike (${response.like_count})`
            : `Like (${response.like_count})`;
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  });
};

// ! loading blog through ajax call
let visible = 3;
const getBlog = () => {
  $.ajax({
    type: "GET",
    url: `/load-blog/${visible}`,
    success: (response) => {
      console.log(response.data);
      const data = response.data;
      setTimeout(() => {
        spinner.classList.add("not-visible");
        data.forEach((item) => {
          console.log(item);
          event.innerHTML += `<div class="card mb-2 col-4" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.excerpt}</p>
          </div>
          <div class="card-footer">
          <div class="row">
              <div class="col">
            <a href="#" class="btn btn-primary me-md-2">Detail</a>
            </div>
              <div class="col">
            <form class="like-unlike" data-form-id="${item.id}">
            <button href="#" class="btn btn-primary" id="like-unlike-${
              item.id
            }">${
            item.liked
              ? `Unlike (${item.like_count})`
              : `Like (${item.like_count})`
          }</button>
            </form>
            </div>
              </div>
            </div>
      </div>`;
        });
        likeAndUnlikePost();
      }, 100);
      if (response.size === 0) {
        endBox.textContent = "<h1>No Post yet</h1>";
      } else if (response.size < visible) {
        endBox.innerHTML = "<h1>No More Post To Load.....</h1>";
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
};
// ! loading more post when button is clicked
loadBtn.addEventListener("click", () => {
  spinner.classList.remove("not-visible");
  visible += 3;
  getBlog();
});
getBlog();

/*
todo:
1. creating a post in the front end
2. sending the post using ajax
3. get the post back and appending it at the top of the post
 */
//  ! post details
const title = document.getElementById("id_title");
const slug = document.getElementById("id_slug");
const excerpt = document.getElementById("id_excerpt");
const detail = document.getElementById("id_detail");
// ! post form
const postForm = document.getElementById("create-post");
// !alert after post
const alertBox = document.getElementById("alert-box");

// !submit blog post to django server
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
    success: (response) => {
      console.log(response);
      event.insertAdjacentHTML(
        "afterbegin",
        `
       <div class="card mb-2 col-4" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${response.title}</h5>
            <p class="card-text">${response.excerpt}</p>
          </div>
          <div class="card-footer">
          <div class="row">
              <div class="col">
            <a href="#" class="btn btn-primary me-md-2">Detail</a>
            </div>
              <div class="col">
            <form class="like-unlike" data-form-id="${response.id}">
            <button href="#" class="btn btn-primary" id="like-unlike-${
              response.id
            }">${
          response.liked
            ? `Unlike (${response.like_count})`
            : `Like (${response.like_count})`
        }</button>
            </form>
            </div>
              </div>
            </div>
      </div>
       `
      );
      $("exampleModalLabel").modal("hide");
    },
    error: (error) => {
      console.log(error);
    },
  });
});
