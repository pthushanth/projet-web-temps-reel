const host = "http://localhost:4000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getAllUsersRoute = `${host}/api/user/allUsers`;
export const getAllMessagesRoute = `${host}/api/messages/allMessages`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;

export const getUserByIdRoute = `${host}/api/user`;
export const updateUserRoute = `${host}/api/user/test`;

export const sendFriendRequestRoute = `${host}/api/friend/send-friend-request`;
export const accepteFriendRequestRoute = `${host}/api/friend/accept-friend-request`;
export const rejectFriendRequestRoute = `${host}/api/friend/reject-friend-request`;
export const getAllFriendsRoute = `${host}/api/friend/all`;
export const deleteFriendRoute = `${host}/api/friend/`;
export const getFriendStatusRoute = `${host}/api/friend/friendStatus`;
export const getAllFriendRequestsRoute = `${host}/api/friend/all-friend-requests`;
