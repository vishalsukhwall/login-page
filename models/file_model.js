const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    path: {
        type:String,
        require :[true, 'path is required']
    },
    originalname: {
        type: String,
        path: [true, 'originalname is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: [true, 'user is required']
    }
})

const file=mongoose.model('file',fileSchema)

module.exports=file