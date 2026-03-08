// login funtion
document.getElementById("sign-in-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "admin" && password === "admin123") {
    window.location.href = "./main.html";
  } else {
    alert("Give Authentic Information");
  }
});
