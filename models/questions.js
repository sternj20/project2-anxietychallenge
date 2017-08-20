module.exports=function(sequelize, Datatypes){
	var Question = sequelize.define("Question", {
		challenge: Datatypes.STRING,
		difficulty: Datatypes.INTEGER
	});
	return Question;
};