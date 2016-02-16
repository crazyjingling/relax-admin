import SettingModel from '../models/setting';
import forEach from 'lodash.foreach';
import Q from 'q';

export default (req, res, next) => {
  res.locals.header.push({
    tag: 'script',
    props: {
      src: '//ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js'
    }
  });

  Q()
    .then(() => SettingModel.findOne({
      _id: 'fonts'
    }))
    .then((fontsSetting) => {
      if (fontsSetting && fontsSetting.value) {
        const fonts = JSON.parse(fontsSetting.value);

        if (fonts.customFonts) {
          let css = '';

          forEach(fonts.customFonts, (customFont) => {
            const family = customFont.family;
            const map = customFont.files;
            const location = `/fonts/${customFont.id}/`;

            css += `@font-face {
              font-family: "${family}";
              src: url("${location}${map.eot}");
              src:
            `;

            if (map.woff2) {
              css += `url("${location}${map.woff2}"), `;
            }

            css += `
              url("${location}${map.woff}"),
              url("${location}${map.ttf}");
            }
            `;
          });

        }

        if (fonts.webfontloader) {
          res.locals.header.push({
            tag: 'script',
            content: 'WebFont.load(' + JSON.stringify(fonts.webfontloader) + ');'
          });
        }
      }
    })
    .fin(() => {
      next();
    });
};
