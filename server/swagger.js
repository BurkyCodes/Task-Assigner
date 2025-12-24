const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for my Task Assigner server',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the user',
                            example: '694acef0f7cedbd946aab749'
                        },
                        userName: {
                            type: 'string',
                            description: 'Username (unique and lowercase)',
                            example: 'mark'
                        },
                        loginCode: {
                            type: 'string',
                            description: 'Login code for the user',
                            example: 'ABC123'
                        }
                    },
                    required: ['userName', 'loginCode']
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Task unique identifier',
                            example: '694b028466fbe767a65dae07',
                        },
                        title: {
                            type: 'string',
                            description: 'Task title',
                            example: 'New Title',
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                            example: 'A test description',
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Due date of the task',
                            example: '2025-12-31',
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            description: 'Priority of the task',
                            example: 'high',
                        },
                        status: {
                            type: 'string',
                            enum: ['incomplete', 'complete', 'in-progress'],
                            description: 'Current status of the task',
                            example: 'in-progress',
                        },
                        assigneeId: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string', example: '694acef0f7cedbd946aab749' },
                                userName: { type: 'string', example: 'mark' },
                            },
                            description: 'User assigned to the task',
                        },
                    },
                    required: ['title', 'description', 'priority', 'status', 'assigneeId'],
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
