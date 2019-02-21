var reportColumnDescriptions = [];

const toText = (filterdOptions) => {
  let html = '';
  filterdOptions.forEach((opt, idx) => {
    html += `<p><span class='name'>${opt.name}</span>: <span class='des'>${opt.des}</span></p>`;
  });

  return html;
}

const setOptions = () => {
  $('#columns tbody tr').each((idx, tr) => {
    reportColumnDescriptions.push({
      'name': $(tr).find('th span').text(),
      'des': $(tr).children('td').text(),
    });
  });

  // Kd: Keyword Difficulty Indexは公式にも漏れてる
  reportColumnDescriptions.push({
    'name': 'Kd',
    'des': 'Keyword Difficulty Index',
  });
}

$(() => {
  setOptions();

  $(".api-parameters-table").on("click", "td", (ev) => {
    const $td = $(ev.target);
    if ($td.children('span').data('original-title')) return;

    const optionName = $td.parent('tr').children('td').first().text();
    if (optionName != "export_columns" && optionName != "display_filter") return;

    const optionText = $td.html();
    $td.empty();

    const $span = $('<span></span>');
    $span.text(optionText);
    $td.append($span);

    optionArray = optionText.replace(/ /g, '').split(',');
    const filterdOptions = reportColumnDescriptions.filter((item, idx) => {
      return optionArray.indexOf(item.name) >= 0
    });

    $span.data('toggle', 'tooltip');
    $span.attr('title', toText(filterdOptions)).tooltip({
      'placement': 'top',
      'html': true,
    });
  });
});
