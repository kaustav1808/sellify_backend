module.exports = (port) => ({
    definition: {
        swagger: '2.0',
        info: {
            title: 'Sellify API documentation.',
            version: '0.1.0',
            description:
                'This swagger documentation is design for the API of Sellify backend.',
            contact: {
                name: 'Kaustav Bhattacharya',
                email: 'kaustavofficial1808@gmail.com',
            },
        },
        servers: [
            {
                url: process.env.HOSTNAME || `http://localhost:${port}`,
            },
        ],
    },
    apis: ['../app/routes/index.js'],
})
