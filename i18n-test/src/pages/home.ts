// "中文";
// const name1 = '中文';
// const name2 = `中文`;
// const name3 = `中${'文本' ? true : false }文`;
// const name4 = { name: '中文' };
// const name5 = ['中文'];
// export { name1, name2, name3, name4, name5 };

import { t } from '@/entry/languages';
t('中文');
const name1 = t('中文');
const name2 = t('中文');
const name3 = t('中{}文', t('文本') ? true : false);
const name4 = { name: t('中文') };
const name5 = [t('中文')];
export { name1, name2, name3, name4, name5 };
