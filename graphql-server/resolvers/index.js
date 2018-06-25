const fetch = require('node-fetch');
const { PubSub, withFilter } = require('graphql-yoga');
const DataLoader = require('dataloader');

const baseUrl = process.env.REST_API_BASE_URL || 'http://localhost:3000';

const pubSub = new PubSub();


function fetchResponseByUrl(relUrl) {
    return fetch(`${baseUrl}/${relUrl}`).then(res => res.json());
}

const dataLoader = new DataLoader(
    urls => Promise.all(urls.map(fetchResponseByUrl))
);

module.exports = {
    User: {
        posts: async (user, args) => {
            return dataLoader.load(`users/${user.id}/posts`);
        },
        todos: async (user, args) => {
            const {userId, completed} = args;
            let todos = await dataLoader.load(`users/${user.id}/todos`);
            if (completed !== undefined) {
                return todos.filter(td => td.completed === completed);
            }
            return todos;
        }
    },
    Post: {
        comments: async (post, args) => {
            return dataLoader.load(`posts/${post.id}/comments`);
        }
    },
    Query: {
        users: async () => {
            return dataLoader.load(`users`);
        },
        user: async (parent, args) => {
            const { id } = args;
            return dataLoader.load(`users/${id}`);
        },
        posts: async () => {
            return dataLoader.load(`posts`);
        },
        post: async (parent, args) => {
            const { id } = args;
            return dataLoader.load(`posts/${id}`);
        },
        todosByUser: async (parent, args) => {
            const {userId, completed, limit} = args;
            let todos = await dataLoader.load(`users/${userId}/todos`);
            if (completed !== undefined) {
                todos = todos.filter(td => td.completed === completed);
            }
            if (limit !== undefined) {
                todos = todos.slice(0, limit);
            }
            return todos;
        }
    },
    Mutation: {
        createComment: async (parent, args) => {
            const { postId, name, email, body } = args;
            const newComment = JSON.stringify({ postId, name, email, body });
            let comment = (await fetch(`${baseUrl}/comments`, {
                method: 'POST',
                body: newComment,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })).json();
            pubSub.publish('commentCreated', {
                commentCreated: comment,
                channelId: postId
            });
            return comment;
        },
        updateComment: async (parent, args) => {
            const { id, name, body } = args;
            const comment = JSON.stringify({ name, body });
            return fetch(`${baseUrl}/comments/${id}`, {
                method: 'PATCH',
                body: comment,
                headers: { "Content-type": "application/json; charset=UTF-8" }
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
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json());
        },
        updatePost: async (parent, args) => {
            const { id, title, body } = args;
            const post = JSON.stringify({ title, body });
            return fetch(`${baseUrl}/posts/${id}`, {
                method: 'PATCH',
                body: post,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json());
        },
        deletePost: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/posts/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json());
        },

        createTodo: async (parent, args) => {
            const {userId, title, completed} = args;
            const newTodo = JSON.stringify({userId, title, completed});
            return fetch(`${baseUrl}/todos`, {
                method: 'POST',
                body: newTodo,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json());
        },
        updateTodo: async (parent, args) => {
            const { id, title, completed } = args;
            const post = JSON.stringify({ title, completed });
            return fetch(`${baseUrl}/todos/${id}`, {
                method: 'PATCH',
                body: post,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(res => res.json());
        },
        deleteTodo: async (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/todos/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json());
        }
    },
    Subscription: {
        commentCreated: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('commentCreated'),
                (payload, variables) => payload.channelId === variables.postId)
        }
    }
};
