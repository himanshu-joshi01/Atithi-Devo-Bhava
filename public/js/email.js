

const form = document.querySelector("form");
      function sendEmail() {
        Email.send({
          SecureToken: mailToken,
          To: "himarockstar786@gmail.com",
          From: document.getElementById("email").value,
          Subject: document.getElementById("subject").value,
          Body: "Name: " + document.getElementById("name").value
            + "<br> Email: " + document.getElementById("email").value
            + " <br> Message: " + document.getElementById("message").value
        }).then(
          message => {
            if (message == "OK") {
              Swal.fire({
                title: " Success!",
                text: "Message Sent Successfully!",
                icon: "success"
              });
            }
          });
      }
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendEmail();
        form.reset();
        return false;
      });

    