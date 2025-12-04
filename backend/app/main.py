from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.data import router as data_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_router, prefix="/data", tags=["data"])


@app.get("/")
async def read_root():
    return {"Hello": "World"}
