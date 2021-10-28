const backBtn = document.getElementById("back-btn");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");

const url = window.location.href + "data/";
const spinner = document.getElementById("spinner");

backBtn.addEventListener("click", () => {
  history.back();
});

$.ajax({
  type: "GET",
  url: url,
  success: (response) => {
    console.log(response);
    spinner.classList.add("not-visible");
  },
  error: (error) => {
    console.log(error);
  },
});
