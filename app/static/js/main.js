document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('userInput');
    const charCount = document.getElementById('charCount');
    
    // 自动调整文本框高度
    function autoExpand(field) {
        field.style.height = 'inherit';
        const computed = window.getComputedStyle(field);
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                    + parseInt(computed.getPropertyValue('padding-top'), 10)
                    + field.scrollHeight
                    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
        
        field.style.height = `${Math.min(height, 300)}px`;
    }
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/500`;
        
        if (length >= 450) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '#6b7280';
        }
        
        autoExpand(this);
    });

    // 初始化时调整一次高度
    autoExpand(textarea);
});

async function getDivination() {
    const userInput = document.getElementById('userInput');
    const resultDiv = document.getElementById('result');
    const resultCard = document.getElementById('resultCard');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('span');
    const loadingDiv = document.getElementById('divinationLoading');
    
    if (!userInput.value.trim()) {
        userInput.classList.add('shake');
        setTimeout(() => userInput.classList.remove('shake'), 500);
        return;
    }
    
    try {
        submitBtn.disabled = true;
        btnText.innerHTML = '占卦中...';
        
        // 显示结果卡片和加载动画
        resultCard.classList.add('show');
        resultDiv.style.display = 'none';
        loadingDiv.style.display = 'flex';
        
        // 平滑滚动到结果区域
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        const loadingTexts = [
            '聚气凝神...',
            '推演卦象...',
            '解读天机...',
            '生成卦象...'
        ];
        
        let currentTextIndex = 0;
        const loadingTextElement = loadingDiv.querySelector('.loading-text');
        const textInterval = setInterval(() => {
            loadingTextElement.textContent = loadingTexts[currentTextIndex];
            currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
        }, 2000);
        
        const response = await fetch('/api/divine?user_input=' + encodeURIComponent(userInput.value), {
            method: 'POST'
        });
        
        clearInterval(textInterval);
        
        if (!response.ok) {
            throw new Error('服务器响应错误');
        }
        
        const data = await response.json();
        
        // 隐藏加载动画，显示结果
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        
        resultDiv.innerHTML = `
            <div class="svg-container">
                ${data.svg}
            </div>
        `;
        
        setTimeout(() => {
            const svgContainer = resultDiv.querySelector('.svg-container');
            svgContainer.classList.add('show');
        }, 100);
        
    } catch (error) {
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div class="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p>占卦失败：${error.message}</p>
            </div>
        `;
    } finally {
        submitBtn.disabled = false;
        btnText.innerHTML = '开始占卦';
    }
}

// 添加页面滚动动画
function scrollToResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 监听窗口大小变化，优化响应式布局
window.addEventListener('resize', debounce(() => {
    const container = document.querySelector('.container');
    if (window.innerWidth <= 768) {
        container.style.margin = '1rem auto';
    } else {
        container.style.margin = '2rem auto';
    }
}, 250));