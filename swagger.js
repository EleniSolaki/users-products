const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/products.model');

exports.options = {
    "definitions": {
        User: m2s(User),
        Product: m2s(Product)
    },

    "swagger":"2.0",
    "info":{
        "version":"1.0.0",
        "description":"Products API",
        "title":"Products CRUD API"
    },
    "host":"localhost:3000",
    "basePath":"/",
    "tags":[
        {
            "name":"Users",
            "description":"API for users",
        },
        {
            "name":"Users and Products",
            "description":"API for users and their products",
        }
    ],
    "schemes":["http"],
    "consumes":["application/json"],
    "produces":["application/json"],
    "paths":{
        "/api/user/findAll":{
            "get":{
                "tags":[
                    "Users"
                ],
                "summary":"Gets all users",
                "responses":{
                    "200":{"description":"OK", 
                    "schema":{$ref:"#/definitions/User"}
                    },
                }
            }
        },
        "/api/user/findOne/{username}":{
            "get":{
                "tags":[
                    "Users"
                ],
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required":true,
                        "description":"User's username",
                        "type":"string"
                    }
                ],
                "summary":"Gets a user",
                "responses":{
                    "200":{"description":"user find", 
                    "schema":{$ref:"#/definitions/User"}
                    },
                }
            }
        },
        ///DEN DOULEVEIIIII
        '/api/user/create':{
            "post":{
                "tags":[
                    "Users"
                ],
                "description":"Creates a new user in app",
                    "parameters":[{
                    "name":"Parametes for user",
                    "in":"body",
                    "description":"User parameters that we will create",
                    "schema":{
                        // "$ref":"#/definitions/User"
                        "type":"object",
                        "properties":{
                            "name":{"type":"string"},
                            "surname":{"type":"string"},
                            "username":{"type":"string"},
                            "password":{"type":"string"},
                            "email":{"type":"string"},
                            "address":{"type":"object",
                                        "properties":{"area":{"type":"string"},
                                                        "road":{"type":"string"}
                                                    },
                                        },
                            "phone":{"type":"array",
                                    "items":{
                                        "type":"object",
                                        "properties":{
                                            "type":{"type":"string"},
                                            "number":{"type":"string"},
                                        },
                                    },
                                },
                        },
                        "required":["username","email"]
                    }
        }],
        "produces":["application/json"],
        "responses":{
            "200":{
                "description":"New user is created",
                // "schema":{
                //     "$ref":"#/definitions/User"
                // }
            }
        }
    }
},
'/api/user/update':{
    "patch":{
        "tags":[
            "Users"
        ],
        "description":"Updates a user",
        "parameters":[
            {
                "name":"update user",
                "in":"body",
                "description":"User that we will update",
                "schema":{
                    "type":"object",
                        "properties":{
                            "username":{"type":"string"},
                            "name":{"type":"string"},
                            "surname":{"type":"string"},
                            "email":{"type":"string"},
                            "address":{"type":"object",
                            "properties":{
                                "area":{"type":"string"},
                                "road":{"type":"string"}
                            },
                        },
                        "phone":{"type":"array",
                                "items":{
                                    "type":"object",
                                    "properties":{
                                        "type":{"type":"string"},
                                        "number":{"type":"string"},
                                    },
                                },
                            },
                },
                "required":["email"]
            }
        }
        ],
        "produces":["application/json"],
        "responses":{
            "200":{
                "description":"User is updated"}
        }
    }
},
'/api/user/delete/{username}':{
    "delete":{
        "tags":[
            "Users"
        ],
        "description":"Deletes a user",
        "parameters":[{
            "name":"username",
            "in":"path",
            "description":"username that we will delete"
        }],
        "responses":{"200":{"description":"User is deleted"}}
    }
},

//den leitourgeii
'api/userproducts/findone/{username}':{
    "get":{
        "tags":[
            "Users and Products"
        ],
        "parameters":[{
            "name":"username",
            "in":"path",
            "description":"find user's products",
            "type":"string"
        }],
        "responses":{
            "200":{"description":"user and products" }
        }
    }
}
}
}
