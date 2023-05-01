const getShortUser = (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
})

module.exports = { getShortUser }
