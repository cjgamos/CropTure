from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests
import translators as ts

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Remember this is connected into the /models.config name
endpoint = "http://localhost:8501/v1/models/CropTure:predict"

CLASS_NAMES = ["Corn Blight", "Corn Common Rust", "Corn Gray Leaf Spots", "Corn Healthy", "Potato Early Blight", "Potato Late Blight",
               "Potato Healthy", "Rice Bacterial Leaf Blight", "Rice Brown Spot", "Rice Healthy", "Rice Leaf Smut",
               "Rice Septoria", "Tomato Bacterial Spot", "Tomato Early Blight", "Tomato Late Blight", "Tomato Healthy"]


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

def translate(message):
    translated_message = ts.google(message, from_language='en', to_language='tl')
    return translated_message

def getSolution(predicted):
    if "Early Blight" in predicted:
        return "Apply copper-based fungicides two weeks before disease appears or when weather forecasts predict a long period of wet weather for the best control. Alternatively, start treatment as soon as the disease appears and repeat every 7-10 days for as long as it takes."

    elif "Healthy" in predicted:
        return "The crop is healthy, and no possible solution or treatment is needed."

    elif "Late Blight" in predicted:
        return "Before planting, remove any volunteers from the garden and space plants far enough apart to allow for acceptable air circulation."

    elif "Blight" in predicted:
        return "Remove all affected leaves and either burn them or dispose of them. Mulch around the plant's base with straw, wood chips, or any other natural mulch to retain fungal spores from spilling on the plant."

    elif "Common Rust" in predicted:
        return "Unfortunately, there's no simple cure for rust. Try these recommendations: Remove and destroy all infected parts. Remove and destroy all infected plants before replanting the area with insect resistant."

    elif "Gray Leaf Spot" in predicted:
        return "Planting hybrids with a high genetic resistance level can help reduce the risk of yield loss due to gray leaf spot infectious diseases."

    elif "Bacterial Leaf Blight" in predicted:
        return "Disease management is to prune infected plant material. Remove and discard any affected plant parts. Do not placed them in the compost!"

    elif "Brown Spot" in predicted:
        return "Medications. Medication disinfectant creams (hydroquinone) utilised alone or in combination with retinoids (topical retinoids) and a mild steroid may slowly fade the spots for several months."

    elif "Leaf Smut" in predicted:
        return "Remove and destroy any infected plant parts. Water shouldn't be spilled around in the infected leaf. There are no approved anti fungals to control smut diseases."

    elif "Septoria" in predicted:
        return "Taking out infected leaves. Remove infected leaves as as soon as possible, and thoroughly disinfect your hands and pruners before operating with untreated plants."

    elif "Bacterial Spot" in predicted:
        return "A bacterial spot on a plant cannot be cured. To prevent the bacteria from spreading to healthy plants, remove symptomatic plants from the field or greenhouse. DO NOT EAT symptomatic fruit and instead burn, bury, or hot compost the affected plants"
        
    else:
        return "No Data Found."

def getDefinition(predicted):
    if "Early Blight" in predicted:
        return "refers to any of a variety of plant blights whose symptoms start to appear earlier in the growing season. a: a fungal disease leaf spot, especially on potatoes and tomatoes"

    elif "Healthy" in predicted:
        return "Healthy Crop!"

    elif "Late Blight" in predicted:
        return "The solanaceous plant disease known as Late Blight, which affects plants such as the potato and tomato, is caused on by the fungus Phytophthora infestans. It is characterized by the weakening of stems, leaves, and, in the case of potatoes, tubers."

    elif "Blight" in predicted:
        return "any of a variety of plant diseases that cause leaves, flowers, fruit, stems, or the entire plant to suddenly and severely yellow, brown, spot, wither, or die. The majority of blights are brought on by bacterial or fungal infestations, which typically target young, growing fast parts of the plant including shoots."

    elif "Common Rust" in predicted:
        return "Every growing season, the fungus Puccinia sorghi causes Common rust. In hybrid corn, it rarely causes problems. Late June is usually when rust pustules start appear. Chlorotic spots on the surface of the leaf are one of the first signs of common rust. "

    elif "Gray Leaf Spot" in predicted:
        return "During every growing season, the fungus Cercospora zeae-maydis, which causes gray leaf spot, manifests itself. Economic losses could happen if the development of a disease is encouraged. About two to three weeks prior to tasseling, lower leaves first carry the risk of the condition."

    elif "Bacterial Leaf Blight" in predicted:
        return "also known as bacterial blight of rice, is among the most destructive diseases to affect agricultural rice (Oryza sativa and O. glaberrima). A severe disease can result in crop losses of up to 75%, and millions of hectares of rice are afflicted every year"

    elif "Brown Spot" in predicted:
        return "A fungus called brown spot attacks the coleoptile, leaves, leaf sheath, panicle branches, glumes, and spikelets. The multiple different blotches on the leaves that really can kill the entire leaf are the most recognizable damage. Unfilled grains or spotted or discolored seeds develop when the seed becomes infected."

    elif "Leaf Smut" in predicted:
        return "is a fungal infection caused by the fungus Entyloma oryzae. Rice disease that is widely distributed but relatively insignificant. The fungus generates slightly raised, angular, black spots. Both sides of the leaves have spots."

    elif "Septoria" in predicted:
        return "causes numerous small brown spots (about 1/8' to 1/4' in diameter) with a brownish color to white center as they age. If left untreated, rapid defoliation occurs. Both blights have a similar overall effect. The leaves turn yellow, brown, wither, and die."

    elif "Bacterial Spot" in predicted:
        return "a highly dangerous disease that can result in unmarketable fruit and even death of the plant in severe cases. Bacterial spot can occur anywhere tomatoes are grown, but it is most common in warm, wet climates and in greenhouses."

    else:
        return "No Data Found."


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    json_data = {
        "instances": img_batch.tolist()
    }

    response = requests.post(endpoint, json=json_data)
    prediction = np.array(response.json()["predictions"][0])

    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = np.max(prediction)

    # Definitions
    definition = getDefinition(predicted_class)
    tagalog_definition = translate(definition)

    # Solution
    solution = getSolution(predicted_class)
    tagalog_solution = translate(solution)

    return {
        "class": predicted_class,
        "confidence": float(confidence),
        "definition": definition,
        "solution": solution,
        "tagalog_definition": tagalog_definition,
        "tagalog_solution": tagalog_solution
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port="8001")
