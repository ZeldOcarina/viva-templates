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
	AGENCY_NAME: 'ciao',
	AGENCY_LOGO_URL: 'https://ciao.com',
	AGENCY_WEBSITE_URL: 'https://dentista.com',
	AGENCY_ADDRESS: 'Via Brutta 15',
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
