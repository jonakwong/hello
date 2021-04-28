import { connectToDatabase } from "../../../util/mongodb";
import { registerValidation } from "../../../models/validation"


export default async (request, response) => {
    const { db } = await connectToDatabase();

    //Validataion & Date  before we create a player
    const { error } = registerValidation(request.body);
    if (error) return response.send(error.details[0].message)

    //checking if the user is aleardy in the database
    const usernameExist = await db.collection("players").findOne({ username: request.body.username });
    if (usernameExist) return response.send({ 'message': 'username aleardy exists' });


    const data = await db
        .collection("players")
        .insertOne({
            fullName: request.body.fullName,
            username: request.body.username,
            phonenumber: request.body.phonenumber,
            password: request.body.password,
        })

    const selectedplayer = await db.collection("players").findOne({ username: request.body.username })
    response.send({ _id: selectedplayer._id })



};