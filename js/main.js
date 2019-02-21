var columns = [];

const toText = (filterd_options) => {
  let html = '';
  filterd_options.forEach((opt, idx) => {
    html += `<p><span class='name'>${opt.name}</span>: <span class='des'>${opt.des}</span></p>`;
  });

  return html;
}

const setOptions = () => {
  $('#columns tbody tr').each((idx, tr) => {
    columns.push({
      'name': $(tr).find('th span').text(),
      'des': $(tr).children('td').text(),
    });
  });

  // Kd: Keyword Difficulty Indexは公式にも漏れてる
  columns.push({
    'name': 'Kd',
    'des': 'Keyword Difficulty Index',
  });
}

$(() => {
  setOptions();

  $(".api-parameters-table").on("click", "td", (ev) => {
    const $td = $(ev.target);
    if ($td.children('span').data('original-title')) return;

    const option_name = $td.parent('tr').children('td').first().text();
    console.log(option_name);
    if (option_name != "export_columns" && option_name != "display_filter") return;

    const option_text = $td.html();
    $td.empty();

    const $span = $('<span></span>');
    $span.text(option_text);
    $td.append($span);

    option_array = option_text.replace(/ /g, '').split(',');
    const filterd_options = columns.filter((item, idx) => {
      if (option_array.indexOf(item.name) >= 0) return true
    });

    $span.data('toggle', 'tooltip');
    $span.attr('title', toText(filterd_options)).tooltip({
      'placement': 'top',
      'html': true,
    });
  });
});
