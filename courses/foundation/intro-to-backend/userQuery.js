import knexInstance from "./database.js";

const getAllUsers = async () => {
    const users = await knexInstance.raw("select * from users ORDER BY id ASC");
    return users;
};
const getUnconfirmedUsers = async () => {
    const users = await knexInstance.raw(
        "select * from users where confirmed_at IS NULL"
    );
    return users;
};
const getGmailUsers = async () => {
    const users = await knexInstance.raw(
        "select * from users where email LIKE '%@gmail.com'"
    );
    return users;
};
const getEarlyUsers = async () => {
    const usersAt2022 = await knexInstance.raw(
        "select * from users where created_at >= '2022-01-01'  AND created_at <  '2023-01-01';"
    );
    return usersAt2022;
};
const getUserCount = async () => {
    const user_count = await knexInstance.raw(
        "select count(*)as total_users from users"
    );
    return user_count;
};
const getLastNameCount = async () => {
    const last_name_count = await knexInstance.raw(
        "select last_name,count(*) AS last_name_count from users GROUP BY  last_name ORDER BY last_name ASC;"
    );
    return last_name_count;
};
const getFirstUser = async () => {
    const first_user = await knexInstance.raw(
        "select * from users ORDER BY id ASC LIMIT 1"
    );
    return first_user;
};
const createUser = async (first_name, last_name, email) => {
    const [user] = await knexInstance("users")
        .insert({ first_name, last_name, email })
        .returning("*");
    return user;
};
const updateUser = async (id, first_name, last_name, email) => {
    const updatedUserDetails = await knexInstance.raw(
        "update users set first_name=?, last_name=?, email=? where id=?",
        [first_name, last_name, email, id]
    );
    return updatedUserDetails;
};
const removeUser = async (id) => {
    const deletedUser = await knexInstance.raw("delete from users where id=?", [
        id,
    ]);
    return deletedUser;
};
export {
    getAllUsers,
    getUnconfirmedUsers,
    getGmailUsers,
    getEarlyUsers,
    getUserCount,
    getLastNameCount,
    getFirstUser,
    createUser,
    updateUser,
    removeUser,
};
