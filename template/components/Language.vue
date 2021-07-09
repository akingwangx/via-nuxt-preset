<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    closeTag: {
      type: String,
      default: '/',
    },
  },

  computed: {
    parts() {
      const text = this.text;
      const regx = RegExp(`\\[(.+?)\\](.*?)\\[\\${this.closeTag}\\1\\]`, 'g');

      return text
        .replace(regx, value => {
          return `#@#${value}#@#`;
        })
        .split('#@#')
        .map(value => {
          const matchs = regx.exec(value);

          return matchs ? [matchs[2], matchs[1]] : [value];
        });
    },
  },

  render(createElement) {
    return createElement(
      'div',
      {
        class: ['cpm-common-language'],
      },
      this.parts.map(part => {
        const value = part[0];
        const identifier = part[1];
        const scopedRender = identifier && this.$scopedSlots[identifier];

        return scopedRender ? scopedRender({ value }) : value;
      })
    );
  },
};
</script>

<style lang="scss">
.cpm-common-language {
  display: inline-block;
}
</style>
