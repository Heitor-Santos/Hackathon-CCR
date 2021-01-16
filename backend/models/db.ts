import {Db, MongoClient} from 'mongodb'

const URI = process.env.MONGO_URL
const OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

export default async function () {
    const client = await new MongoClient(URI,OPTIONS).connect()
    const db = client.db('presente')
    return db;
}