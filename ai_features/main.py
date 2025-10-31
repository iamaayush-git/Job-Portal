from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
import requests
from langchain_community.document_loaders import PyPDFLoader
import uvicorn
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

INDEX_PATH = "faiss_index"

if os.path.exists(INDEX_PATH):
    vectorstores = FAISS.load_local(INDEX_PATH,embeddings, allow_dangerous_deserialization=True)

else:
    vectorstores = FAISS.from_texts(["init"], embeddings)
    vectorstores.save_local(INDEX_PATH)


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

        job_text = f"{title}\n{description}"
        
        doc = Document(page_content = job_text, metadata ={"job_id": data.get("_id")})
    
        vectorstores.add_documents([doc])
        vectorstores.save_local(INDEX_PATH)
        return {"message": "Job embedded successfully"}

    except HTTPException as e:
        print(e)
        raise e
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code = 500, detail=str(e))

def extract_text_from_pdf(url):
    try:
        response = requests.get(url)
        if response.status_code!= 200:
            raise HTTPException(status_code= response.status_code, detail="Failed to fetch PDF")
        
        with open("temp_resume.pdf", "wb") as f:
            f.write(response.content)
        
        loader = PyPDFLoader("temp_resume.pdf")
        pages = loader.load()
        
        text = ""
        for page in pages:
            text+=page.page_content
        
        return text

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.post("/recommend")
async def recommend(request:Request):
    try:
        data = await request.json()
        resume_url = data.get("resume_url", "")
        if not resume_url:
            return {
                "recommended_jobs":[]
            }
        text = extract_text_from_pdf(resume_url)
        top_k = 5
        results = vectorstores.similarity_search(text, k=top_k)
        
        results = [r for r in results if r.metadata.get("job_id")]  # skip dummy
        recommendations = [{"job_id": r.metadata["job_id"]} for r in results]
        return{
            "recommended_jobs":recommendations
        }
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)