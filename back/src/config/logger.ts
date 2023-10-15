import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

const logDir = 'logs';
const infoLogDir = path.join(logDir, 'info'); // info 로그를 저장할 폴더 경로
const errorLogDir = path.join(logDir, 'error'); // error 로그를 저장할 폴더 경로
const exceptionLogDir = path.join(logDir, 'exception'); // exception 로그 저장할 폴더 경로

const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/**
 * Log Level
 * error:0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      dirname: infoLogDir,
      filename: '%DATE%.info.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
    }),
    new winstonDaily({
      level: 'error',
      dirname: errorLogDir,
      filename: '%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
    }),
  ],
  exceptionHandlers: [
    //uncaughtException 발생시
    new winstonDaily({
      level: 'error',
      dirname: exceptionLogDir,
      filename: '%DATE%.exception.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
    }),
  ],
});

const loggerStream = {
  write: (message: string) => {
    logger.info(message);
  },
};

const Logger = morgan(
  ':method :url :status :response-time ms - :res[content-length] :body',
  { stream: loggerStream },
);

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

//TODO errorMiddleware 추가!!!

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

export { Logger, logger };
