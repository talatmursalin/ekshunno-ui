/* eslint-disable indent */
/* eslint-disable eol-last */

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'localhost:3030',
                changeOrigin: true,
            },
        },
    },
};