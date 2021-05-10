import winston from 'winston';
import chalk from 'chalk';
import moment from 'moment';

const prettyJson = winston.format.printf((info) => {
	const timestamp = moment().format('lll');

	let output = `${chalk.gray(`[${timestamp}]`)} ${chalk.magenta(
		info.level,
	)} ${chalk.gray('::')} ${info.message}`;

	if (Object.keys(info.metadata).length > 0) {
		output = `${output} ${chalk.magenta(
			JSON.stringify(info.metadata, null, 2),
		)}`;
	}

	return output;
});

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.metadata({ fillExcept: ['level', 'message', 'timestamp'] }),
		prettyJson,
	),
	level: 'info',
	transports: [new winston.transports.Console({})],
});

export default logger;
