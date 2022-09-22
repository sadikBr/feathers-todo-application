export function renderError(selector, error) {
  document.getElementById(selector).innerHTML = '';

  const messages = error.message.split(',').map((item) => {
    const [, error] = item.split('Path');

    if (!error) return item;

    return formatError(error);
  });

  messages.forEach((message) => {
    const li = document.createElement('li');
    li.classList.add('alert', 'error');
    li.textContent = message;

    setTimeout(() => {
      li.remove();
    }, 5000);

    document.getElementById(selector).appendChild(li);
  });
}

function formatError(error) {
  const [, fieldName] = error.match(/`([a-z_]{1,})`/i);

  return error
    .replace(
      fieldName,
      fieldName
        .split('_')
        .map((item) => item[0].toUpperCase() + item.substr(1))
        .join(' ')
    )
    .trim();
}
