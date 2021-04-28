import { connectToDatabase } from "../../../util/mongodb";
import { registerValidation } from "../../../models/validation"

export default async (request, response) => {
    const { db } = await connectToDatabase();



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