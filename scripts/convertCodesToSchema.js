const fs = require('fs');
const argv = require('yargs').argv;
const Excel = require('exceljs');

const getFileName = file => `${SCHEMAS_ROOT}/${file}`;
const SCHEMAS_ROOT = `${__dirname}/../src/store/properties/schemas`;
const SCHEMAS = [{
  filename: 'construction_schema.json',
  type: 'construction',
}, {
  filename: 'occupancy_schema.json',
  type: 'occupancy',
}].map(schema => ({
  ...schema,
  file: JSON.parse(fs.readFileSync(getFileName(schema.filename))),
}));

const getWorksheetName = (name) => {
  if (name.toLowerCase().includes('construction')) {
    return 'construction';
  }
  if (name.toLowerCase().includes('occupancy')) {
    return 'occupancy';
  }
  throw new Error(`Unknown worksheet name: ${name}`);
};

const file = argv._[0];

if (!file) {
  throw new Error('No file provided');
}

const getCells = (row) => {
  const cells = {};
  row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    if (cell.value.result) {
      cells[colNumber] = cell.value.result;
    } else {
      cells[colNumber] = cell.value;
    }
  });
  return cells;
};

const parseSheet = (worksheet) => {
  const cells = [];
  let header = {};
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber === 1) {
      header = getCells(row);
    } else {
      cells.push(Object.entries(getCells(row)).reduce((obj, [key, value]) => ({
        ...obj,
        [header[key] || key]: value,
      }), {}));
    }
  });
  return cells;
};

const readFile = async (file) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(file)
  const sheets = {};
  workbook.eachSheet((worksheet, sheetId) => {
    const name = getWorksheetName(worksheet.name);
    sheets[name] = parseSheet(worksheet);
  });
  return sheets;
};

const getRowAttribute = (type) => (name) => {
  if (type === 'construction') {
    if (name === 'key') {
      return 'Combined code';
    } else if (name === 'scheme') {
      return 'Construction Scheme';
    } else if (name === 'code') {
      return 'Construction Code';
    } else if (name === 'description') {
      return 'Description';
    }
    throw new Error(`Unrecognized name ${name}`);
  } else if (type === 'occupancy') {
    if (name === 'key') {
      return 'Combined code';
    } else if (name === 'scheme') {
      return '2';
    } else if (name === 'code') {
      return 'Occupancy Code';
    } else if (name === 'description') {
      return 'Description';
    }
    throw new Error(`Unrecognized name ${name}`);
  }

  throw new Error(`Unrecognized type ${type}`);
};

const parseSheetAsJSON = (sheet, type) => {
  const rowAttb = getRowAttribute(type);

  return sheet.reduce((obj, row) => {
    const key = row[rowAttb('key')];
    return {
      ...obj,
      [key]: {
        scheme: `${row[rowAttb('scheme')]}`,
        code: `${row[rowAttb('code')]}`,
        description: `${row[rowAttb('description')]}`,
      },
    };
  }, {});
};

const importSheets = async () => {
  const sheets = await readFile(file);

  SCHEMAS.forEach(({
    filename,
    type,
    file,
  }) => {
    const sheet = sheets[type];
    const newJSON = {
      ...file,
      ...parseSheetAsJSON(sheet, type),
    };
    const data = JSON.stringify(newJSON, null, 2).split('\n').reduce((lines, line, index) => {
      if (index % 5 === 1) {
      return `${lines}\n  ${line.trim()}`;
      }

      return `${lines} ${line.trim()}`;
    }).split('\n').slice(0, -1).join('\n');
    fs.writeFileSync(getFileName(filename), `${data}\n}\n`, 'utf8');
  });
};

importSheets();
