/* eslint-disable indent */
/* eslint-disable eol-last */

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
};