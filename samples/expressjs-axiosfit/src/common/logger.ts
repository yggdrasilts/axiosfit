import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';

const { colorize, combine, timestamp, label, printf } = format;

const customFormat = printf((info: TransformableInfo) => {
  return `${info.timestamp} - [${info.label}] [${info.level.toUpperCase()}]: ${
    info.message
  }`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: combine(
        label({ label: 'EXPRESSJS-AXIOSFIT' }),
        timestamp(),
        customFormat,
        colorize({ all: true }),
      ),
    }),
  ],
  exitOnError: false,
});

export default logger;
