const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(info => `${info.timestamp} [${info.level}] ${info.message}`)
  ),
  defaultMeta: { service: 'tree-management-app' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;

// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   defaultMeta: { service: 'tree-management-app' },
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
//       )
//     }),
//     new winston.transports.File({
//       filename: 'error.log',
//       level: 'error',
//       format: winston.format.json()
//     }),
//     new winston.transports.File({
//       filename: 'combined.log',
//       format: winston.format.json()
//     })
//   ]
// });

// module.exports = logger;
