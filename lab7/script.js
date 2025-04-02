// 初始化遊戲
window.onload = function() {
    const container = document.getElementById('container');
    const charCount = Math.floor(Math.random() * 3);
    container.textContent = generateRandomChars(charCount);
};

// 鍵盤事件處理
window.addEventListener("keyup", function(e) {
    const container = document.getElementById('container');
    let text = container.textContent;
    
    if (text.length > 0 && e.key === text[0]) {
        container.textContent = text.substring(1);
    }
    
    add_new_chars();
});

// 添加新字元
function add_new_chars() {
    const container = document.getElementById('container');
    const charCount = 1 + Math.floor(Math.random() * 3);
    container.textContent += generateRandomChars(charCount);
}

// 生成隨機字母
function generateRandomChars(count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return result;
}