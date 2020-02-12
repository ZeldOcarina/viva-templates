#!/usr/bin/env node

const fs = require('fs');
const { mkdir, readdir } = fs.promises;
const path = require('path');
const ejs = require('ejs');

const chalk = require('chalk');

const targetDir = process.argv[2] || process.cwd();
const templatesDirectory = `${__dirname}/templates`;

/*
<%= AGENCY_NAME %>
<%= AGENCY_LOGO_URL %>
<%= AGENCY_WEBSITE_URL %>
<%= AGENCY_ADDRESS %>
<%= YEAR %>
*/

const options = {
	AGENCY_NAME: 'Mint Dental Loft',
	AGENCY_LOGO_URL: 'https://cdn.salesjet.io/764/images/c89de711-2e7b-4acd-9d76-88d03f51314a.png',
	AGENCY_WEBSITE_URL: 'https://www.mintdentalloft.com/',
	AGENCY_ADDRESS: '2095 Lincoln Ave #201, Altadena, CA 91001',
	YEAR: new Date().getFullYear()
};

async function makeTemplates() {
	try {
		// COPIARE TUTTI I TEMPLATES NELLA DIRECTORY TARGET
		const files = await readdir(path.join(__dirname, './templates'));
		//console.log(files);
		for (const file of files) {
			const html = await ejs.renderFile(path.join(__dirname, `./templates/${file}`), options);
			fs.writeFileSync(path.join(__dirname, `./agencyHTML/${file.replace('ejs', 'html')}`), html);
			console.log('File written');
		}
		//SALVARE OGNI FILE CON I NUOVI DATI
		console.log(chalk.green('Files successfully created'));
	} catch (err) {
		console.error(chalk.red(err.message));
	}
}

makeTemplates();
