export function sequence_verify(sequence) {
    let seq = sequence.replace(/[\t\r\f\n\s]*/g, '').toUpperCase();
    const dna_bases = /^[ATCG]*$/;
    if (seq == '') {
        return true;
    }
    return seq.match(dna_bases) ? true : false;

}

export function row_verify(row) {
    if(Number(row) >= 10 && Number(row) <= 100){
        return true
    }else{
        return false
    }
}
export function make_dna_clean(sequence, row) {
    const seq = sequence.replace(/[\t\r\f\n\s]*/g, '').toUpperCase();
    let res = '';
    const protein = codon_convert(seq);
    let protein_formatted = '';
    for (let i in protein) {
        protein_formatted += ' ' + protein[i] + ' ';
    }
    protein_formatted += ' '.repeat(seq.length - protein_formatted.length);
    let p = 1;
    for (let i = 0; i < seq.length; i += row) {
        res += `${num_format(i + 1, String(seq.length).length)} ${seq.slice(i, i + row)}\n`;
        res += num_format(p, String(seq.length).length) + ' ' + protein_formatted.slice(i, i + row) + '\n';
        p += protein_formatted.slice(i, i + row).replaceAll(' ', '').length;
    }
    return res;
}

function num_format(num, len) {
    let str = String(num);
    if (str.length <= len) {
        return (str + ' '.repeat(len - str.length));
    }
    return str;
}

function codon_convert(seq, start = 0) {
    const codons = {
        'GCU': 'A',
        'GCC': 'A',
        'GCA': 'A',
        'GCG': 'A',
        'CGU': "R",
        "CGC": "R",
        "CGA": "R",
        "CGG": "R",
        "AGA": "R",
        "AGG": "R",
        "AAU": "N",
        "AAC": "N",
        "GAU": "D",
        "GAC": "D",
        "UGU": "C",
        "UGC": "C",
        "GAA": "E",
        "GAG": "E",
        "CAA": "Q",
        "CAG": "Q",
        "GGU": "G",
        "GGC": "G",
        "GGA": "G",
        "GGG": "G",
        "CAU": "H",
        "CAC": "H",
        "AUU": "I",
        "AUC": "I",
        "AUA": "I",
        "UUA": "L",
        "UUG": "L",
        "CUU": "L",
        "CUC": "L",
        "CUA": "L",
        "CUG": "L",
        "AAA": "K",
        "AAG": "K",
        "AUG": "M",
        "UUU": "F",
        "UUC": "F",
        "CCU": "P",
        "CCC": "P",
        "CCA": "P",
        "CCG": "P",
        "UCU": "S",
        "UCC": "S",
        "UCA": "S",
        "UCG": "S",
        "AGU": "S",
        "AGC": "S",
        "ACU": "T",
        "ACC": "T",
        "ACA": "T",
        "ACG": "T",
        "UGG": "W",
        "UAU": "Y",
        "UAC": "Y",
        "GUU": "V",
        "GUC": "V",
        "GUA": "V",
        "GUG": "V",
        "UAG": "*",
        "UGA": "*",
        "UAA": "*",
    };
    let coding_seq = seq.replace(/[\t\r\f\n\s]*/g, '').toUpperCase().slice(start, seq.length).replaceAll('T', 'U');
    let res = '';
    for (let i = 0; i < Math.floor(coding_seq.length / 3); i += 1) {
        res += codons[coding_seq.slice(3 * i, 3 * i + 3)];
    }
    return res;
}