# **Design Database**
<div align = 'justify'>membuat design database dengan tools draw.io:

![foodise-ERD]()

&nbsp;

# **API Documentation**


&nbsp;

# **API SPECIFICATION**
&nbsp;
# **Login Register**
## **Sign Up**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/auth/signup`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "email": "string",
	    "username": "string",
	    "gender" : "string, enum('perempuan','laki-laki')",
	    "tinggi" : "number",
	    "berat" : "number",
	    "umur" : "number",
	    "password" : "string",
	    "levelAktivitas" : "number"
    }
    ```
- Authentication - Bearer Token : `<token key>`
**Response** :
```json
{
    "message": "success",
    "token": "string",
    "username": "string",
    "email": "string",
    "gender": "string",
    "password": "string encrypt",
    "tinggi": "number",
    "berat": "number",
    "umur": "number",
    "levelAktivitas": {
        "val": "number",
        "ket": "string"
    },
    "caloriNeeded": "number",
    "carboNeeded": "number",
    "proteinNeeded": "number",
    "fatNeeded": "number"
}

```
## **Sign In**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/auth/signin`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "email": "string",
        "password": "string",
    }
    ```
- Authentication - Bearer Token : `<token key>`
**Response** :
```json
{
    "message": "login success, welcome!",
    "token": "string",
    "username": "string",
    "email": "string",
    "gender": "string",
    "password": "string encrypt",
    "tinggi": "number",
    "berat": "number",
    "umur": "number",
    "levelAktivitas": {
        "val": "number",
        "ket": "string"
    },
    "caloriNeeded": "number",
    "carboNeeded": "number",
    "proteinNeeded": "number",
    "fatNeeded": "number"
}
```

## **Sign In (ADMIN)**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/admin/signin`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "email": "foodise@gmail.com",
        "password": "foodise123",
    }
    ```
- Authentication - Bearer Token : `<token key>`
**Response** :
```json
{
    "message": "login admin success, welcome !",
    "token": "string",
    "email": "foodise@gmail.com",
    "password": "string encrypt"
}
```
&nbsp;

# **Food**
## **Get All Food Data**
**Request**
- Method : GET
- Endpoint : `<web-service-api>/foods`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "name": "string",
        "image": "string",
        "category": {
            "_id": "string unique",
            "name": "string"
        },
        "cal": "number",
        "protein": "number",
        "carb": "number",
        "fat": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Get Food Data by Food Id**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/foods/{:food_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "name": "string",
        "image": "string",
        "category": {
            "_id": "string unique",
            "name": "string"
        },
        "cal": "number",
        "protein": "number",
        "carb": "number",
        "fat": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Get Food By Category**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/foods/category/{:category_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "name": "string",
        "image": "string",
        "category": {
            "_id": "string unique",
            "name": "string"
        },
        "cal": "number",
        "protein": "number",
        "carb": "number",
        "fat": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Search Food Data**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/foods/search?name={:query}`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "name": "string",
        "image": "string",
        "category": {
            "_id": "string unique",
            "name": "string"
        },
        "cal": "number",
        "protein": "number",
        "carb": "number",
        "fat": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

## **Add Many Foods (ADMIN)**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/foods`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json

    [
        {
            "name":"string ",
            "image": "string",
            "category":"string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
        },
        {
            "name":"string",
            "image": "string",
            "category":"string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
        }
    ]
    ```
**Response** :
```json
{
    "message": "food added successfully",
    "data": [
        {
            "name":"string ",
            "image": "string",
            "category":"string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
        },
        {
            "name":"string",
            "image": "string",
            "category":"string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
        }
    ]
}
```
## **Update Food Data (ADMIN)**
**Request** :
- Method : PATCH
- Endpoint : `<web-service-api>/foods/{:food_id}`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body : (example)
    ```json
    {
        "cal": "number",
        "protein": "number",
        "carb": "number",
        "fat": "number",
    }
    ```
**Response** :
```json
{
    "message": "update success",
    "foodUpdated": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

&nbsp;
# **Recipe**
## **Get All Recipes**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/recipes`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "portion": "number",
        "healthScore": "number",
        "overview": "string",
        "ingredient": [ "string" ],
        "timeServing": "number",
        "food": {
            "_id": "string unique",
            "name": "string",
            "image": "string",
            "category": "string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "createdAt": "date",
        "updatedAt": "date"
    },
]
```
## **Get Recipe By Recipe Id**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/recipes/{:recipe_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "portion": "number",
        "healthLabel": ["string"],
        "overview": "string",
        "ingredient": [ "string" ],
        "timeServing": "number",
        "food": {
            "_id": "string unique",
            "name": "string",
            "image": "string",
            "category": "string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "createdAt": "date",
        "updatedAt": "date"
    },
]
```
## **Get Recipe By Food Id**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/recipes/food/{:food_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "portion": "number",
        "healthLabel": ["string"],
        "overview": "string",
        "ingredient": [ "string" ],
        "timeServing": "number",
        "food": {
            "_id": "string unique",
            "name": "string",
            "image": "string",
            "category": "string unique",
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "desc": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "createdAt": "date",
        "updatedAt": "date"
    },
]
```

## **Add Recipe (ADMIN)**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/recipes`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "portion": "number",
        "healthLabel": ["string"],
        "overview": "string",
        "ingredient": ["string"],
        "timeServing": "number",
        "food": "string unique"
    }
    ```
**Response** :
```json
{
    "message": "resep added successfully",
    "data": {
        "portion": "number",
        "healthLabel": ["string"],
        "overview": "string",
        "ingredient": ["string"],
        "timeServing": "number",
        "food": "string unique"
    }
}
```
# **Category**
## **Get All Categories**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/categories`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "name": "string"
    }
]
```
## **Add Category (ADMIN)**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/categories`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "_id": "string",
        "name":"string"
    }
    ```
**Response** :
```json
{
    "message": "category added successfully",
    "data": {
        "_id": "string",
        "name": "string"
    }
}
```
# **Favorite**
## **Add Favorite Food**
**Request** :
- Method : POST
- Endpoint : `<web-service-api>/favorites`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "user":"637e0b80a17f4bda6c141687",
        "food":"637f32839d650cc2d494db11"
    }
    ```
**Response** : 
```json
{
    "message": "favorite food data added successfully",
    "favorite food": {
        "user": "637e0b80a17f4bda6c141687",
        "food": "637f32839d650cc2d494db11"
    }
}
```
## **Get Favorite Food**
**Request** :
- Method : GET
- Endpoint : `<web-service-api>/favorites`
- Header : 
    - Accept : application/json
**Response** :
```json
[
    {
        "_id": "string unique",
        "user": "string unique",
        "food": {
            "_id": "string unique",
            "name": "string",
            "image": "string",
            "category": "string unique",
            "kalori": "number",
            "protein": "number",
            "karbohidrat": "number",
            "lemak": "number",
            "deskripsi": "string",
            "manfaat": "string",
            "bahaya": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
    }
]
```
## **Delete Favorite Food**
**Request** :
- Method : DELETE
- Endpoint : `<web-service-api>/favorites/{:favorite_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
{
  "message": "favorite food data deleted successfully"
}
```