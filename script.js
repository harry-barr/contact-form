const form = document.querySelector("form"),
  statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.display = "block";
  statusTxt.stlye.color = "#0d6efd";
  let xhr = new XMLHttpRequest(); // creating new xml object
  xhr.open("POST", "message.php", true); // sending post request to message.php file
  xhr.onload = () => {
    // once ajax loaded
    if (xhr.readyState == 4 && xhr.status == 200) {
      // if ajax response status is 200 & ready status is 4 = no error
      let response = xhr.response; //storing ajax response
      if (
        response.indexOf("Email and message fields are required") != -1 ||
        response.indexOf("Enter a valid email") ||
        response.indexOf("Sorry, failed to send your message")
      ) {
        statusTxt.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
    }
  };
  let formData = new FormData(form); // creating new FormData obj - used to send form data
  xhr.send(formData); // sending form data
};
