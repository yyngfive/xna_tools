
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
    const complement = res.split('').reverse().join('')
    return (complement);
}

export function sequence_value(sequence, type) {

    //只考虑固相合成形式，将天然DNA 5‘的单磷酸和RNA 5’的三磷酸看作修饰
    let oligo_value = {
        tm: 0,
        ext: 0,
        weight: 0,
    };

    const dA = 313.209;
    const dC = 289.184;
    const dG = 329.208;
    const dT = 304.196;
    const dI = 314.194;
    const dU = 290.169;

    const O = 15.999;
    const PO2H = 63.980;
    const H2 = 2.016;

    const sequence_cleaned = sequence_clean(sequence);

    const An = (sequence_cleaned.match(/A/g) || []).length;
    const Cn = (sequence_cleaned.match(/C/g) || []).length;
    const Gn = (sequence_cleaned.match(/G/g) || []).length;
    //TODO 考虑RNA修饰的分子量，对每个r标记增加一个氧原子分子量
    if (type === 'DNA') {
        const Tn = (sequence_cleaned.match(/T/g) || []).length;
        //const weight = An * 331.23 + Tn * 322.22 + Cn * 307.20 + Gn * 347.23 - 18.02 * (sequence_cleaned.length - 1) - 79.98;
        const weight = An * dA + Tn * dT + Cn * dC + Gn * dG - PO2H + H2;
        oligo_value.weight = weight.toFixed(1);
    } else if (type === 'RNA') {
        const Un = (sequence_cleaned.match(/U/g) || []).length;
        const weight = An * dA + Un * dU + Cn * dC + Gn * dG - PO2H + H2 + sequence_cleaned.length * O;
        oligo_value.weight = weight.toFixed(1);
    }
    return (sequence_cleaned != ''? oligo_value:{weight:0,tm:0,ext:0});
}

let test_seq = 'uUGACGuACuuGCAACAGAGAGCuuu';
console.log(sequence_verify(test_seq, 'RNA'), sequence_counts(test_seq), sequence_value(test_seq, 'RNA'));