
function sequence_clean(sequence) {
    return (sequence.replace(/[\t\r\f\n\s]*/g, ''));
}

export function sequence_parse(sequence) {

    const sequence_cleaned = sequence_clean(sequence);
    const regex = /<[A-Za-z35]+>|[ACGTUIactgui]+/g;
    const matches = sequence_cleaned.match(regex);
    const result = [];

    if (sequence_cleaned === '') {
        return result;
    }

    if (!matches) {
        return false;
    }

    const matched = matches.join('');

    if (matched.length != sequence_cleaned.length) {
        return false;
    }

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].startsWith("<")) {
            const temp = matches[i].substring(1, matches[i].length - 1);
            console.log('modi', modification_verify(temp));

            if (!modification_verify(temp)) {
                console.log(modification_verify(temp));
                return false;
            }
            //TODO：考虑Nam等非天然碱基的情况
            result.push({
                base: temp[temp.length - 1],
                modi: temp.slice(0, temp.length - 1),
            });
            console.log('res', result);
        } else {
            for (let j = 0; j < matches[i].length; j++) {
                result.push({
                    base: matches[i][j].toUpperCase(),
                    modi: '',
                });
            }
        }

    }
    return result;

}

function modification_verify(modi_base) {
    const valid_modi = [
        '5bioA',
        '5bioT',
        '5bioC',
        '5bioG',
        'rA',
        'rC',
        'rT',
        'rG',
        'rU',
        'rI',
        'tA',
        'tC',
        'tG',
        'tT',
        'tU',
        'fA',
        'fC',
        'fG',
        'fT',
        'fU',
    ];
    if (valid_modi.includes(modi_base)) {
        return true;
    } else {
        return false;
    }

}

function sequence_get(parsed) {
    let seq = '';
    console.log(parsed);
    parsed.forEach(item => {
        seq += item.base;
    });
    return seq;
}

export function sequence_verify(sequence, type) {

    // const dna_bases = /^[ATCG]*$/;
    // const rna_bases = /^[AUCG]*$/;
    let sequence_cleaned = sequence_clean(sequence);
    if (sequence_cleaned.length > 200) {
        return (false);
    }
    // if (type === 'DNA') {
    //     return (sequence_cleaned.match(dna_bases) ? true : false);
    // } else if (type === 'RNA') {
    //     return (sequence_cleaned.match(rna_bases) ? true : false);
    // } else {
    //     return (false);
    // }
    return (sequence_parse(sequence) ? true : false);

}

export function sequence_length(sequence_parsed) {
    let seq = sequence_get(sequence_parsed);
    return (seq.length);

}

function tm_value(seq, conc, type) {
    //37摄氏度
    const NNparam = {
        AA: {
            H: -7.6,
            G: -1.00,
            S: -21.3,
        },
        AT: {
            H: -7.2,
            G: -0.88,
            S: -20.4,
        },
        AC: {
            H: -8.4,
            G: -1.44,
            S: -22.4,
        },
        AG: {
            H: -7.8,
            G: -1.28,
            S: -21.0,
        },
        TA: {
            H: -7.2,
            G: -0.58,
            S: -21.3,
        },
        TT: {
            H: -7.6,
            G: -1.00,
            S: -21.3,
        },
        TC: {
            H: -8.2,
            G: -1.30,
            S: -22.2,
        },
        TG: {
            H: -8.5,
            G: -1.45,
            S: -22.7,
        },
        CA: {
            H: -8.5,
            G: -1.45,
            S: -22.7,
        },
        CT: {
            H: -7.8,
            G: -1.28,
            S: -21.0,
        },
        CC: {
            H: -8.0,
            G: -1.84,
            S: -19.9,
        },
        CG: {
            H: -10.6,
            G: -2.17,
            S: -27.2,
        },
        GA: {
            H: -8.2,
            G: -1.30,
            S: -22.2,
        },
        GT: {
            H: -8.4,
            G: -1.44,
            S: -22.4,
        },
        GC: {
            H: -9.8,
            G: -2.24,
            S: -24.4,
        },
        GG: {
            H: -8.0,
            G: -1.84,
            S: -19.9,
        },

    };

    const initiation = {
        H: 0.2,
        S: -5.7,
        G: 1.96,
    };

    const symmetry = {
        H: 0,
        S: -1.4,
        G: 0.43,
    };

    const tAT = {
        H: 2.2,
        S: 6.9,
        G: 0.05,
    };

    const R = 1.9872;
    const { An, Cn, Tn, Gn, Un,In } = base_count(seq);
    const seq_len = seq.length;
    if (conc.idk) {
        let tm = 0;
        //TODO 考虑离子浓度的情况
        if (seq_len <= 13) {
            //BUG 暂时没有考虑含有U的DNA或类似情况
            tm = (An + Tn + Un) * 2 + (Gn + Cn) * 4;
        } else {
            tm = 64.9 + 41 * (Gn + Cn - 16.4) / seq_len;
        }
        return (tm.toFixed(1));
    } else {
        //BUG:对U和I碱基的临时处理
        let d_seq = seq.replaceAll('U','T').replaceAll('I','G')
        const pairs = [];
        let self_comp = false;
        let x;

        for (let i = 0; i < seq_len - 1; i += 1) {
            const pair = d_seq.slice(i, i + 2);
            pairs.push(pair);
        }
        let deltaH = initiation.H;
        let deltaS = initiation.S;
        pairs.forEach(e => {
            deltaS += NNparam[e].S;
            deltaH += NNparam[e].H;
        });
        if (d_seq[seq_len - 1] == 'A' || d_seq[seq_len - 1] == 'T') {
            deltaH += tAT.H;
            deltaS += tAT.S;
        }
        if (self_comp) {
            deltaH += symmetry.H;
            deltaS += symmetry.S;
            x = 1;
        } else {
            x = 4;
        }
        const tm0 = deltaH * 1000 / (deltaS + R * Math.log(conc.oligo * 2 / (1000 * 1000 * x))) - 273.15;
        const f_gc = (Cn + Gn) / seq_len
        //const tm_na = 1 / (1/tm0 + [(4.29 * f_gc -3.95) * Math.log(conc.na / 1000) + 0.940 * Math.log(conc.na / 1000) * Math.log(conc.na / 1000)] / 100000)
        //TODO：不同盐离子算法
        const deltaS_na = deltaS + 0.368 * (seq_len - 1) * Math.log(conc.na / 1000)
        const tm_na = deltaH * 1000 / (deltaS_na + R * Math.log(conc.oligo * 2 / (1000 * 1000 * x))) - 273.15;
        return tm_na > 0 ? tm_na.toFixed(1) : '-';

    }

}

export function sequence_complement(sequence_parsed) {
    let seq = sequence_get(sequence_parsed);
    //TODO 考虑RNA修饰
    let res = seq.replace(/[ACGTUI]/g, (match) => {
        switch (match) {
            case 'A':
                return 'T';
            case 'C':
                return 'G';
            case 'I':
                return 'C';
            case 'G':
                return 'C';
            case 'T':
                return 'A';
            case 'U':
                return 'A';
            default:
                return match;
        }
    });
    const complement = res.split('').reverse().join('');
    return (complement);
}

function seq_gc(seq){

}

function base_count(sequence_cleaned) {
    const An = (sequence_cleaned.match(/A/g) || []).length;
    const Cn = (sequence_cleaned.match(/C/g) || []).length;
    const Gn = (sequence_cleaned.match(/G/g) || []).length;
    const Tn = (sequence_cleaned.match(/T/g) || []).length;
    const Un = (sequence_cleaned.match(/U/g) || []).length;
    const In = (sequence_cleaned.match(/I/g) || []).length;

    return ({
        An,
        Cn,
        Gn,
        Tn,
        Un,
        In,
    });
}

export function sequence_value(sequence, type, conc) {

    //只考虑固相合成形式，将天然DNA 5‘的单磷酸和RNA 5’的三磷酸看作修饰
    let oligo_value = {
        tm: 0,
        ext: 0,
        weight: 0,
        gc: 0,
        od260:0,
        od260ng:0,
    };

    const MW = {
        dA: 313.209,
        dC: 289.184,
        dG: 329.208,
        dT: 304.196,
        dI: 314.194,
        dU: 290,
        O: 15.999,
        PO2H: 63.980,
        H2: 2.016,
    };

    const Ext_DNA = {
        A: 15400,
        C: 7400,
        G: 11500,
        T: 8700,
        AA: 27400,
        AC: 21200,
        AG: 25000,
        AT: 22800,
        CA: 21200,
        CC: 14600,
        CG: 18000,
        CT: 15200,
        GA: 25200,
        GC: 17600,
        GG: 21600,
        GT: 20000,
        TA: 23400,
        TC: 16200,
        TG: 19000,
        TT: 16800,
    };

    //BUG 数据可能有问题
    const Ext_RNA = {
        A: 15400,
        C: 7400,
        G: 11500,
        U: 9900,
        AA: 27400,
        AC: 21000,
        AG: 25000,
        AU: 24000,
        CA: 21000,
        CC: 14200,
        CG: 17800,
        CU: 16200,
        GA: 25200,
        GC: 17400,
        GG: 21600,
        GU: 21200,
        UA: 24600,
        UC: 17200,
        UG: 20000,
        UU: 19600,
    };

    const sequence_cleaned = sequence_get(sequence);


    //TODO 考虑RNA修饰的分子量，对每个r标记增加一个氧原子分子量

    const pairs = [];

    for (let i = 0; i < sequence_cleaned.length - 1; i += 1) {
        const pair = sequence_cleaned.slice(i, i + 2);
        pairs.push(pair);
    }

    if (type === 'DNA') {
        const { An, Cn, Gn, Tn } = base_count(sequence_cleaned);
        //const weight = An * 331.23 + Tn * 322.22 + Cn * 307.20 + Gn * 347.23 - 18.02 * (sequence_cleaned.length - 1) - 79.98;
        const weight = An * MW.dA + Tn * MW.dT + Cn * MW.dC + Gn * MW.dG - MW.PO2H + MW.H2;


        const { An: Ai, Cn: Ci, Gn: Gi, Tn: Ti } = base_count(sequence_cleaned.slice(1, sequence_cleaned.length - 1));
        //console.log(sequence_cleaned.slice(1, sequence_cleaned.length - 1));
        let ext = 0;
        pairs.forEach(e => {
            //console.log(e,typeof Ext_DNA[e])
            ext += Ext_DNA[e];
        });
        
        ext = ext - (Ai * Ext_DNA.A + Ci * Ext_DNA.C + Ti * Ext_DNA.T + Gi * Ext_DNA.G);
        oligo_value.weight = weight.toFixed(1);
       
        oligo_value.ext = Object.is(ext,NaN) ? '-' : ext;
        console.log('ext_oligo',oligo_value.ext);
        const gc = (100 * (Cn + Gn) / sequence_cleaned.length).toFixed(1);
        //console.log(gc);
        oligo_value.gc = Object.is(gc,NaN) ? '-' : gc;

    } else if (type === 'RNA') {
        const { An, Cn, Gn, Un } = base_count(sequence_cleaned);
        const weight = An * MW.dA + Un * MW.dU + Cn * MW.dC + Gn * MW.dG - MW.PO2H + MW.H2 + sequence_cleaned.length * MW.O;
        oligo_value.weight = weight.toFixed(1);

        const { An: Ai, Cn: Ci, Gn: Gi, Un: Ui } = base_count(sequence_cleaned.slice(1, sequence_cleaned.length - 1));
        let ext = 0;
        pairs.forEach(e => {
            ext += Ext_RNA[e];
        });
        ext = ext - (Ai * Ext_RNA.A + Ci * Ext_RNA.C + Ui * Ext_RNA.U + Gi * Ext_RNA.G);
        oligo_value.ext = Object.is(ext,NaN) ? '-' : ext;
        const gc = (100 * (Cn + Gn) / sequence_cleaned.length).toFixed(1);

        oligo_value.gc = Object.is(gc,NaN) ? 0 : gc;

    }

    oligo_value.tm = tm_value(sequence_cleaned, conc, type);

    return (sequence_cleaned != '' ? oligo_value : { tm: 0, weight: 0, ext: 0, gc: 0 ,od260:0,
        od260ng:0,});
}

const test_seq = 'ACG TGA TCG ATC TCG ATT T';
const seq_parsed = sequence_parse(test_seq);
console.log(sequence_verify(test_seq, 'DNA'), sequence_value(seq_parsed, 'DNA', { idk: false, oligo: 0.25,na:50 }));