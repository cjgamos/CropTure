from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests
# import translators as ts

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

# Real Edpoint
# endpoint = "https://us-central1-cropture.cloudfunctions.net/predict"

CLASS_NAMES = ["Corn Blight", "Corn Common Rust", "Corn Gray Leaf Spots", "Corn Healthy", "Potato Early Blight", "Potato Late Blight",
               "Potato Healthy", "Rice Bacterial Leaf Blight", "Rice Brown Spot", "Rice Healthy", "Rice Leaf Smut",
               "Rice Septoria", "Tomato Bacterial Spot", "Tomato Early Blight", "Tomato Late Blight", "Tomato Healthy"]


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

# def translate(message):
#     translated_message = ts.google(message, from_language='en', to_language='tl')
#     return translated_message

def getSolution(predicted):
    if "Early Blight" in predicted:
        return "Apply copper-based fungicides two weeks before disease appears or when weather forecasts predict a long period of wet weather for the best control. Alternatively, start treatment as soon as the disease appears and repeat every 7-10 days for as long as it takes."

    elif "Healthy" in predicted:
        return "The crop is healthy, and no possible solution or treatment is needed."

    elif "Late Blight" in predicted:
        return "Before planting, remove any volunteers from the garden and space plants far enough apart to allow for acceptable air circulation."

    elif "Blight" in predicted:
        return "Remove all affected leaves and either burn them or dispose of them. Put mulch around the plant's base with straw, wood chips, or any other natural mulch to retain fungal spores from spilling on the plant."

    elif "Common Rust" in predicted:
        return "Unfortunately, there's no simple cure for common crust. Try these recommendations: Remove and destroy all infected parts. Remove and destroy all infected plants before replanting the area with insect resistant."

    elif "Gray Leaf Spot" in predicted:
        return "Planting hybrids with a high genetic resistance level can help reduce the risk of yield loss due to gray leaf spot infectious diseases."

    elif "Bacterial Leaf Blight" in predicted:
        return "Disease management is to prune infected plant material. Remove and discard any affected plant parts. Do not placed them in the compost."

    elif "Brown Spot" in predicted:
        return "Disinfectant creams (hydroquinone) utilised alone or in combination with retinoids (topical retinoids) and a mild steroid may slowly fade the spots for several months."

    elif "Leaf Smut" in predicted:
        return "Remove and destroy any infected plant parts. Water shouldn't be spilled around in the infected leaf. There are no approved anti fungals to control smut diseases."

    elif "Septoria" in predicted:
        return "Taking out infected leaves. Remove infected leaves as as soon as possible, and thoroughly disinfect your hands and pruners before operating with untreated plants."

    elif "Bacterial Spot" in predicted:
        return "A bacterial spot on a plant cannot be cured. To prevent the bacteria from spreading to healthy plants, remove symptomatic plants from the field or greenhouse. DO NOT EAT symptomatic fruit and instead burn, bury, or hot compost the affected plants."
        
    else:
        return "No Data Found."

def getSolutionTagalog(predicted):
    if "Early Blight" in predicted:
        return "Mag apply ng mga copper-based fungicides dalawang linggo bago lumitaw ang sakit o kapag ang mga pagtataya ng panahon ay nagbabadya ng mahabang panahon ng pag ulan para sa pinakamabisang pagkontrol nito. Bilang kahalili, simulan ang paggamot sa lalong madaling panahon basta lumitaw ang sakit at ulitin ito sa bawat 7-10 araw hangga't ito ay tumatagal."

    elif "Healthy" in predicted:
        return "Ang pananim ay malusog, at walang posibleng solusyon o paggamot ang kailangan."

    elif "Late Blight" in predicted:
        return "Bago magtanim, alisin ang anumang mga boluntaryo mula sa hardin at maglagay ng tamang espasyo sa mga halaman na sapat ang layo upang magkaroon ng maayos na sirkulasyon ng hangin."

    elif "Blight" in predicted:
        return "Alisin ang lahat ng apektadong dahon at sunugin o itapon ang mga ito. Maglagay ng mulch sa paligid ng base ng halaman na may dayami, wood chips, o anumang iba pang natural na mulch upang mapanatili ang mga fungal spores na maaring lumabas sa halaman."

    elif "Common Rust" in predicted:
        return "Sa kasamaang palad, walang simpleng lunas para sa common rust. Subukan ang mga rekomendasyong ito: Alisin at sirain ang lahat ng mga nahawaang bahagi. Alisin at sirain ang lahat ng nahawaang halaman bago muling itanim sa mga lugar na may insect resistant."

    elif "Gray Leaf Spot" in predicted:
        return "Ang pagtatanim ng mga hybrids na may mataas na antas na uri ng panlaban ay maaaring makatulong na mabawasan ang panganib ng pagkawala ng ani dahil sa nakakahawang kulay na abong spot sa dahon ng halaman."

    elif "Bacterial Leaf Blight" in predicted:
        return "Ang pagkontra sa sakit na ito ay sa pamamagitan ng pag alis ng nahawaang parte ng halaman. Alisin at itapon ang anumang apektadong bahagi ng halaman. Huwag ilagay ang mga ito sa compost."

    elif "Brown Spot" in predicted:
        return "Maaring gumamit ng disinfectant creams (hydroquinone) o magkasabay itong gamitin kasama ang retinoids (topical retinoids) at mild steroids upang dahan dahang mawala ang mga spot sa ilang buwan. "

    elif "Leaf Smut" in predicted:
        return "Alisin at sirain ang anumang nahawaang mga bahagi ng halaman. Hindi dapat buhusan ng tubig ang mga dahon na nahawahan. Walang aprubadong anti fungals upang makontrol ang mga sakit ng smut. "

    elif "Septoria" in predicted:
        return "Pag alis sa mga nahawaang dahon. Alisin ang mga nahawaang dahon sa lalong madaling panahon, at lubusang disimpektahin ang iyong mga kamay at pruners bago hawakan ang mga  hindi pa nagagamot na halaman."

    elif "Bacterial Spot" in predicted:
        return "Ang isang bacterial spot sa isang halaman ay hindi maaaring masolusyonan. Upang maiwasan ang pagkalat ng bakterya sa malusog na halaman, alisin ang mga halaman na may sintomas mula sa bukid o greenhouse. HUWAG KUMAIN ng mga prutas na may sintomas at sa halip ay sunugin, ibaon, o ilagay sa compost ang mga apektadong halaman."
        
    else:
        return "No Data Found."

def getDefinition(predicted):
    if "Early Blight" in predicted:
        return "refers to any of a variety of plant blights whose symptoms start to appear earlier in the growing season.  It is a fungal disease leaf spot caused by Alternaria solani, it is common on potatoes and tomatoes."

    elif "Healthy" in predicted:
        return "Healthy Crop!"

    elif "Late Blight" in predicted:
        return "The solanaceous plant disease known as Late Blight, which affects plants such as the potato and tomato, is caused on by the fungus Phytophthora infestans. It is characterized by the weakening of stems, leaves, and, in the case of potatoes, tubers."

    elif "Blight" in predicted:
        return "any of a variety of plant diseases that cause leaves, flowers, fruit, stems, or the entire plant to suddenly have a severely yellow or brown color, spot, wither, or die. The majority of blights are brought on by bacterial or fungal infestations, which typically target young, growing fast parts of the plant including shoots."

    elif "Common Rust" in predicted:
        return "Every growing season, the fungus Puccinia sorghi causes Common rust. In hybrid corn, it rarely causes problems. Late June is usually when rust pustules start appear. Chlorotic spots on the surface of the leaf are one of the first signs of common rust. "

    elif "Gray Leaf Spot" in predicted:
        return "During every growing season, the fungus Cercospora zeae-maydis, which causes gray leaf spot. Economic losses could happen if the development of a disease is encouraged. About two to three weeks prior to tasseling, lower leaves first carry the risk of the condition."

    elif "Bacterial Leaf Blight" in predicted:
        return "also known as bacterial blight of rice, is among the most destructive diseases to affect agricultural rice (Oryza sativa and O. glaberrima). A severe disease can result in crop losses of up to 75%, and millions of hectares of rice are afflicted every year."

    elif "Brown Spot" in predicted:
        return "A fungus called brown spot attacks the coleoptile, leaves, leaf sheath, panicle branches, glumes, and spikelets. The multiple different blotches on the leaves that really can kill the entire leaf are the most recognizable damage. Unfilled grains or spotted or discolored seeds develop when the seed becomes infected."

    elif "Leaf Smut" in predicted:
        return "is a fungal infection caused by the fungus Entyloma oryzae. It is a rice disease that is widely recognized. The fungus generates slightly raised, angular, black spots. Both sides of the leaves have spot."

    elif "Septoria" in predicted:
        return "causes numerous small brown spots (about 1/8' to 1/4' in diameter) with a brownish color to white center of the leave as they age. If left untreated, rapid defoliation occurs. Both blights have a similar overall effect. The leaves turn yellow, brown, wither, and die."

    elif "Bacterial Spot" in predicted:
        return "is a highly dangerous disease that can result in unmarketable fruit and even death of the plant in severe cases. Bacterial spot can occur anywhere tomatoes are grown, but it is most common in warm, wet climates and in greenhouses."
    else:
        return "No Data Found."

def getDefinitionTagalog(predicted):
    if "Early Blight" in predicted:
        return "ito ay tumutukoy sa alinman sa iba't ibang mga blights ng halaman na ang mga sintomas ay nagsisimulang lumitaw nang mas maaga sa panahon ng paglaki ng halaman. Ito ay isang sakit o halamang-singaw na sanhi ng Alternaria solani na nagdudulot ng spot sa dahon ng halaman, ito ay karaniwang makikita sa lalo na sa patatas at kamatis."

    elif "Healthy" in predicted:
        return "Healthy Crop!"

    elif "Late Blight" in predicted:
        return "Ang solanaceous na sakit ng halaman na kilala bilang Late Blight, ito ay nakakaapekto sa mga halaman tulad ng patatas at kamatis, ay sanhi ng halamang-singaw na Phytophthora infestans. Ito ay nailalarawan sa pamamagitan ng paghina ng mga tangkay, dahon, at, sa kaso ng patatas, tubers."

    elif "Blight" in predicted:
        return "ito ay anuman sa iba't ibang mga sakit ng halaman na nagiging sanhi ng dahon, bulaklak, prutas, mga tangkay, o ang buong halaman upang bigla itong magkaroon ng malubhang dilaw o kayumanggi na kulay, spot, matuyo, o mamatay. Ang karamihan ng mga blights ay sanhi ng mga bakterya o halamang-singaw, na karaniwang target ang mga bata pa o mabilis na lumalagong mga bahagi ng halaman kabilang ang mga shoots."

    elif "Common Rust" in predicted:
        return "Sa panahon ng tagsibol, ang halamang-singaw na Puccinia sorghi ay nagiging sanhi ng Common Rust. Sa mga hybrid corn, bihira itong magdulot ng problema. Sa mga huling araw ng Hunyo ay karaniwang lumilitaw ang mga rust pustules. Ang mga chlorotic spot na makikita sa mga dahon ay isa sa mga unang palatandaan ng Common Rust. "

    elif "Gray Leaf Spot" in predicted:
        return "Sa panahon ng tagsibol, ang halamang-singaw na Cercospora zeae-maydis, ay nagiging sanhi ng kulay abo na spot sa dahon. Ang pagkalugi sa ekonomiya ay maaaring mangyari kung ang paglago ng sakit ay hindi maaagapan. Mga dalawa hanggang tatlong linggo bago ang tasseling, ang mga dahon na nasa mababang bahagi ng halaman ay maaring unang tamaan ng ganitong kondisyon. "

    elif "Bacterial Leaf Blight" in predicted:
        return "Ang bacterial leaf blight, na kilala rin bilang bacterial blight of rice, ay kabilang sa mga pinaka mapanirang sakit na makakaapekto sa agricultural rice (Oryza sativa at O. glaberrima). Ang malubhang sakit na ito ay maaaring magresulta sa pagkalugi ng mga pananim ng hanggang sa 75%, at milyun milyong ektarya ng palay ang naghihirap taun taon."

    elif "Brown Spot" in predicted:
        return "Ang halamang-singaw na tinatawag na brown spot ay umaatake sa coleoptile, dahon, leaf sheath, mga sanga, glumes, at spikelets. Ang mga iba't ibang blotches sa mga dahon na talagang maaaring patayin ang buong dahon ay ang pinaka nakikilalang mapaminsala. Ang mga butil na hindi napupuno o may bahid o makulay na buto ay nabubuo kapag ang binhi ay nahawahan."

    elif "Leaf Smut" in predicted:
        return "ay isang impeksiyon na sanhi ng halamang singaw na Entyloma oryzae. Ito ay sakit sa palay na alam ng karamihan. Ang halamang-singaw na ito ay nagreresulta sa pagkabuo ng pataas at pa angular na itim na mga spot. Ang magkabilang gilid ng mga dahon ay magkakaroon ng mga spot."

    elif "Septoria" in predicted:
        return " ito ay nagiging sanhi ng maraming mga maliliit na spot na kulay kayumanggi (1/8 'sa 1/4' sa diameter) na may pagka kayumanggi hanggang putting kulay sa  gitna ng dahoon habang ito ay tumatanda. Kung hindi ito magagamot, mabilis na pagkalaglag ng mga dahon ang mangyayari. Ang dalawang klase ng blight ay mayroong pagkakatulad na epekto. Ang mga dahon ay nagiging dilaw, kayumanggi, natutuyo, at namamatay."

    elif "Bacterial Spot" in predicted:
        return " ay isang mapanganib na sakit na maaaring magresulta sa hindi pagkabenta o pagkamatay ng halaman sa malubhang kaso. Ang bacterial spot ay maaaring mangyari kung saan nakatanim ang mga kamatis, ngunit ito ay pinaka karaniwan sa mainit init, basang klima at sa mga greenhouse."
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
    tagalog_definition = getDefinitionTagalog(predicted_class)

    # Solution
    solution = getSolution(predicted_class)
    tagalog_solution = getSolutionTagalog(predicted_class)

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
