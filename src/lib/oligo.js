
function sequence_clean(sequence) {
    return (sequence.toUpperCase().replace(/[\t\r\f\n\s]*/g, ''));
}

export function sequence_verify(sequence, type) {
    //校验字符种类
    //TODO:校验修饰语法
    //TODO： 将RNA表示为rA，rT的修饰形式
    const dna_bases = /^[ATCG]*$/;
    const rna_bases = /^[AUCG]*$/;
    let sequence_cleaned = sequence_clean(sequence);
    if (sequence_cleaned.length > 200) {
        return (false);
    }
    if (type === 'DNA') {
        return (sequence_cleaned.match(dna_bases) ? true : false);
    } else if (type === 'RNA') {
        return (sequence_cleaned.match(rna_bases) ? true : false);
    } else {
        return (false);
    }

}

export function sequence_counts(sequence) {
    let sequence_cleaned = sequence_clean(sequence);
    return (sequence_cleaned.length);

}

function tm_value(sequence_cleaned, conc, type) {
    const { An, Cn, Tn, Gn, Un } = base_count(sequence_cleaned);
    const seq_len = sequence_cleaned.length;
    let tm = 0;
    //TODO 考虑离子浓度的情况
    if (seq_len <= 13) {
        //BUG 暂时没有考虑含有U的DNA或类似情况
        tm = (An + Tn + Un) * 2 + (Gn + Cn) * 4;
    } else {
        tm = 64.9 + 41 * (Gn + Cn - 16.4) / seq_len;
    }
    return (tm.toFixed(1));
}

export function sequence_complement(sequence) {
    let sequence_cleaned = sequence_clean(sequence);
    //TODO 考虑RNA修饰
    let res = sequence_cleaned.replace(/[ACGTU]/g, (match) => {
        switch (match) {
            case 'A':
                return 'T';
            case 'C':
                return 'G';
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

    const sequence_cleaned = sequence_clean(sequence);


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
        console.log(Ai);
        ext = ext - (Ai * Ext_DNA.A + Ci * Ext_DNA.C + Ti * Ext_DNA.T + Gi * Ext_DNA.G);
        oligo_value.weight = weight.toFixed(1);
        oligo_value.ext = ext;

        const gc = (100 * (Cn + Gn) / sequence_cleaned.length).toFixed(1);
        console.log(gc);
        oligo_value.gc = gc === NaN ? 0 : gc;

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
        oligo_value.ext = ext;
        const gc = (100 * (Cn + Gn) / sequence_cleaned.length).toFixed(1);

        oligo_value.gc = gc === NaN ? 0 : gc;

    }

    oligo_value.tm = tm_value(sequence_cleaned, conc, type);

    return (sequence_cleaned != '' ? oligo_value : { tm: 0, weight: 0, ext: 0, gc: 0 });
}

let test_seq = 'ACG TGA TCG ATC TCG ATT T';
console.log(sequence_verify(test_seq, 'DNA'), sequence_counts(test_seq), sequence_value(test_seq, 'DNA'));