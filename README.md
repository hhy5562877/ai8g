# AI 占卦系统

这是一个基于 FastAPI 和 Claude AI 的在线占卦系统。系统通过调用 Claude API 来模拟王弼的占卦风格，并以优雅的 SVG 卡片形式展示结果。

## 项目结构
```
aibg/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── claude_client.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── divination_service.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   └── templates/
│       └── index.html
├── .env
├── .gitignore
└── requirements.txt 
```
## 安装部署

1. 克隆项目
```bash
git clone https://github.com/yourusername/ai-divination-system.git
```

2. 创建虚拟环境

Linux/Mac
```bash
python -m venv venv
source venv/bin/activate 
```

Windows
```bash
python -m venv venv
.\venv\Scripts\activate
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

4. 配置环境变量
创建 `.env` 文件并添加以下内容：

```
CLAUDE_API_KEY=你的Claude_API密钥
```

5. 启动服务
```bash
uvicorn app.main:app --reload
```
服务将在 http://localhost:8000 启动

## 使用说明

1. 打开浏览器访问 http://localhost:8000
2. 在文本框中输入你想咨询的问题
3. 点击"开始占卦"按钮
4. 等待系统返回占卦结果，结果将以 SVG 卡片的形式显示

## API 文档

启动服务后，可以通过以下地址访问 API 文档：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 注意事项

- 需要有效的 Claude API 密钥
- 确保网络环境能够访问 Claude API
- 建议在生产环境中配置适当的安全措施

## 主要功能

- 在线占卦咨询
- SVG 格式的卦象展示
- 优雅的用户界面
- 异步处理请求

## 技术栈

- **后端框架**: FastAPI
- **AI 模型**: Claude 3 Sonnet
- **前端**: HTML + JavaScript
- **HTTP 客户端**: HTTPX
- **模板引擎**: Jinja2
- **配置管理**: python-dotenv
- **异步支持**: uvicorn

## 项目结构

- **app/api/**: API 路由
- **app/core/**: 核心配置和服务
- **app/services/** 