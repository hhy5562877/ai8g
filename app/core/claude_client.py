import httpx
from .config import get_settings

settings = get_settings()

async def get_divination_response(user_input: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.CLAUDE_BASE_URL}/v1/chat/completions",
            headers={
                "Accept": "application/json",
                "Authorization": f"Bearer {settings.CLAUDE_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "claude-3-sonnet-20240229",
                "messages": [
                    {
                        "role": "system",
                        "content": """(require 'dash)..."""  # 这里放入完整的system prompt
                    },
                    {
                        "role": "user",
                        "content": user_input
                    }
                ]
            }
        )
        return response.json()["choices"][0]["message"]["content"] 