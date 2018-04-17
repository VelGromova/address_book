'use strict'
/* eslint-disable no-undef */
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

const spriteTemplateFunction = (data) => {
    let shared = '.icon { background-image: url(I); display: block; }'
        .replace('I', data.sprites[0].image);

    let perSprite = data.sprites.map(sprite =>
        '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y)
    ).join('\n');

    return shared + '\n' + perSprite;
}

module.exports = {
    configureWebpack: {
        plugins: [
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, './src/assets/icons'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, './src/assets/images/sprite.png'),
                    css: [
                        [ path.resolve(__dirname, './src/assets/scss/icons/__sprite.scss') ],
                        [
                            path.resolve(__dirname, './src/assets/scss/icons/__icons.scss'),
                            { format: 'icon_template' },
                        ]
                    ]
                },
                customTemplates: {
                    'icon_template': spriteTemplateFunction,
                },
                apiOptions: {
                    cssImageRef: "./assets/images/sprite.png"
                }
            })
        ]
    }
}