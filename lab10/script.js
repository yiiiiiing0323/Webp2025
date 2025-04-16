var imglist_Url =
'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

// 2. 主函式：取得圖片清單
function getimg() {
var xhr = new XMLHttpRequest();
xhr.open('GET', imglist_Url, true);
xhr.send();
xhr.onload = function () {
  var data = JSON.parse(this.responseText);
  add_new_img(data.photos.photo);
};
}

// 3. 逐張圖片處理：使用 photo_id 取得圖片尺寸與 URL
function add_new_img(photos) {
var gal = document.getElementById("gallery");
gal.innerHTML = ""; // 清空畫面

photos.forEach(function (item) {
  getSingleImg(item.id); // 用 photo_id 去抓該張圖片網址
});
}

// 4. 抓單一圖片網址（使用 getSizes API，取 Medium）
function getSingleImg(photo_id) {
var img_Url =
  `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=${photo_id}&format=json&nojsoncallback=1`;

var xhr = new XMLHttpRequest();
xhr.open("GET", img_Url, true);
xhr.send();
xhr.onload = function () {
  var data = JSON.parse(this.responseText);
  var sizes = data.sizes.size;
  var medium = sizes.find(function (item) {
    return item.label === "Medium";
  });

  if (medium) {
    var img = document.createElement("img");
    img.setAttribute("src", medium.source);
    document.getElementById("gallery").appendChild(img);
  }
};
}