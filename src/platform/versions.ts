import * as _ from 'lodash';
import * as _express from 'express';

export const forwardRequests = (
	app: _express.Application,
	fromVersion: string,
	toVersion: string,
) => {
	const fromRegex = new RegExp(`^/${_.escapeRegExp(fromVersion)}`, 'i');
	const fromRoute = `/${fromVersion}/*`;
	const toRoute = `/${toVersion}`;
	app.options(fromRoute, (_req, res) => res.sendStatus(200));
	app.all(fromRoute, (req, _res, next) => {
		req.url = req.url.replace(fromRegex, toRoute);
		next('route');
	});
};
