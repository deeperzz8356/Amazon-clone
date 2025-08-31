import { currency } from "../../scripts/util/money.js";

describe('test suite: formatCurrency',()=>{
    it('convert cents into dollers',()=>{
        expect(currency(2095)).toEqual('20.95');
    });
    it('Works with 0',()=>{
        expect(currency(0)).toEqual('0.00');
    });
    it('round upto nearest cent',()=>{
        expect(currency(2000.5)).toEqual('20.01');
    });

}
);