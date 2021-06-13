/* eslint-disable indent */
/* eslint-disable eol-last */

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3030',
                changeOrigin: true,
            },
        },
    },
};