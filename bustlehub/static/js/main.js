const event = document.getElementById("event");
const endBox = document.getElementById("end-box");
const loadBtn = document.getElementById("load-more");

let visible = 3;
const getBlog = () => {
  $.ajax({
    type: "GET",
    url: `/core/load-blog/${visible}`,
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
              <div class="d-grid gap-2 d-md-block">
            <a href="#" class="btn btn-primary me-md-2">Detail</a>
            <hr>

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
      </div>`;
        });
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
loadBtn.addEventListener("click", () => {
  spinner.classList.remove("not-visible");
  visible += 3;
  getBlog();
});
getBlog();

// liking content and sending to server using ajax
// csrf token for django {% crsf_token %} syntax and security
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
