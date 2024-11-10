from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from .api.endpoints import router

app = FastAPI(title="AI占卦系统")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.include_router(router, prefix="/api")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}) 