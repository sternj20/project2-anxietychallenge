module.exports=function(sequelize, Datatypes){
	var Question = sequelize.define("Question", {
		challenge: Datatypes.STRING,
		difficulty: Datatypes.INTEGER
	});
	Question.associate = function(models){
		Question.hasMany(models.User, {
		});
	};
	return Question;
};