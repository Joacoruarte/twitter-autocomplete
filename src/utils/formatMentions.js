export function formatMentions({ value , userHandle }) {
    const textSplit = value.split(' ');

    const formatedText = textSplit.map((e, i) => {
      if (e.includes('@') && !e.includes('pointer">@')) {
        return ` <span class="text-[rgb(29,155,240)] hover:text-[rgba(29,156,240,0.77)] transition-colors cursor-pointer">@${userHandle}</span>&nbsp; `;
      }
      if (e.includes('pointer">@')) {
        return e + '&nbsp; ';
      }
      return e;
    });

    return formatedText.join(' ');
}