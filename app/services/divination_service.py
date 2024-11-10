from ..core.claude_client import get_divination_response

class DivinationService:
    @staticmethod
    async def get_divination(user_input: str) -> str:
        return await get_divination_response(user_input) 