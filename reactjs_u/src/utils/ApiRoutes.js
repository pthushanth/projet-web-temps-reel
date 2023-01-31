const host = "http://localhost:4000";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getAllUsersRoute = `${host}/api/user/allUsers`;
export const deleteUserRoute = `${host}/api/user/deleteUser`;

export const discussionRoute = `${host}/api/discussions`;
// export const createDiscussionRoute = `${host}/api/discussions`;
// export const getAllDiscussionsRoute = `${host}/api/discussions`;
// export const getDiscussionByIdRoute = `${host}/api/discussions`;
// export const updateDiscussionRoute = `${host}/api/discussions`;
// export const deleteDiscussionRoute = `${host}/api/discussions`;

/**************************************************** */
export const getAllMessagesRoute = `${host}/api/discussions`;

export const getUserByIdRoute = `${host}/api/user`;
export const updateUserRoute = `${host}/api/user/test`;

export const sendFriendRequestRoute = `${host}/api/friend/send-friend-request`;
export const accepteFriendRequestRoute = `${host}/api/friend/accept-friend-request`;
export const rejectFriendRequestRoute = `${host}/api/friend/reject-friend-request`;
export const getAllFriendsRoute = `${host}/api/friend/all`;
export const deleteFriendRoute = `${host}/api/friend/`;
export const getFriendStatusRoute = `${host}/api/friend/friendStatus`;
export const getAllFriendRequestsRoute = `${host}/api/friend/all-friend-requests`;
