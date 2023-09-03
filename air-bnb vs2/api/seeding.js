require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Place = require('./models/Place');

const seedUsers = async () => {
    try {
        await User.deleteMany();

        const mockUsers = [
            {
                name: 'Admin',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('admin', 10),
                role: 1,
            },
            {
                name: 'Yakir',
                email: 'yakir@gmail.com',
                password: await bcrypt.hash('yakir', 10),
                role: 0,
            }
        ];

        await User.create(mockUsers);
        console.log('Mockup users created successfully');

    } catch (error) {
        console.log('Error occured while seeding Users : ', error)
    }
};
const seedPlaces = async () => {
    try {
        await Place.deleteMany();

        const seedPlacesJson = require('./MockData.json')

        await Place.create(seedPlacesJson);

        console.log('Seed places added successfully');

    } catch (error) {
        console.log('Error occured while seeding places to database', error);
    }
};

const seedAll = async () => {

    // Guard
    const arguments = process.argv;

    if (!arguments.includes('Deleted-Successfully')) {
        console.log('WARNING!!');
        console.log('You are about to replace all the data in your database');
        console.log('with mockup / seed data ! This operation is ireversable !!');
        console.log('If you know what you are doing, add "Deleted-Successfully" argument.');
        process.exit(1);
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Run the seed functions
    await seedUsers();
    await seedPlaces();

    // Finish up
    console.log('Done seeding');
    process.exit(0);
}

seedAll();
