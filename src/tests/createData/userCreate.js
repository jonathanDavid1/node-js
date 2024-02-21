const User = require("../../models/User")

const userCreate = async (){
    await User.create(
        {
            firstName:'Fernando',
            lastName:"de Jesus",
            email: "fernando@gmail.com",
            password: "fernando1234",
            phone: '+2354435'
        }
    )

}
module.export = userCreate
