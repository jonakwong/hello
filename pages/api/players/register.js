import { connectToDatabase } from "../../../util/mongodb";



export default async (request, response) => {
    const { db } = await connectToDatabase();


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