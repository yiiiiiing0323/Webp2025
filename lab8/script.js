let mistakeCount = 0;
const MAX_MISTAKES = 3;
const PENALTY_CHARS = 6;

window.onload = function() {
    const container = document.getElementById('container');
    const charCount = Math.floor(Math.random() * 3);
    container.textContent = generateRandomChars(charCount);
};

// 鍵盤事件處理
window.addEventListener("keyup", function(e) {
    const container = document.getElementById('container');
    let text = container.textContent;
    
    if (text.length > 0) {
        if (e.key === text[0]) {
            // 輸入正確
            container.textContent = text.substring(1);
            mistakeCount = 0; // 重置錯誤計數
        } else {
            // 輸入錯誤
            mistakeCount++;
            if (mistakeCount >= MAX_MISTAKES) {
                // 連續錯誤三次，添加懲罰字元
                container.textContent += generateRandomChars(PENALTY_CHARS);
                mistakeCount = 0; // 重置錯誤計數
            }
        }
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