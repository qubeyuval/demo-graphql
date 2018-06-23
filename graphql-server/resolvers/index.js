const fetch = require('node-fetch');
const { PubSub, withFilter } = require('graphql-yoga');
const baseUrl = process.env.REST_API_BASE_URL || 'http://localhost:3000';

const pubSub = new PubSub();

module.exports = {
    User: {
        posts: async (user, args) => {
            return fetch(`${baseUrl}/users/${user.id}/posts`).then(res => res.json());
        }
    },
    Post: {
        comments: async (post, args) => {
            return fetch(`${baseUrl}/posts/${post.id}/comments`).then(res => res.json());
        }
    },
    Query: {
        users: async () => {
            return fetch(`${baseUrl}/users`).then(res => res.json());
        },
        user: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/users/${id}`).then(res => res.json());
        },
        posts: async () => {
            return fetch(`${baseUrl}/posts`).then(res => res.json());
        },
        post: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/posts/${id}`).then(res => res.json());
        }
    },
    Mutation: {
        createComment: async (parent, args) => {
            const { postId, name, email, body } = args;
            const newComment = JSON.stringify({ postId, name, email, body });
            return fetch(`${baseUrl}/comments`, {
                method: 'POST',
                body: newComment,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(comment => {
                pubSub.publish('newCommentCreated', {
                    newCommentCreated: comment,
                    channelId: postId
                });
                return comment;
            })
        },
        updateComment: async (parent, args) => {
            const { id, name, body } = args;
            const comment = JSON.stringify({ name, body });
            return fetch(`${baseUrl}/comments/${id}`, {
                method: 'PATCH',
                body: comment,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json());
        },
        deleteComment: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/comments/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json());
        },

        createPost: async (parent, args) => {
            const { userId, title, body } = args;
            const newPost = JSON.stringify({ userId, title, body });
            return fetch(`${baseUrl}/posts`, {
                method: 'POST',
                body: newPost,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json());
        },
        updatePost: async (parent, args) => {
            const { id, title, body } = args;
            const post = JSON.stringify({ title, body });
            return fetch(`${baseUrl}/posts/${id}`, {
                method: 'PATCH',
                body: post,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json());
        },
        deletePost: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/posts/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json());
        }
    },
    Subscription: {
        newCommentCreated: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('newCommentCreated'),
                (payload, variables) => payload.channelId === variables.postId)
        }
    }
};
