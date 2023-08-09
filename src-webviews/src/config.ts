import { locales } from './locales';
import { LANG } from '../../src/core/shared/locales/language';

type LocalesKeys = keyof typeof locales;
type LocaleCategoryKeys<T extends LocalesKeys> = keyof (typeof locales)[T];

export const translate = <Category extends LocalesKeys, Key extends LocaleCategoryKeys<Category>>(
    category: Category,
    key: Key
) => locales[category][key][LANG];
