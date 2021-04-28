import { connectToDatabase } from "../../../util/mongodb";
import { registerValidation } from "../../../models/validation"
const bcrypt = require('bcrypt')

export default async (request, response) => {
    const { db } = await connectToDatabase();

    //Validataion & Date  before we create a player
    const { error } = registerValidation(request.body);
    if (error) return response.json({ message: error.details[0].message })

    //checking if the user is aleardy in the database
    const usernameExist = await db.collection("players").findOne({ username: request.body.username });
    if (usernameExist) return response.json({ message: 'username aleardy exists' });

    //Hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    try {
        const data = await db
            .collection("players")
            .insertOne({
                fullName: request.body.fullName,
                username: request.body.username,
                phonenumber: request.body.phonenumber,
                password: hashedPassword,
            })

        const selectedplayer = await db.collection("players").findOne({ username: request.body.username })
        response.send({ _id: selectedplayer._id })
    } catch (error) {
        response.json({ "error": error })
    }

};