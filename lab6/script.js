var count =1;
function addfunction () {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = `CLICK ME(${count})`;
    btn.setAttribute("id", "btn"+ count++);
    btn.setAttribute("class", "btn btn-outline-danger");
  console.log(btn);
    document.body.appendChild(btn);
};
function delfunction () {
    var btn = document.getElementById("btn"+ --count);
    console.log(btn);
    document.body.removeChild(btn);
};