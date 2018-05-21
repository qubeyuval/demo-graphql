const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000';

module.exports = {
    User: {
        posts: (user, args) => {
            return fetch(`${baseUrl}/users/${user.id}/posts`).then(res => res.json()); 
        }
    },
    Post: {
        comments: (post, args) => {
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
    }
};