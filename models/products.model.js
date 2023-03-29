const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

let productSchema = new Schema ({
    product: {type:String,
            required:[true, 'product name is a required field'],
            max:100,
            unique:true,
            trim:true,
            lowercase:true},
    cost:   {type:Number,
            required:[true,'product cost is required']},
    description:{type:String, null:true},
    quantity:{type:Number}        
},{
    collection:'products',
    timestamps:true
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Products',productSchema)