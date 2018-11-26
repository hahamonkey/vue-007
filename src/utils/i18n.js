export function generateTitle(title) {
  // this.$te() 用于验证i18n中是否配置有对应的字段
  const hasKey = this.$te('route.' + title);
  if (hasKey) {
    const translatedTitle = this.$t('route.' + title);
    return translatedTitle;
  }
  return title;
}
