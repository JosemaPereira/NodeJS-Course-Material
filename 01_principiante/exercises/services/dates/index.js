const padStartFmt = (number, zeros) => String(number).padStart(zeros, '0');

const getFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();

  const hours = padStartFmt(today.getHours(), 2);
  const mins = padStartFmt(today.getMinutes(), 2);
  const secs = padStartFmt(today.getSeconds(), 2);
  const ms = padStartFmt(today.getMilliseconds(), 3);
  const month = padStartFmt(today.getMonth() + 1, 2);
  const date = padStartFmt(today.getDate(), 2);

  return `${year}/${month}/${date} ${hours}:${mins}:${secs}.${ms}`;
};

module.exports = { getFormatted };
