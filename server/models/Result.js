class Result{
	constructor(code, data){
		this.code = code;
		this.data = data;
		this.setMsg();
	}
	setMsg(){
		this.msg = Result.codeMsgMap[this.code];
	}
}
// set static variable
Result.codeMsgMap = {
	20000: 'success',
	20001: 'empty',
	50000: 'server error'
};

module.exports = Result;