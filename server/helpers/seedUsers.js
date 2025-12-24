const { userModel } = require("../models/userModel");
const bcrypt = require('bcryptjs');

const users = [
    { userName: 'mark', loginCode: 'password' },
    { userName: 'nena',loginCode: 'password' },
    { userName: 'burky',loginCode: 'password' },
    { userName: 'admin', loginCode: 'password' },
    { userName: 'winnie', loginCode: 'password' },
    { userName: 'john', loginCode: 'password' },
]

exports.seedUsers = async () => {
    try {
        const userCount = await userModel.countDocuments();

        if (userCount > 0) {
            console.log('Users already exist — skipping seeding');
            return;
        }
        
        // await userModel.deleteMany({});

        // console.log('Cleared users, preparing for seeding');

        await userModel.insertMany(users);

        console.log(`Successfully seeded ${users.length} users`);


    } catch (error) {
        console.error('Error seeding users:', error);
    }
}