#! /usr/bin/env node
const utils = require('./lib/utils');

console.log(
  'This script populates the database with some posts.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Post = require("./models/posts");
const Comment = require("./models/comments");
const User = require("./models/user");

const posts = [];
const comments = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createComments();
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(index, username, password) {
    try {
        const saltHash = utils.genPassword(password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
            username: username,
            salt: salt,
            hash: hash
        });

        const user = await newUser.save(); // Wait for the save operation to complete

        const jwt = utils.issueJWT(user); // Issue JWT token
        res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
        
        users[index] = newUser;
        console.log(`Added new user: ${username}`);
    } catch (err) {
        console.log(err)
    }
}


async function createUsers() {
  console.log("Adding users :)");
  await Promise.all([
    userCreate(0, "ElUser", "hola"),
    userCreate(1, "chungus", "chungus"),
    userCreate(2, "roberto", "roberto"),
    ])
}

async function commentCreate(index, user, content, date_published) {
  const newComment = new Comment({
    user: user,
    content: content,
    date_published: date_published
  })

  await newComment.save()
  comments[index] = newComment;
  console.log(`Added new comment written by ${user.username}`);
}

async function createComments() {
  console.log("Adding comments :)");
  let date = generateRandomDate()
  await Promise.all([
    commentCreate(0, users[0], "hey this is interesting!", date),
    commentCreate(1, users[1], "ayyyy now this is epic", date),
    commentCreate(2, users[2], "my name is Roberto I am from Italy English no very good", date),
    ])
}

async function postCreate(index, user, title, date_published, content, comments) {
  const newPost = new Post({
    user: user,
    title: title,
    date_published: date_published,
    content: content,
    comments: comments
  })

  await newPost.save()
  posts[index] = newPost
  console.log(`Added new post: ${title}`)
}

async function createPosts() {
  console.log('Adding posts :)')
  let date = generateRandomDate()
  await Promise.all([
    postCreate(0, users[0], "Christ Is King", date, "As a Catholic, the belief in the divinity of Jesus Christ is fundamental to our faith and understanding of salvation. Rooted deeply in Sacred Scripture and Tradition, we affirm Jesus as the Son of God, the Second Person of the Holy Trinity. Through the teachings of the Church and the guidance of the Holy Spirit, we embrace the mystery of the Incarnation, affirming that Jesus is both fully divine and fully human. In the Gospel narratives, we witness Jesus' proclamation of his divine identity, his miraculous deeds, and his ultimate sacrifice for the redemption of humanity. Through the celebration of the Eucharist, we encounter the living presence of Christ, affirming our belief in his real presence—body, blood, soul, and divinity—under the appearances of bread and wine. In union with the Magisterium, we hold fast to the doctrine of the Trinity, affirming the eternal relationship between the Father, Son, and Holy Spirit. Our devotion to Jesus as God incarnate shapes every aspect of our faith, providing us with hope, grace, and the promise of eternal life.", [comments[0]]),
    postCreate(1, users[1], "Spanish Culture", date, "Spanish culture is a rich tapestry woven from centuries of diverse influences, encompassing a vibrant blend of traditions, customs, and artistic expressions. Rooted in its Iberian origins and heavily influenced by Moorish, Roman, and Celtic legacies, Spanish culture is a mosaic of regional diversity, each region offering its own distinct cuisine, music, dance, and festivities. Flamenco, with its passionate rhythms and emotive movements, captures the essence of Spanish spirit, while traditional festivals like La Tomatina and San Fermín reflect the country's penchant for lively celebrations. Spaniards cherish their culinary heritage, with tapas and paella embodying the communal spirit of sharing and conviviality. From the architectural wonders of Moorish palaces in Andalusia to the medieval charm of Catalan Gothic cathedrals, Spain's landmarks reflect its rich history. Family bonds are deeply cherished, and the siesta tradition underscores a relaxed approach to life, emphasizing the importance of leisure and social connection. Whether savoring a leisurely meal with loved ones or participating in a spirited fiesta, Spanish culture embodies a zest for life that resonates with people around the globe.", [comments[1]]),
    postCreate(2, users[2], "Batman", date, "Batman is undeniably awesome for a multitude of reasons, captivating fans worldwide with his iconic blend of mystery, strength, and unwavering determination. Unlike other superheroes, Batman lacks superpowers, relying instead on his intellect, physical prowess, and cutting-edge technology to combat crime in Gotham City. His alter ego, billionaire Bruce Wayne, adds depth to his character, grappling with personal demons while striving to make a positive impact on society. Batman's dark and brooding persona, coupled with his complex moral code, resonates with audiences, making him a relatable and enduring figure. His rogues' gallery of villains, including the Joker, Catwoman, and Two-Face, provide compelling adversaries, challenging Batman both physically and morally. Moreover, Batman's commitment to justice, despite facing insurmountable odds and personal sacrifices, serves as an inspiring symbol of resilience and heroism. Whether in comics, films, or television, Batman continues to captivate audiences of all ages, cementing his status as one of the greatest superheroes of all time.", [comments[2]])
  ])
}

function generateRandomDate() {
  const year = Math.floor(Math.random() * (2100 - 1900 + 1)) + 1900;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const randomDate = new Date(year, month - 1, day);
  return randomDate
}



