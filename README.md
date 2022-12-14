# **DESIGN DATABASE**

![erd](./src-erd/ERD-Foodise.drawio.png)

&nbsp;
# **API DOCUMENTATION**

LINK : https://documenter.getpostman.com/view/24388906/2s8Yt1qocp

&nbsp;
# **API SPECIFICATION**
BASE URL : https://foodise-back-end.deta.dev/
## **Sign Up**
**Request** :
- Method : POST
- Endpoint : `(base-url)/auth/signup`
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
- Endpoint : `(base-url)/auth/signin`
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
- Endpoint : `(base-url)/admin/signin`
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
- Endpoint : `(base-url)/foods`
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
        "carbon": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Get Food Data by Food Id**
**Request** :
- Method : GET
- Endpoint : `(base-url)/foods/{:food_id}`
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
        "carbon": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Get Food By Category**
**Request** :
- Method : GET
- Endpoint : `(base-url)/foods/category/{:category_id}`
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
        "carbon": "number",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
## **Search Food Data**
**Request** :
- Method : GET
- Endpoint : `(base-url)/foods/search?name={:query}`
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
        "carbon": "number",
        "desc": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

## **Add Many Foods (ADMIN)**
**Request** :
- Method : POST
- Endpoint : `(base-url)/foods`
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
            "carbon": "number",
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
            "carbon": "number",
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
            "carbon": "number",
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
            "carbon": "number",
            "desc": "string",
        }
    ]
}
```
## **Update Food Data (ADMIN)**
**Request** :
- Method : PATCH
- Endpoint : `(base-url)/foods/{:food_id}`
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
        "carbon": "number",
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
- Endpoint : `(base-url)/recipes`
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
            "carbon": "number",
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
- Endpoint : `(base-url)/recipes/{:recipe_id}`
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
            "carbon": "number",
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
- Endpoint : `(base-url)/recipes/food/{:food_id}`
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
            "carbon": "number",
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
- Endpoint : `(base-url)/recipes`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "portion": "number",
        "healthScore": "number",
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
        "healthScore": "number",
        "overview": "string",
        "ingredient": ["string"],
        "timeServing": "number",
        "food": "string unique"
    }
}
```
## **Update Recipe (ADMIN)**
**Request** :
- Method : PATCH
- Endpoint : `(base-url)/recipes/{:recipe_id}`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "portion": "number",
        "healthScore": "number",
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
        "healthScore": "number",
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
- Endpoint : `(base-url)/categories`
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
- Endpoint : `(base-url)/categories`
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
- Endpoint : `(base-url)/favorites`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
    ```json
    {
        "user":"string unique",
        "food":"string unique"
    }
    ```
**Response** : 
```json
{
    "message": "favorite food data added successfully",
    "favorite": "string unique",
    "newFav" : {
        "user": "string unique",
        "food": "string unique"
    }
}
```
## **Get Favorite Food**
**Request** :
- Method : GET
- Endpoint : `(base-url)/favorites`
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
            "cal": "number",
            "protein": "number",
            "carb": "number",
            "fat": "number",
            "carbon": "number",
            "desc": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
    }
]
```
## **Delete Favorite Food**
**Request** :
- Method : DELETE
- Endpoint : `(base-url)/favorites/{:favorite_id}`
- Header : 
    - Accept : application/json
**Response** :
```json
{
  "message": "favorite food data deleted successfully"
}
```
# **Nutrition and Carbon Tracking**
## **Add Tracking of User**
**Request** :
- Method : POST
- Endpoint : `(base-url)/tracking`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body :
```json
{
    "food": [
        {
            "foodId": "string unique",
            "portion": "number"
        }
    ]
}
```
**Response** :
```json
{
    "_id": "string unique",
    "user": "string unique",
    "tracking": {
        "date": "date",
        "food": [
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            }
        ]
    },
    "totCarb": "number",
    "totProtein": "number",
    "totFat": "number",
    "totCal": "number",
    "totCarbon": "number"
}
```
## **Get All Tracking of User**
**Request** :
- Method : GET
- Endpoint : `(base-url)/tracking`
- Header : 
    - Accept : application/json
**Response** :
```json
{
    "_id": "string unique",
    "user": "string unique",
    "tracking": {
        "date": "date",
        "food": [
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            },
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            }
        ]
    },
    "totCarb": "number",
    "totProtein": "number",
    "totFat": "number",
    "totCal": "number",
    "totCarbon": "number"
}
```
## **Get Today Tracking of User**
**Request** :
- Method : GET
- Endpoint : `(base-url)/tracking/today`
- Header : 
    - Accept : application/json
**Response** :
```json
{
    "_id": "string unique",
    "user": "string unique",
    "tracking": {
        "date": "date",
        "food": [
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            },
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            }
        ]
    },
    "totCarb": "number",
    "totProtein": "number",
    "totFat": "number",
    "totCal": "number",
    "totCarbon": "number"
}
```
## **Get Tracking of User Per Date**
**Request** :
- Method : GET
- Endpoint : `(base-url)/tracking/{:date}`
- Header : 
    - Accept : application/json
**Response** :
```json
{
    "_id": "string unique",
    "user": "string unique",
    "tracking": {
        "date": "date",
        "food": [
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            },
            {
                "foodId": {
                    "_id": "string unique",
                    "name": "string",
                    "image": "string",
                    "category": "string unique",
                    "cal": "number",
                    "protein": "number",
                    "carb": "number",
                    "fat": "number",
                    "carbon": "number",
                    "desc": "100gram"
                },
                "portion": "number",
                "time": "time"
            }
        ]
    },
    "totCarb": "number",
    "totProtein": "number",
    "totFat": "number",
    "totCal": "number",
    "totCarbon": "number"
}
```

# **Profile and Account**
## **Get Profile**
**Request** :
- Method : GET
- Endpoint : `(base-url)/profile`
- Header : 
    - Accept : application/json
**Response** :
```json
{
    "_id": "string",
    "username": "string",
    "email": "string",
    "gender": "string",
    "password": "string encrypted",
    "tinggi": "number",
    "berat": "number",
    "levelAktivitas": {
        "val": "number",
        "ket": "string"
    },
    "umur": "number",
    "caloriNeeded": "number",
    "proteinNeeded": "number",
    "fatNeeded": "number",
    "carboNeeded": "number",
    "createdAt": "date",
    "updatedAt": "date"
}
```
## **Edit Profile**
**Request** :
- Method : PUT
- Endpoint : `(base-url)/profile`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body : (example)
    ```json
    {
        "username": "string",
        "gender": "string",
        "tinggi": "number",
        "berat": "number",
        "levelAktivitas": "number",
        "umur": "number"
    }
    ```
**Response** :
```json
{
    "message": "profile has been changed successfully",
    "changeSuccess": {
        "username": "string",
        "gender": "string",
        "tinggi": "number",
        "berat": "number",
        "umur": "number",
        "levelAktivitas": "number",
        "caloriNeeded": "number",
        "carboNeeded": "number",
        "proteinNeeded": "number",
        "fatNeeded": "number"
    }
}
```
## **Edit Account (Email and Password)**
**Request** :
- Method : PUT
- Endpoint : `(base-url)/profile/account`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body : 
    ```json
    {
        "email": "string",
        "currentPassword": "string",
        "newPassword": "string",
        "confirmPassword": "string"
    }
    ```
**Response** :
```json
{
  "message": "string",
  "changed": {
    "email": "string",
    "password": "string encrypted"
  }
}
```
## **Change Password**
**Request** :
- Method : PUT
- Endpoint : `(base-url)/profile/change-password`
- Header : 
    - Content-Type : application/json
    - Accept : application/json
- Body : (example)
    ```json
    {
        "currentPassword":"string",
        "newPassword":"string",
        "confirmPassword":"string"
    }
    ```
**Response** :
```json
{
    "message": "Password have been Changed successfully",
    "success": {
        "_id": "string",
        "username": "string",
        "email": "string",
        "gender": "string",
        "password": "string encrypted",
        "tinggi": "number",
        "berat": "number",
        "levelAktivitas": "number",
        "umur": "number",
        "caloriNeeded": "number",
        "proteinNeeded": "number",
        "fatNeeded": "number",
        "carboNeeded": "number",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```
