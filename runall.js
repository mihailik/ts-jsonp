var child_process = require('child_process');
var allversions = JSON.parse(child_process.execSync('npm view typescript versions --json') + '');
//allversions.reverse();
for (var i = 0; i < allversions.length; i++) {
    try {
        var tsVer = allversions[i];
        if (tsVer.split('.')[0] < '4') continue;
        if (tsVer.split('.')[0] === '4' && Number(tsVer.split('.')[1])<'2') continue;
        if (!/[^0-9\.]/.test(tsVer)) continue;
        console.log(' ' + tsVer + '  ===================== ');
        child_process.execSync('npm install typescript@' + tsVer + ' --save-dev');
        child_process.execSync('npm start');
        child_process.execSync('npm start');
        child_process.execSync('npm publish');
        console.log('\n\n\n');
    }
    catch (error) {
        console.log('>>>>> ' + allversions[i] + ' failed: ' + error.message);
    }
}
child_process.execSync('npm remove typescript');
child_process.execSync('npm install typescript');
try {
    child_process.execSync('npm start');
    child_process.execSync('npm publish');
}
catch (err) {
}

var packageJSON = fs.readFileSync(__dirname + '/package.json') + '';
var package = JSON.parse(packageJSON);
var tsVersion = package.devDependencies.typescript.replace(/^[^0-9]+/, '');
child_process.execSync('npm dist-tag add ts-jsonp@' + tsVersion + ' latest');