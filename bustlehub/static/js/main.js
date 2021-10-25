const event = document.getElementById("event");
const loadBtn2 = document.getElementById("load-more2");

let visible2 = 2;
const getEvent = () => {
  $.ajax({
    type: "GET",
    url: `core/load-event/${visible2}`,
    // data: {},
    success: function (response) {
      console.log(response.data);
      const data2 = response.data;
      setTimeout(() => {
        spinner.classList.add("not-visible");
        data2.forEach((el) => {
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
      }, 100);
      if (response.size === 0) {
        endBox.textContent = "No Post Yet";
      } else if (response.size < visible) {
        endBox.textContent = "No More Post To Load.....";
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
};
loadBtn2.addEventListener("click", () => {
  spinner.classList.remove("not-visible");
  visible2 += 2;
  getEvent();
});
getEvent();
