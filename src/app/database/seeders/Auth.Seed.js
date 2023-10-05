const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const getFakerData = () => {
    const fullName = faker.person.fullName()
    // eslint-disable-next-line no-unused-vars
    const [firstName, _] = fullName.split(' ')
    const email = fullName.replace(' ', '').concat('@yopmail.com')
    const username = firstName.concat('_'.concat(faker.string.alpha(10)))
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync('secretpassword', salt)

    return { name: fullName, email, username, salt, password }
}

const populationNumber = 10

module.exports = { data: getFakerData, metaSchema: User, populationNumber }
