# CropTure

An application that classifies crop diseases and give details about the disease and solutions on how to prevent and cure them.

## Things to take note

> Install Docker, Start `Docker`, Then Run the Following:

```
docker run -t -rm -p <port>:<port> -v <directory>:<docker directory> tensorflow/serving --rest_api_port=<port> --model_config_file=<models.config directory>
```

Example:

```
docker run -t --rm -p 8501:8501 -v C:/Development/CropTure:/CropTure tensorflow/serving --rest_api_port=8501 --model_config_file=/CropTure/models.config
```

> Make sure to check models.config and rename the `name` column base on the code.

After doing all the process make a postman check using the URL below:
> http://localhost:8000/predict

Make sure to get a new request using **POST** method.

Then go to Body > Pick *form-data* > add a **Key** named "file", then in the value select an image based on dataset then press send.

> Response should look something like this.

![image1](https://github.com/cjgamos/CropTure/blob/main/screenshots/image1.png)

If everything works fine then you are good to go. 

But if not, ***DEEEEBUUUUUG!!!***


> PS: Don't forget that the ***endpoint*** in `/api/main-tf-serving.py` is connected to `models.config`'s 'name'
