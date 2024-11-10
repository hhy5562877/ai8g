document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('userInput');
    const charCount = document.getElementById('charCount');
    
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/500`;
        
        if (length >= 450) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '#6b7280';
        }
    });

    // 添加输入框动画效果
    textarea.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    textarea.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

async function getDivination() {
    const userInput = document.getElementById('userInput');
    const resultDiv = document.getElementById('result');
    const resultCard = document.getElementById('resultCard');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('span');
    
    if (!userInput.value.trim()) {
        userInput.classList.add('shake');
        setTimeout(() => userInput.classList.remove('shake'), 500);
        return;
    }
    
    try {
        submitBtn.disabled = true;
        btnText.innerHTML = '占卦中...';
        
        // 显示加载动画
        resultDiv.innerHTML = `
            <div class="loading-container">
                <div class="loading"></div>
                <div class="loading-text">正在推演卦象...</div>
            </div>
        `;
        
        const response = await fetch('/api/divine?user_input=' + encodeURIComponent(userInput.value), {
            method: 'POST'
        });
        
        if (!response.ok) {
            throw new Error('服务器响应错误');
        }
        
        const data = await response.json();
        
        // 提取SVG内容
        const svgContent = data.svg;
        
        // 创建SVG容器并添加动画效果
        resultDiv.innerHTML = `
            <div class="svg-container">
                ${svgContent}
            </div>
        `;
        
        // 触发动画
        setTimeout(() => {
            const svgContainer = resultDiv.querySelector('.svg-container');
            svgContainer.classList.add('show');
        }, 100);
        
        // 滚动到结果区域
        if (window.innerWidth <= 768) {
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
    } catch (error) {
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