import { format } from 'winston';

const prettyPrint = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => {
    const symbols = Object.getOwnPropertySymbols(info);
    const messageSymbol = symbols[1];

    const { level, label, timestamp } = info;

    const messageString = info[messageSymbol];
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    const type = (label !== undefined) ? `[${label}]` : '';

    const { message } = JSON.parse(messageString);

    return `${ts} [${level}]${type}: ${JSON.stringify(message)}`;
  })
);

export default prettyPrint;
