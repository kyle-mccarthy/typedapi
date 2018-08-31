import { format } from 'winston';

const prettyPrint = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => {
    const { level, label, timestamp, message } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    const type = (label !== undefined) ? `[${label}]` : '';

    return `${ts} [${level}]${type}: ${JSON.stringify(message)}`;
  })
);

export default prettyPrint;
