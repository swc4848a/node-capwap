var diff = require('deep-diff').diff;
const util = require('util');

// config system global
//     set admintimeout 480
//     set alias "FGT60D4615007833"
//     set fgd-alert-subscription advisory latest-threat
//     set gui-certificates enable
//     set hostname "FGT60D4615007833"
//     set timezone 04
// end

var lhs = {
    config: {
        'system global': {
            set: {
                admintimeout: 480,
                alias: "FGT60D4615007833",
                'fgd-alert-subscription': ['advisory', 'latest-threat'],
                'gui-certificates': 'enable',
                'hostname': "FGT60D4615007833",
                "timezone": '04',
            }
        }
    }
};

var rhs = {
    config: {
        'system global': {
            set: {
                admintimeout: 480,
                alias: "FGT60D4615007833",
                'fgd-alert-subscription': ['advisory'],
                'gui-certificates': 'disable',
                'hostname': "FGT60D4615007833",
                "timezone": '04',
            }
        }
    }
};

var differences = diff(lhs, rhs);

console.log(util.inspect(differences, { showHidden: true, depth: null }));
