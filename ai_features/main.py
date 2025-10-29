from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from langchain.embeddings import GoogleGenerativeAIEmbeddings
from langchain.chat_models import ChatGoogleGenerativeAI
from langchain.docstore.document import Document
import pickle
from langchain.vectorstores import FAISS


load_dotenv()




app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001",google_api_key=GEMINI_API_KEY)
model = ChatGoogleGenerativeAI(model="models/gemini-2.5-flash",google_api_key=GEMINI_API_KEY)

INDEX_PATH = "faiss_index.pkl"

if os.path.exists(INDEX_PATH):
    with open(INDEX_PATH, "rb") as f:
        vectorstores = pickle.load(f)
else:
    vectorstores = FAISS.from_texts(["init"], embeddings)
  

def save_index():
    with open(INDEX_PATH, "wb") as f:
        pickle.dump(vectorstores, f)


# routes

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/embed-job")
async def embed_job(request: Request):
    try:
        data = await request.json()
        title = data.get("title", "")
        description  = data.get("description", "")

        if not title or not description:
            raise HTTPException(status_code = 400, detail="Title and description are required")

        requirements = ",".join(data.get("requirements", ""))
        experienceLevel = data.get("experienceLevel", "")
        job_text = f"{title}\n{description}"
        
        doc = Document(page_content = job_text, metadata = {"title":title, "description":description, "requirements":requirements, "experienceLeve":experienceLevel } )
    
        vectorstores.add_documents([doc])
        save_index()
        return {"message": "Job embedded successfully"}

    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code = 500, detail=str(e))


