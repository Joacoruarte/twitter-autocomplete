export function formatMentions({ value , userHandle }) {
    const textSplit = value.split(' ');

    const formatedText = textSplit.map((e, i) => {
      if (e.includes('@') && !e.includes('pointer">@')) {
        return ` <span class="text-red-500 hover:text-red-400 transition-colors cursor-pointer">@${userHandle}</span>&nbsp; `;
      }
      if (e.includes('pointer">@')) {
        return e + '&nbsp; ';
      }
      return e;
    });

    return formatedText.join(' ');
}